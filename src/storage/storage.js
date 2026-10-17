/**
 * Unified Storage Service
 * Works seamlessly with chrome.storage.local, with transparent fallback
 * to localStorage and in-memory store for browser preview and Node.js testing.
 */

import { getTodayDateString, isMidnightCrossed } from '../services/dateUtils.js';
import { STARTER_QUESTIONS } from '../data/starterQuestions.js';
import { DEFAULT_SETTINGS, calculateNextRevision } from '../services/scheduler.js';

export const STORAGE_KEYS = {
  LIBRARY: 'dsa_library',
  PROGRESS: 'dsa_daily_progress',
  SETTINGS: 'dsa_settings',
  INVITATION: 'dsa_invitation',
  HISTORY: 'dsa_history',
  SYNC_META: 'dsa_sync_meta'
};

// In-memory fallback dictionary
const memoryStore = new Map();

/**
 * Low-level async get
 * @param {string} key 
 * @returns {Promise<any>}
 */
export async function storageGet(key) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result ? result[key] : undefined);
      });
    });
  }

  if (typeof localStorage !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (e) {
      return memoryStore.get(key);
    }
  }

  return memoryStore.get(key);
}

/**
 * Low-level async set
 * @param {string} key 
 * @param {any} value 
 * @returns {Promise<void>}
 */
export async function storageSet(key, value) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    });
  }

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      memoryStore.set(key, value);
    }
    return;
  }

  memoryStore.set(key, value);
}

/**
 * Get the full question library.
 * Initializes with STARTER_QUESTIONS if storage is currently empty.
 * @returns {Promise<Array>}
 */
export async function getLibrary() {
  const library = await storageGet(STORAGE_KEYS.LIBRARY);
  if (!Array.isArray(library) || library.length === 0) {
    const initial = STARTER_QUESTIONS.map(q => ({ ...q }));
    await saveLibrary(initial);
    return initial;
  }
  return library;
}

/**
 * Save the entire question library
 * @param {Array} library 
 * @returns {Promise<void>}
 */
export async function saveLibrary(library) {
  await storageSet(STORAGE_KEYS.LIBRARY, library);
}

/**
 * Upsert a single question by its problem ID
 * @param {object} question 
 * @returns {Promise<Array>} updated library
 */
export async function upsertQuestion(question) {
  if (!question || !question.id) return [];
  const library = await getLibrary();
  const idStr = String(question.id);
  const idx = library.findIndex(q => String(q.id) === idStr);

  if (idx !== -1) {
    library[idx] = { ...library[idx], ...question };
  } else {
    library.push({ ...question });
  }

  await saveLibrary(library);
  return library;
}

/**
 * Get user settings with defaults
 * @returns {Promise<object>}
 */
export async function getSettings() {
  const settings = await storageGet(STORAGE_KEYS.SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...(settings || {}),
    intervals: {
      ...DEFAULT_SETTINGS.intervals,
      ...((settings && settings.intervals) || {})
    },
    questionSource: settings?.questionSource || DEFAULT_SETTINGS.questionSource || 'dsa_only',
    customTopics: Array.isArray(settings?.customTopics) ? settings.customTopics : DEFAULT_SETTINGS.customTopics
  };
}

/**
 * Save user settings
 * @param {object} newSettings 
 * @returns {Promise<object>}
 */
export async function saveSettings(newSettings) {
  const current = await getSettings();
  const merged = {
    ...current,
    ...newSettings,
    intervals: {
      ...current.intervals,
      ...(newSettings.intervals || {})
    },
    questionSource: newSettings.questionSource !== undefined ? newSettings.questionSource : current.questionSource,
    customTopics: newSettings.customTopics !== undefined ? newSettings.customTopics : current.customTopics
  };
  await storageSet(STORAGE_KEYS.SETTINGS, merged);
  return merged;
}

/**
 * Update manual inclusion/exclusion status of a question
 * @param {string|number} questionId 
 * @param {'included'|'excluded'|'auto'} manualInclusion 
 * @returns {Promise<Array>} updated library
 */
