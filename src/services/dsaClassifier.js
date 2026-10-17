/**
 * DSA Question Classification and Filtering Service
 * 
 * Accurately classifies problems using LeetCode topic tags and metadata.
 * Excludes SQL, Database, Pandas, Shell, and other non-DSA problems.
 * Flags problems with missing/unknown tags as "Needs Review".
 */

// Explicit non-DSA tags that indicate non-DSA problems
export const NON_DSA_TAGS = new Set([
  'database',
  'sql',
  'pandas',
  'shell',
  'bash',
  'concurrency',
  'operating system',
  'multithreading'
]);

// Canonical DSA Topics and their matching tag variations (case-insensitive)
export const DSA_TOPICS_MAP = {
  'Arrays and Hashing': [
    'array',
    'hash table',
    'hash',
    'hashing',
    'counting',
    'prefix sum'
  ],
  'Strings': [
    'string',
    'string matching',
    'rolling hash'
  ],
  'Two Pointers': [
    'two pointers',
    'two pointer'
  ],
  'Sliding Window': [
    'sliding window'
  ],
  'Binary Search': [
    'binary search',
    'bisection'
  ],
  'Sorting': [
    'sorting',
    'sort',
    'bucket sort',
    'radix sort',
    'merge sort',
    'quickselect'
  ],
  'Linked Lists': [
    'linked list',
    'doubly-linked list',
    'doubly linked list'
  ],
  'Stacks and Queues': [
    'stack',
    'queue',
    'monotonic queue',
    'deque'
  ],
  'Recursion and Backtracking': [
    'recursion',
    'backtracking'
  ],
  'Trees and Binary Trees': [
    'tree',
    'binary tree'
  ],
  'Binary Search Trees': [
    'binary search tree',
    'bst'
  ],
  'Heaps and Priority Queues': [
    'heap (priority queue)',
    'heap',
    'priority queue'
  ],
  'Graphs': [
    'graph',
    'breadth-first search',
    'depth-first search',
    'bfs',
    'dfs',
    'topological sort',
    'shortest path',
    'minimum spanning tree',
    'union find',
    'biconnected component',
    'strongly connected component',
    'eulerian circuit'
  ],
  'Greedy Algorithms': [
    'greedy'
  ],
  'Dynamic Programming': [
    'dynamic programming',
    'dp',
    'memoization'
  ],
  'Tries': [
    'trie'
  ],
  'Bit Manipulation': [
    'bit manipulation',
    'bitmask',
    'bitwise'
  ],
  'Intervals': [
    'intervals',
    'interval',
    'line sweep'
  ],
  'Monotonic Stack': [
    'monotonic stack'
  ],
  'Math and Bitwise DSA': [
    'math',
    'number theory',
    'combinatorics',
    'geometry',
    'game theory',
    'probability and statistics',
    'matrix',
    'divide and conquer',
    'segment tree',
    'binary indexed tree'
  ]
};

// Array of canonical DSA topic names for settings UI
export const CANONICAL_DSA_TOPICS = Object.keys(DSA_TOPICS_MAP);

/**
 * Normalize an individual tag string
 * @param {string} tag 
 * @returns {string}
 */
export function normalizeTag(tag) {
  if (!tag) return '';
  return String(tag).trim().toLowerCase();
}

/**
 * Classifies a question based on its topic tags and metadata.
 * 
 * Rules:
 * 1. If any tag matches NON_DSA_TAGS (e.g. Database, SQL, Pandas) -> isNonDsa = true
 * 2. If topics are empty or null -> needsReview = true, isDsa = false
 * 3. Match against canonical DSA topics:
 *    - If at least one match and no non-DSA tags -> isDsa = true
 *    - If no non-DSA tags and no DSA matches -> needsReview = true (unknown category)
 * 
 * @param {object} question 
 * @returns {{
 *   isDsa: boolean,
 *   isNonDsa: boolean,
 *   needsReview: boolean,
 *   matchedTopics: string[],
 *   categoryLabel: 'DSA' | 'Non-DSA' | 'Needs Review',
 *   reason: string
 * }}
 */
