import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DateProvider,
  formatLocalDate,
  getTodayDateString,
  addDays,
  getDaysDifference,
  isDueOrOverdue,
  isMidnightCrossed,
  formatFriendlyDate
} from '../src/services/dateUtils.js';

import {
  calculateNextRevision,
  selectNextQuestion,
  categorizeLibrary,
  getDueQuestions,
  DEFAULT_SETTINGS
} from '../src/services/scheduler.js';

test('Date utilities - formatting and day additions', () => {
  const d = new Date(2026, 9, 17); // Oct 17, 2026
  DateProvider.setSimulatedDate(d);

  assert.equal(getTodayDateString(), '2026-10-17');
  assert.equal(addDays('2026-10-17', 5), '2026-10-22');
  assert.equal(addDays('2026-10-17', 15), '2026-11-01');
  assert.equal(addDays('2026-10-17', -2), '2026-10-15');

  assert.equal(getDaysDifference('2026-10-22', '2026-10-17'), 5);
  assert.equal(getDaysDifference('2026-10-15', '2026-10-17'), -2);

  assert.equal(isDueOrOverdue('2026-10-15', '2026-10-17'), true);
  assert.equal(isDueOrOverdue('2026-10-17', '2026-10-17'), true);
  assert.equal(isDueOrOverdue('2026-10-18', '2026-10-17'), false);

  assert.equal(isMidnightCrossed('2026-10-16', '2026-10-17'), true);
  assert.equal(isMidnightCrossed('2026-10-17', '2026-10-17'), false);

  assert.equal(formatFriendlyDate('2026-10-17', '2026-10-17'), 'Today');
  assert.equal(formatFriendlyDate('2026-10-18', '2026-10-17'), 'Tomorrow');
  assert.equal(formatFriendlyDate('2026-10-20', '2026-10-17'), 'In 3 days');
  assert.equal(formatFriendlyDate('2026-10-14', '2026-10-17'), '3 days overdue');

  DateProvider.reset();
});

test('Spaced Repetition Scheduler - interval calculations', () => {
  const today = '2026-10-17';

  // Easy: +15 days
  const easyResult = calculateNextRevision('easy', 0, { todayStr: today });
  assert.equal(easyResult.daysToAdd, 15);
  assert.equal(easyResult.nextRevisionDate, '2026-11-01');
  assert.equal(easyResult.revisionCount, 1);
  assert.equal(easyResult.lastRevisionDate, today);

  // Hint: +7 days
  const hintResult = calculateNextRevision('hint', 1, { todayStr: today });
  assert.equal(hintResult.daysToAdd, 7);
  assert.equal(hintResult.nextRevisionDate, '2026-10-24');
  assert.equal(hintResult.revisionCount, 2);

  // Hard default: +4 days
  const hardResult = calculateNextRevision('hard', 2, { todayStr: today });
  assert.equal(hardResult.daysToAdd, 4);
  assert.equal(hardResult.nextRevisionDate, '2026-10-21');
  assert.equal(hardResult.revisionCount, 3);

  // Hard custom choice: 3 days
  const hardChoice3 = calculateNextRevision('hard', 0, { customIntervalDays: 3, todayStr: today });
  assert.equal(hardChoice3.daysToAdd, 3);
  assert.equal(hardChoice3.nextRevisionDate, '2026-10-20');

  // Configurable settings
  const customSettings = {
    ...DEFAULT_SETTINGS,
    intervals: { easy: 20, hint: 10, hard: 5 }
  };
  const customEasy = calculateNextRevision('easy', 0, { settings: customSettings, todayStr: today });
  assert.equal(customEasy.daysToAdd, 20);
  assert.equal(customEasy.nextRevisionDate, '2026-11-06');
});

test('Spaced Repetition Scheduler - question selection priority', () => {
  const today = '2026-10-17';
  const library = [
    { id: '1', title: 'Two Sum', status: 'solved', nextRevisionDate: '2026-10-15', revisionCount: 1 }, // Overdue (2 days ago)
    { id: '2', title: 'Add Two Numbers', status: 'solved', nextRevisionDate: '2026-10-17', revisionCount: 1 }, // Due today
    { id: '3', title: 'Longest Substring', status: 'solved', nextRevisionDate: '2026-10-20', revisionCount: 2 }, // Due in future
    { id: '4', title: 'Median of Two Arrays', status: 'solved', nextRevisionDate: null, lastRevisionDate: null }, // Unrevised
    { id: '5', title: 'Longest Palindrome', status: 'solved', nextRevisionDate: '2026-10-10', revisionCount: 1 } // Most Overdue (7 days ago)
  ];

  // 1. Most overdue question (#5) should be selected first
  const selection1 = selectNextQuestion(library, [], { todayStr: today });
  assert.equal(selection1.question.id, '5');
  assert.equal(selection1.reason, 'overdue');

  // 2. If #5 is completed today, next most overdue is #1
  const selection2 = selectNextQuestion(library, ['5'], { todayStr: today });
  assert.equal(selection2.question.id, '1');
  assert.equal(selection2.reason, 'overdue');

  // 3. If #5 and #1 are completed, #2 (due today) is selected
  const selection3 = selectNextQuestion(library, ['5', '1'], { todayStr: today });
  assert.equal(selection3.question.id, '2');
  assert.equal(selection3.reason, 'due');

  // 4. If all due/overdue questions (#5, #1, #2) are completed, selects unrevised (#4)
  const selection4 = selectNextQuestion(library, ['5', '1', '2'], { todayStr: today });
  assert.equal(selection4.question.id, '4');
  assert.equal(selection4.reason, 'unrevised');

  // 5. If all remaining non-future questions are completed, selects random from remaining eligible (#3)
  const selection5 = selectNextQuestion(library, ['5', '1', '2', '4'], { todayStr: today });
  assert.equal(selection5.question.id, '3');
  assert.equal(selection5.reason, 'fresh_practice');

  // 6. When all questions are completed today
  const selection6 = selectNextQuestion(library, ['1', '2', '3', '4', '5'], { todayStr: today });
  assert.equal(selection6.question, null);
  assert.equal(selection6.reason, 'all_completed_today');

  // 7. Extra practice with allowRepeatsToday=true
  const selection7 = selectNextQuestion(library, ['1', '2', '3', '4', '5'], { allowRepeatsToday: true, todayStr: today });
  assert.ok(selection7.question !== null);
});