export async function updateQuestionInclusion(questionId, manualInclusion) {
  const idStr = String(questionId);
  const library = await getLibrary();
  const idx = library.findIndex(q => String(q.id) === idStr);

  if (idx !== -1) {
    if (manualInclusion === 'auto' || !manualInclusion) {
      delete library[idx].manualInclusion;
      delete library[idx].isExcluded;
    } else if (manualInclusion === 'excluded') {
      library[idx].manualInclusion = 'excluded';
      library[idx].isExcluded = true;
    } else if (manualInclusion === 'included') {
      library[idx].manualInclusion = 'included';
      library[idx].isExcluded = false;
    }
    await saveLibrary(library);
  }

  return library;
}

/**
 * Get daily progress with automatic midnight rollover detection.
 * Resets counter to 0 if a new local day has begun.
 * 
 * @returns {Promise<{ date: string, completedCount: number, completedQuestionIds: Array<string>, target: number }>}
 */
export async function getDailyProgress() {
  const today = getTodayDateString();
  const settings = await getSettings();
  const rawProgress = await storageGet(STORAGE_KEYS.PROGRESS);

  const fallback = {
    date: today,
    completedCount: 0,
    completedQuestionIds: [],
    target: settings.dailyTarget || 3
  };

  if (!rawProgress || typeof rawProgress !== 'object') {
    await storageSet(STORAGE_KEYS.PROGRESS, fallback);
    return fallback;
  }

  // Check midnight rollover: if stored date is older than today
  if (isMidnightCrossed(rawProgress.date, today)) {
    const rolledOver = {
      date: today,
      completedCount: 0,
      completedQuestionIds: [],
      target: settings.dailyTarget || 3
    };
    await storageSet(STORAGE_KEYS.PROGRESS, rolledOver);
    return rolledOver;
  }

  return {
    date: rawProgress.date || today,
    completedCount: typeof rawProgress.completedCount === 'number' ? rawProgress.completedCount : 0,
    completedQuestionIds: Array.isArray(rawProgress.completedQuestionIds) ? rawProgress.completedQuestionIds : [],
    target: settings.dailyTarget || 3
  };
}

/**
 * Save daily progress
 * @param {object} progress 
 * @returns {Promise<void>}
 */
export async function saveDailyProgress(progress) {
  await storageSet(STORAGE_KEYS.PROGRESS, progress);
}

/**
 * Get revision history log
 * @returns {Promise<Array>}
 */
export async function getHistory() {
  const history = await storageGet(STORAGE_KEYS.HISTORY);
  return Array.isArray(history) ? history : [];
}

/**
 * Append entry to revision history log
 * @param {object} entry 
 * @returns {Promise<Array>}
 */
export async function appendHistory(entry) {
  const history = await getHistory();
  history.unshift({
    timestamp: Date.now(),
    date: getTodayDateString(),
    ...entry
  });
  // Keep last 500 history entries
  const trimmed = history.slice(0, 500);
  await storageSet(STORAGE_KEYS.HISTORY, trimmed);
  return trimmed;
}

/**
 * Complete a question revision:
 * 1. Updates question in library (schedule, feedback, revisionCount)
 * 2. Increments daily completed count and adds to completedQuestionIds
 * 3. Appends entry to revision history log
 * 
 * Prevents double-completion by checking if question was already marked completed in current session.
 * 
 * @param {string|number} questionId 
 * @param {'easy'|'hint'|'hard'} feedback 
 * @param {object} [options]
 * @param {number} [options.customIntervalDays]
 * @returns {Promise<{ updatedQuestion: object, progress: object, nextSchedule: object }>}
 */
