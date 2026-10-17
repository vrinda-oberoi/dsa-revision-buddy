/**
 * CSV and JSON Import/Export with Deduplication and Schema Validation
 */

/**
 * Slugify a problem title into a LeetCode problem slug
 * @param {string} title 
 * @returns {string}
 */
export function slugifyTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Normalize difficulty string to standard "Easy" | "Medium" | "Hard"
 * @param {string} diff 
 * @returns {"Easy"|"Medium"|"Hard"}
 */
export function normalizeDifficulty(diff) {
  if (!diff) return 'Medium';
  const lower = String(diff).toLowerCase().trim();
  if (lower.startsWith('e')) return 'Easy';
  if (lower.startsWith('h')) return 'Hard';
  return 'Medium';
}

/**
 * Normalize topics / tags into string array
 * @param {string|Array} topics 
 * @returns {Array<string>}
 */
export function normalizeTopics(topics) {
  if (Array.isArray(topics)) {
    return topics.map(t => typeof t === 'object' && t ? (t.name || t.slug || '') : String(t)).filter(Boolean);
  }
  if (typeof topics === 'string') {
    return topics
      .split(/[,;|]/)
      .map(t => t.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Parse CSV line taking quotes into account
 * @param {string} text 
 * @returns {Array<Array<string>>}
 */
export function parseCSV(text) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentLine.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentLine.push(currentField.trim());
      if (currentLine.some(field => field.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(field => field.length > 0)) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Parse and validate CSV data into standardized Question objects
 * @param {string} csvString 
 * @returns {{ questions: Array, errors: Array<string> }}
 */
export function importFromCSV(csvString) {
  const errors = [];
  const questions = [];

  if (!csvString || typeof csvString !== 'string' || !csvString.trim()) {
    errors.push('CSV content is empty.');
    return { questions, errors };
  }

  const rows = parseCSV(csvString);
  if (rows.length < 2) {
    errors.push('CSV must contain a header row and at least one data row.');
    return { questions, errors };
  }

  const headerRow = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  
  // Find column indices
  const idIdx = headerRow.findIndex(h => h === 'id' || h === 'problemid' || h === 'number' || h === 'frontendquestionid');
  const titleIdx = headerRow.findIndex(h => h === 'title' || h === 'problemtitle' || h === 'name');
  const urlIdx = headerRow.findIndex(h => h === 'url' || h === 'link' || h === 'problemlink');
  const diffIdx = headerRow.findIndex(h => h === 'difficulty' || h === 'diff' || h === 'level');
  const topicIdx = headerRow.findIndex(h => h === 'topic' || h === 'topics' || h === 'tag' || h === 'tags');
  const statusIdx = headerRow.findIndex(h => h === 'status' || h === 'state' || h === 'solved');
  const nextRevIdx = headerRow.findIndex(h => h === 'nextrevisiondate' || h === 'nextdue' || h === 'duedate');
  const revCountIdx = headerRow.findIndex(h => h === 'revisioncount' || h === 'revisions' || h === 'count');

  if (idIdx === -1 && titleIdx === -1 && urlIdx === -1) {
    errors.push('Could not find Problem ID, Title, or URL column in CSV header.');
    return { questions, errors };
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || row.every(cell => !cell)) continue;

    let rawId = idIdx !== -1 ? row[idIdx] : '';
    let rawTitle = titleIdx !== -1 ? row[titleIdx] : '';
    let rawUrl = urlIdx !== -1 ? row[urlIdx] : '';
    let rawDiff = diffIdx !== -1 ? row[diffIdx] : 'Medium';
    let rawTopics = topicIdx !== -1 ? row[topicIdx] : '';
    let rawStatus = statusIdx !== -1 ? row[statusIdx] : 'solved';
    let rawNextRev = nextRevIdx !== -1 ? row[nextRevIdx] : null;
    let rawRevCount = revCountIdx !== -1 ? parseInt(row[revCountIdx], 10) : 0;

    // Derive ID if missing from URL or title
    if (!rawId) {
      if (rawUrl) {
        const match = rawUrl.match(/problems\/([^/]+)/);
        if (match) rawId = match[1];
      }
      if (!rawId && rawTitle) {
        rawId = slugifyTitle(rawTitle);
      }
    }

    if (!rawId) {
      errors.push(`Row ${i + 1}: Skipped row due to missing problem ID or Title.`);
      continue;
    }

    if (!rawTitle) {
      rawTitle = `Problem ${rawId}`;
    }

    if (!rawUrl) {
      rawUrl = `https://leetcode.com/problems/${slugifyTitle(rawTitle)}/`;
    }

    questions.push({
      id: String(rawId).trim(),
      title: String(rawTitle).trim(),
      url: String(rawUrl).trim(),
      difficulty: normalizeDifficulty(rawDiff),
      topics: normalizeTopics(rawTopics),
      status: String(rawStatus).toLowerCase().includes('solv') || String(rawStatus).toLowerCase() === 'ac' ? 'solved' : 'attempted',
      lastRevisionDate: null,
      revisionCount: isNaN(rawRevCount) ? 0 : rawRevCount,
      previousFeedback: null,
      nextRevisionDate: rawNextRev && /^\d{4}-\d{2}-\d{2}$/.test(rawNextRev) ? rawNextRev : null,
      history: []
    });
  }

  return { questions, errors };
}

/**
 * Parse and validate JSON data into standardized Question objects
 * Supports array of questions or export backup object { version, questions }
 * @param {string|object} jsonData 
 * @returns {{ questions: Array, errors: Array<string> }}
 */
export function importFromJSON(jsonData) {
  const errors = [];
  const questions = [];

  let data;
  if (typeof jsonData === 'string') {
    try {
      data = JSON.parse(jsonData);
    } catch (e) {
      errors.push(`Invalid JSON: ${e.message}`);
      return { questions, errors };
    }
  } else {
    data = jsonData;
  }

  const rawList = Array.isArray(data) ? data : (data && Array.isArray(data.questions) ? data.questions : null);

  if (!rawList) {
    errors.push('Expected a JSON array of questions or an object with a "questions" array.');
    return { questions, errors };
  }

  for (let i = 0; i < rawList.length; i++) {
    const item = rawList[i];
    if (!item || typeof item !== 'object') {
      errors.push(`Item ${i + 1}: Invalid item structure.`);
      continue;
    }

    const id = item.id || item.frontendQuestionId || item.questionFrontendId || (item.url ? item.url.match(/problems\/([^/]+)/)?.[1] : null);
    if (!id) {
      errors.push(`Item ${i + 1}: Missing problem ID.`);
      continue;
    }

    const title = item.title || item.problemTitle || `Problem ${id}`;
    const url = item.url || (item.titleSlug ? `https://leetcode.com/problems/${item.titleSlug}/` : `https://leetcode.com/problems/${slugifyTitle(title)}/`);
    const difficulty = normalizeDifficulty(item.difficulty);
    const topics = normalizeTopics(item.topics || item.topicTags);
    const status = item.status === 'attempted' ? 'attempted' : 'solved';

    questions.push({
      id: String(id).trim(),
      title: String(title).trim(),
      url: String(url).trim(),
      difficulty,
      topics,
      status,
      lastRevisionDate: item.lastRevisionDate || null,
      revisionCount: typeof item.revisionCount === 'number' ? item.revisionCount : 0,
      previousFeedback: item.previousFeedback || null,
      nextRevisionDate: item.nextRevisionDate || null,
      history: Array.isArray(item.history) ? item.history : []
    });
  }

  return { questions, errors };
}

/**
 * Merge and deduplicate new questions into existing question library.
 * Preserves existing revision counts, histories, and schedules unless explicitly overridden.
 * 
 * @param {Array} existingLibrary 
 * @param {Array} newQuestions 
 * @returns {{ mergedLibrary: Array, addedCount: number, updatedCount: number }}
 */
export function mergeLibrary(existingLibrary = [], newQuestions = []) {
  const libraryMap = new Map();
  
  // Index existing questions
  for (const q of existingLibrary) {
    if (q && q.id) {
      libraryMap.set(String(q.id), { ...q });
    }
  }

  let addedCount = 0;
  let updatedCount = 0;

  for (const incoming of newQuestions) {
    if (!incoming || !incoming.id) continue;
    const idKey = String(incoming.id);

    if (libraryMap.has(idKey)) {
      const existing = libraryMap.get(idKey);
      // Update metadata while preserving revision history and scheduling
      libraryMap.set(idKey, {
        ...existing,
        title: incoming.title || existing.title,
        url: incoming.url || existing.url,
        difficulty: incoming.difficulty || existing.difficulty,
        topics: incoming.topics?.length ? incoming.topics : existing.topics,
        status: incoming.status || existing.status,
        // Only override nextRevisionDate if incoming explicitly provided one and existing has none
        nextRevisionDate: existing.nextRevisionDate || incoming.nextRevisionDate || null,
        revisionCount: Math.max(existing.revisionCount || 0, incoming.revisionCount || 0),
        lastRevisionDate: existing.lastRevisionDate || incoming.lastRevisionDate || null,
        history: existing.history?.length ? existing.history : (incoming.history || [])
      });
      updatedCount++;
    } else {
      libraryMap.set(idKey, { ...incoming });
      addedCount++;
    }
  }

  return {
    mergedLibrary: Array.from(libraryMap.values()),
    addedCount,
    updatedCount
  };
}

/**
 * Export library to CSV string
 * @param {Array} library 
 * @returns {string}
 */
export function exportToCSV(library = []) {
  const headers = ['Problem ID', 'Title', 'URL', 'Difficulty', 'Topics', 'Status', 'Revision Count', 'Last Revision Date', 'Next Due Date'];
  const rows = [headers.join(',')];

  for (const q of library) {
    if (!q) continue;
    const escape = val => `"${String(val ?? '').replace(/"/g, '""')}"`;
    const row = [
      escape(q.id),
      escape(q.title),
      escape(q.url),
      escape(q.difficulty),
      escape(Array.isArray(q.topics) ? q.topics.join('; ') : q.topics),
      escape(q.status || 'solved'),
      q.revisionCount || 0,
      escape(q.lastRevisionDate || ''),
      escape(q.nextRevisionDate || '')
    ];
    rows.push(row.join(','));
  }

  return rows.join('\r\n');
}

/**
 * Export full backup to JSON string
 * @param {Array} library 
 * @param {object} [extraData] 
 * @returns {string}
 */
export function exportToJSON(library = [], extraData = {}) {
  const exportPayload = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    totalQuestions: library.length,
    questions: library,
    ...extraData
  };
  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Generate starter sample CSV string for users to view/download
 * @returns {string}
 */
export function getSampleCSVTemplate() {
  return [
    'Problem ID,Title,URL,Difficulty,Topics,Status',
    '1,Two Sum,https://leetcode.com/problems/two-sum/,Easy,Array; Hash Table,solved',
    '206,Reverse Linked List,https://leetcode.com/problems/reverse-linked-list/,Easy,Linked List; Recursion,solved',
    '3,Longest Substring Without Repeating Characters,https://leetcode.com/problems/longest-substring-without-repeating-characters/,Medium,Hash Table; Sliding Window,solved',
    '42,Trapping Rain Water,https://leetcode.com/problems/trapping-rain-water/,Hard,Array; Two Pointers; Stack,solved'
  ].join('\r\n');
}
