/**
 * Spaced Repetition Scheduling Engine & Revision Selector
 */

import {
  getTodayDateString,
  addDays,
  isDueOrOverdue,
  getDaysDifference
} from './dateUtils.js';

export const DEFAULT_SETTINGS = {
  dailyTarget: 3,
  intervals: {
    easy: 15,
    hint: 7,
    hard: 4
  },
  autoOpenProblemTab: true,
  showInvitation: true
};

/**
 * Calculates next revision schedule based on user feedback
 * @param {'easy'|'hint'|'hard'} feedback 
 * @param {number} currentRevisionCount 
 * @param {object} [options]
 * @param {number} [options.customIntervalDays]
 * @param {object} [options.settings]
 * @param {string} [options.todayStr]
 * @returns {object}
 */
export function calculateNextRevision(feedback, currentRevisionCount = 0, options = {}) {
  const settings = options.settings || DEFAULT_SETTINGS;
  const todayStr = options.todayStr || getTodayDateString();

  let daysToAdd = 15;
  if (feedback === 'easy') {
    daysToAdd = settings.intervals?.easy ?? 15;
  } else if (feedback === 'hint') {
    daysToAdd = settings.intervals?.hint ?? 7;
  } else if (feedback === 'hard') {
    // Allows manual choice of 3 or 4 days if specified
    daysToAdd = options.customIntervalDays ?? (settings.intervals?.hard ?? 4);
  }

  const nextRevisionDate = addDays(todayStr, daysToAdd);

  return {
    feedback,
    daysToAdd,
    nextRevisionDate,
    lastRevisionDate: todayStr,
    revisionCount: currentRevisionCount + 1
  };
}

/**
 * Filter questions that are due or overdue for revision today
 * @param {Array} library 
 * @param {string} [todayStr] 
 * @returns {Array}
 */
export function getDueQuestions(library = [], todayStr = getTodayDateString()) {
  return library.filter(q => {
    if (!q || !q.nextRevisionDate) return false;
    return isDueOrOverdue(q.nextRevisionDate, todayStr);
  });
}

/**
 * Categorize questions by revision urgency
 * @param {Array} library 
 * @param {string} [todayStr] 
 * @returns {object}
 */
export function categorizeLibrary(library = [], todayStr = getTodayDateString()) {
  const overdue = [];
  const dueToday = [];
  const upcoming = [];
  const unrevised = [];

  for (const q of library) {
    if (!q) continue;
    if (!q.nextRevisionDate) {
      unrevised.push(q);
      continue;
    }
    const diff = getDaysDifference(q.nextRevisionDate, todayStr);
    if (diff < 0) {
      overdue.push(q);
    } else if (diff === 0) {
      dueToday.push(q);
    } else {
      upcoming.push(q);
    }
  }

  // Sort overdue: most overdue first (smallest nextRevisionDate)
  overdue.sort((a, b) => a.nextRevisionDate.localeCompare(b.nextRevisionDate));
  // Sort upcoming: soonest first
  upcoming.sort((a, b) => a.nextRevisionDate.localeCompare(b.nextRevisionDate));

  return { overdue, dueToday, upcoming, unrevised };
}

/**
 * Select the next question to revise according to revision rules:
 * 1. Prioritize questions whose next revision date is due or overdue
 * 2. If no questions are due, select from remaining eligible solved questions
 * 3. Avoid showing same question twice in single day unless allowRepeatsToday is true
 * 
 * @param {Array} library 
 * @param {Array<string>} completedTodayIds 
 * @param {object} [options]
 * @param {boolean} [options.allowRepeatsToday=false]
 * @param {string} [options.todayStr]
 * @returns {{ question: object|null, reason: string, stats: object }}
 */
export function selectNextQuestion(library = [], completedTodayIds = [], options = {}) {
  const allowRepeats = options.allowRepeatsToday || false;
  const todayStr = options.todayStr || getTodayDateString();

  if (!Array.isArray(library) || library.length === 0) {
    return {
      question: null,
      reason: 'library_empty',
      stats: { total: 0, dueCount: 0, remainingEligible: 0 }
    };
  }

  // Eligible pool: prefer solved questions
  let eligiblePool = library.filter(q => q && (q.status === 'solved' || !q.status));
  if (eligiblePool.length === 0) {
    eligiblePool = [...library];
  }

  // Filter out questions already revised today unless repeats are allowed
  const uncompletedPool = allowRepeats
    ? eligiblePool
    : eligiblePool.filter(q => !completedTodayIds.includes(String(q.id)));

  // 1. Due or Overdue Questions
  const dueQuestions = uncompletedPool.filter(q => q.nextRevisionDate && isDueOrOverdue(q.nextRevisionDate, todayStr));
  
  if (dueQuestions.length > 0) {
    // Sort priority:
    // a. Most overdue first (lowest nextRevisionDate)
    // b. Oldest lastRevisionDate
    // c. Lowest revision count
    dueQuestions.sort((a, b) => {
      if (a.nextRevisionDate !== b.nextRevisionDate) {
        return a.nextRevisionDate.localeCompare(b.nextRevisionDate);
      }
      const aLast = a.lastRevisionDate || '';
      const bLast = b.lastRevisionDate || '';
      if (aLast !== bLast) return aLast.localeCompare(bLast);
      return (a.revisionCount || 0) - (b.revisionCount || 0);
    });

    const isOverdue = getDaysDifference(dueQuestions[0].nextRevisionDate, todayStr) < 0;
    return {
      question: dueQuestions[0],
      reason: isOverdue ? 'overdue' : 'due',
      stats: {
        total: library.length,
        dueCount: dueQuestions.length,
        remainingEligible: uncompletedPool.length
      }
    };
  }

  // 2. No questions are due: Select from remaining unrevised or non-due questions
  if (uncompletedPool.length > 0) {
    // First priority among non-due: unrevised questions (never revised yet)
    const unrevisedQuestions = uncompletedPool.filter(q => (!q.revisionCount || q.revisionCount === 0) && !q.lastRevisionDate && !q.nextRevisionDate);
    if (unrevisedQuestions.length > 0) {
      // Pick random from unrevised
      const randomIndex = Math.floor(Math.random() * unrevisedQuestions.length);
      return {
        question: unrevisedQuestions[randomIndex],
        reason: 'unrevised',
        stats: {
          total: library.length,
          dueCount: 0,
          remainingEligible: uncompletedPool.length
        }
      };
    }

    // Otherwise, pick random from uncompleted pool
    const randomIndex = Math.floor(Math.random() * uncompletedPool.length);
    return {
      question: uncompletedPool[randomIndex],
      reason: 'fresh_practice',
      stats: {
        total: library.length,
        dueCount: 0,
        remainingEligible: uncompletedPool.length
      }
    };
  }

  // 3. All eligible questions completed today
  return {
    question: null,
    reason: 'all_completed_today',
    stats: {
      total: library.length,
      dueCount: 0,
      remainingEligible: 0
    }
  };
}