export async function markQuestionCompleted(questionId, feedback, options = {}) {
  const idStr = String(questionId);
  const library = await getLibrary();
  const qIndex = library.findIndex(q => String(q.id) === idStr);
  const settings = await getSettings();
  const progress = await getDailyProgress();

  const question = qIndex !== -1 ? library[qIndex] : null;
  const currentCount = question?.revisionCount || 0;

  const nextSchedule = calculateNextRevision(feedback, currentCount, {
    customIntervalDays: options.customIntervalDays,
    settings
  });

  const historyEntry = {
    date: nextSchedule.lastRevisionDate,
    feedback: nextSchedule.feedback,
    nextRevisionDate: nextSchedule.nextRevisionDate,
    timestamp: Date.now()
  };

  const updatedQuestion = question ? {
    ...question,
    revisionCount: nextSchedule.revisionCount,
    lastRevisionDate: nextSchedule.lastRevisionDate,
    previousFeedback: nextSchedule.feedback,
    nextRevisionDate: nextSchedule.nextRevisionDate,
    history: [historyEntry, ...(question.history || [])]
  } : {
    id: idStr,
    title: `Problem ${idStr}`,
    revisionCount: nextSchedule.revisionCount,
    lastRevisionDate: nextSchedule.lastRevisionDate,
    previousFeedback: nextSchedule.feedback,
    nextRevisionDate: nextSchedule.nextRevisionDate,
    history: [historyEntry]
  };

  if (qIndex !== -1) {
    library[qIndex] = updatedQuestion;
  } else {
    library.push(updatedQuestion);
  }
  await saveLibrary(library);

  // Update daily progress if not already completed today
  if (!progress.completedQuestionIds.includes(idStr)) {
    progress.completedQuestionIds.push(idStr);
    progress.completedCount += 1;
    await saveDailyProgress(progress);
  }

  // Append to global history
  await appendHistory({
    id: idStr,
    title: updatedQuestion.title,
    difficulty: updatedQuestion.difficulty || 'Medium',
    feedback: nextSchedule.feedback,
    nextRevisionDate: nextSchedule.nextRevisionDate,
    daysAdded: nextSchedule.daysToAdd
  });

  return {
    updatedQuestion,
    progress,
    nextSchedule
  };
}

/**
 * Get invitation dismissal state for today
 * Resets automatically if date !== today
 * @returns {Promise<{ date: string, dismissed: boolean }>}
 */
export async function getInvitationState() {
  const today = getTodayDateString();
  const raw = await storageGet(STORAGE_KEYS.INVITATION);

  if (!raw || isMidnightCrossed(raw.date, today)) {
    const fresh = { date: today, dismissed: false };
    await storageSet(STORAGE_KEYS.INVITATION, fresh);
    return fresh;
  }

  return raw;
}

/**
 * Dismiss invitation for today
 * @returns {Promise<void>}
 */
export async function dismissInvitationToday() {
  const today = getTodayDateString();
  await storageSet(STORAGE_KEYS.INVITATION, { date: today, dismissed: true });
}

/**
 * Check if the first-visit daily invitation should be shown
 * Returns true if not dismissed today and daily progress is not already complete
 * @returns {Promise<boolean>}
 */
export async function shouldShowInvitationToday() {
  const settings = await getSettings();
  if (settings.showInvitation === false) return false;

  const invState = await getInvitationState();
  if (invState.dismissed) return false;

  const progress = await getDailyProgress();
  if (progress.completedCount >= progress.target) {
    return false; // Target already reached today!
  }

  return true;
}

/**
 * Get LeetCode sync metadata
 * @returns {Promise<{ lastSyncedAt: string|null, totalCount: number, username: string|null }>}
 */
export async function getSyncMeta() {
  const meta = await storageGet(STORAGE_KEYS.SYNC_META);
  return meta || { lastSyncedAt: null, totalCount: 0, username: null };
}

/**
 * Update LeetCode sync metadata
 * @param {object} meta 
 * @returns {Promise<void>}
 */
export async function updateSyncMeta(meta) {
  const current = await getSyncMeta();
  await storageSet(STORAGE_KEYS.SYNC_META, { ...current, ...meta });
}

/**
 * Reset daily progress (convenience helper for testing)
 * @returns {Promise<void>}
 */
export async function resetDailyProgressForTesting() {
  const settings = await getSettings();
  const today = getTodayDateString();
  await saveDailyProgress({
    date: today,
    completedCount: 0,
    completedQuestionIds: [],
    target: settings.dailyTarget || 3
  });
  await storageSet(STORAGE_KEYS.INVITATION, { date: today, dismissed: false });
}
