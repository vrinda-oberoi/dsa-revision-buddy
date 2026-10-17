/**
 * LeetCode In-Session Question Synchronization Service
 * 
 * Interacts with LeetCode's GraphQL API using the user's active session.
 * Handles authentication checks, pagination, deduplication, and graceful fallbacks.
 */

import { normalizeDifficulty, normalizeTopics } from './importExport.js';

export const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

/**
 * Extract CSRF token from document.cookie if running in browser content context
 * @returns {string|null}
 */
export function getCsrfTokenFromCookie() {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Query LeetCode user status to check if user is signed in
 * @param {object} [options]
 * @param {Function} [options.fetchFn]
 * @param {string} [options.csrfToken]
 * @returns {Promise<{ isSignedIn: boolean, username: string|null, error: string|null }>}
 */
export async function checkLeetCodeUserStatus(options = {}) {
  const fetchImpl = options.fetchFn || fetch;
  const csrf = options.csrfToken || getCsrfTokenFromCookie();

  const query = `
    query userStatus {
      userStatus {
        isSignedIn
        username
        realName
        avatar
      }
    }
  `;

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (csrf) {
      headers['x-csrftoken'] = csrf;
    }

    const response = await fetchImpl(LEETCODE_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      return {
        isSignedIn: false,
        username: null,
        error: `LeetCode responded with HTTP status ${response.status} (${response.statusText}).`
      };
    }

    const json = await response.json();
    const userStatus = json?.data?.userStatus;

    if (!userStatus) {
      return {
        isSignedIn: false,
        username: null,
        error: 'Unable to parse user status from LeetCode response.'
      };
    }

    return {
      isSignedIn: Boolean(userStatus.isSignedIn),
      username: userStatus.username || null,
      error: null
    };
  } catch (err) {
    return {
      isSignedIn: false,
      username: null,
      error: err.message || 'Network error connecting to LeetCode.'
    };
  }
}

/**
 * Fetch a batch of solved (AC) questions from LeetCode GraphQL
 * @param {number} skip 
 * @param {number} limit 
 * @param {object} [options]
 * @returns {Promise<{ questions: Array, total: number, hasMore: boolean, error: string|null }>}
 */
export async function fetchSolvedQuestionsBatch(skip = 0, limit = 50, options = {}) {
  const fetchImpl = options.fetchFn || fetch;
  const csrf = options.csrfToken || getCsrfTokenFromCookie();

  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          frontendQuestionId: questionFrontendId
          title
          titleSlug
          difficulty
          topicTags {
            name
            slug
          }
          status
        }
      }
    }
  `;

  const variables = {
    categorySlug: '',
    skip,
    limit,
    filters: {
      status: 'AC'
    }
  };

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (csrf) {
      headers['x-csrftoken'] = csrf;
    }

    const response = await fetchImpl(LEETCODE_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      return {
        questions: [],
        total: 0,
        hasMore: false,
        error: `LeetCode API error: HTTP ${response.status}`
      };
    }

    const json = await response.json();
    if (json.errors && json.errors.length > 0) {
      return {
        questions: [],
        total: 0,
        hasMore: false,
        error: json.errors[0]?.message || 'GraphQL error returned by LeetCode'
      };
    }

    const data = json?.data?.problemsetQuestionList;
    if (!data) {
      return {
        questions: [],
        total: 0,
        hasMore: false,
        error: 'No question data in LeetCode response.'
      };
    }

    const total = data.total || 0;
    const rawList = data.questions || [];

    const mapped = rawList.map(q => {
      const id = q.frontendQuestionId || q.questionFrontendId || q.id || '';
      return {
        id: String(id).trim(),
        title: q.title || `Problem ${id}`,
        url: q.url || (q.titleSlug ? `https://leetcode.com/problems/${q.titleSlug}/` : `https://leetcode.com/problems/${id}/`),
        difficulty: normalizeDifficulty(q.difficulty),
        topics: normalizeTopics(q.topicTags),
        status: 'solved',
        lastRevisionDate: null,
        revisionCount: 0,
        previousFeedback: null,
        nextRevisionDate: null,
        history: []
      };
    }).filter(q => Boolean(q.id));

    return {
      questions: mapped,
      total,
      hasMore: (skip + limit) < total && rawList.length > 0,
      error: null
    };
  } catch (err) {
    return {
      questions: [],
      total: 0,
      hasMore: false,
      error: err.message || 'Failed to fetch solved questions.'
    };
  }
}

/**
 * Perform a full synchronization of solved questions from LeetCode
 * @param {object} [options]
 * @param {Function} [options.onProgress]
 * @param {Function} [options.fetchFn]
 * @param {number} [options.maxTotalQuestions=1000]
 * @returns {Promise<{ success: boolean, questions: Array, username: string|null, message: string }>}
 */
export async function syncLeetCodeSolvedQuestions(options = {}) {
  const onProgress = options.onProgress || (() => {});
  const maxTotal = options.maxTotalQuestions || 1000;

  onProgress({ phase: 'auth_check', message: 'Checking LeetCode login status...' });

  const status = await checkLeetCodeUserStatus(options);
  if (status.error) {
    return {
      success: false,
      questions: [],
      username: null,
      message: `Could not verify LeetCode session: ${status.error}. Please ensure you are logged into LeetCode or import via CSV/JSON.`
    };
  }

  if (!status.isSignedIn) {
    return {
      success: false,
      questions: [],
      username: null,
      message: 'You are currently not signed in to LeetCode. Please log into your LeetCode account at leetcode.com, or use the CSV/JSON manual import fallback.'
    };
  }

  onProgress({
    phase: 'fetching',
    message: `Logged in as @${status.username}. Fetching solved problems...`,
    username: status.username
  });

  const allFetched = [];
  let skip = 0;
  const limit = 50;
  let hasMore = true;
  let batchCount = 0;

  while (hasMore && allFetched.length < maxTotal) {
    batchCount++;
    onProgress({
      phase: 'fetching_batch',
      message: `Fetching problems ${skip + 1} - ${skip + limit}...`,
      count: allFetched.length
    });

    const batch = await fetchSolvedQuestionsBatch(skip, limit, options);
    if (batch.error) {
      if (allFetched.length > 0) {
        // We have partial results, keep them
        break;
      }
      return {
        success: false,
        questions: [],
        username: status.username,
        message: `LeetCode API error while syncing: ${batch.error}. Please try again later or use CSV import.`
      };
    }

    if (batch.questions.length === 0) {
      break;
    }

    allFetched.push(...batch.questions);
    skip += limit;
    hasMore = batch.hasMore;

    // Safety guard against infinite loops
    if (batchCount > 50) break;
  }

  return {
    success: true,
    questions: allFetched,
    username: status.username,
    message: `Successfully synchronized ${allFetched.length} solved questions from @${status.username}'s LeetCode account!`
  };
}