export function classifyQuestion(question) {
  if (!question) {
    return {
      isDsa: false,
      isNonDsa: false,
      needsReview: true,
      matchedTopics: [],
      categoryLabel: 'Needs Review',
      reason: 'No question data provided'
    };
  }

  // Extract and normalize topics
  const rawTopics = Array.isArray(question.topics) ? question.topics : [];
  const normalizedTags = rawTopics.map(t => normalizeTag(t)).filter(Boolean);

  // Check URL or categorySlug if available
  const urlLower = String(question.url || '').toLowerCase();
  const hasSqlInUrl = urlLower.includes('/database/') || urlLower.includes('/pandas/');

  // 1. Check for explicit non-DSA tags
  const matchedNonDsaTag = normalizedTags.find(tag => NON_DSA_TAGS.has(tag));
  if (matchedNonDsaTag || hasSqlInUrl) {
    return {
      isDsa: false,
      isNonDsa: true,
      needsReview: false,
      matchedTopics: [],
      categoryLabel: 'Non-DSA',
      reason: `Contains non-DSA tag: ${matchedNonDsaTag || 'Database/Pandas'}`
    };
  }

  // 2. Check for missing or empty tags
  if (normalizedTags.length === 0) {
    return {
      isDsa: false,
      isNonDsa: false,
      needsReview: true,
      matchedTopics: [],
      categoryLabel: 'Needs Review',
      reason: 'Missing topic tags (Needs Review)'
    };
  }

  // 3. Match against canonical DSA topics
  const matchedCanonicalTopics = new Set();

  for (const [canonicalTopic, tagAliases] of Object.entries(DSA_TOPICS_MAP)) {
    for (const tag of normalizedTags) {
      if (tagAliases.some(alias => alias === tag || tag.includes(alias))) {
        matchedCanonicalTopics.add(canonicalTopic);
      }
    }
  }

  const matchedTopicsList = Array.from(matchedCanonicalTopics);

  if (matchedTopicsList.length > 0) {
    return {
      isDsa: true,
      isNonDsa: false,
      needsReview: false,
      matchedTopics: matchedTopicsList,
      categoryLabel: 'DSA',
      reason: `Matched DSA topics: ${matchedTopicsList.join(', ')}`
    };
  }

  // If tags are present but none matched DSA and none matched Non-DSA
  return {
    isDsa: false,
    isNonDsa: false,
    needsReview: true,
    matchedTopics: [],
    categoryLabel: 'Needs Review',
    reason: `Unrecognized topic tags: ${rawTopics.join(', ')} (Needs Review)`
  };
}

/**
 * Determine if a question is eligible for revision based on:
 * 1. Manual exclusion/inclusion override (Rule 1: Always respected)
 * 2. Revision question source setting ('dsa_only' | 'all' | 'custom')
 * 
 * @param {object} question 
 * @param {object} settings 
 * @returns {boolean}
 */
export function isQuestionEligible(question, settings = {}) {
  if (!question) return false;

  // RULE 1: Manual inclusion/exclusion overrides
  // If explicitly excluded by the user -> NEVER ELIGIBLE
  if (question.manualInclusion === 'excluded' || question.isExcluded === true) {
    return false;
  }

  // If explicitly included by the user -> ALWAYS ELIGIBLE (even if Needs Review or Non-DSA)
  if (question.manualInclusion === 'included') {
    return true;
  }

  // RULE 2: Source Filter
  const source = settings.questionSource || 'dsa_only';
  const classification = classifyQuestion(question);

  if (source === 'all') {
    // In "All Solved Questions" mode, all questions are eligible unless manually excluded
    return true;
  }

  if (source === 'dsa_only') {
    // In "DSA Only" mode, only questions positively classified as DSA are eligible
    // "Needs Review" and "Non-DSA" are excluded by default
    return classification.isDsa && !classification.isNonDsa && !classification.needsReview;
  }

  if (source === 'custom') {
    // In "Custom Topics" mode, must match at least one of the user's selected topics
    const activeCustomTopics = Array.isArray(settings.customTopics) && settings.customTopics.length > 0
      ? settings.customTopics
      : CANONICAL_DSA_TOPICS;

    if (!classification.isDsa || classification.isNonDsa) {
      return false;
    }

    return classification.matchedTopics.some(topic => activeCustomTopics.includes(topic));
  }

  return false;
}
