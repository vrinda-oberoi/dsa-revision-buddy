import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DateProvider,
  getTodayDateString,
  isMidnightCrossed
} from '../src/services/dateUtils.js';

import {
  getDailyProgress,
  saveDailyProgress,
  markQuestionCompleted,
  getLibrary,
  saveLibrary,
  getInvitationState,
  dismissInvitationToday,
  shouldShowInvitationToday
} from '../src/storage/storage.js';

test('Daily progress, completion tracking, and midnight rollover reset', async () => {
  // Start on Day 1: 2026-10-17
  DateProvider.setSimulatedDate(new Date(2026, 9, 17, 10, 0, 0));
  assert.equal(getTodayDateString(), '2026-10-17');

  // Initialize library with mock questions
  await saveLibrary([
    { id: '1', title: 'Two Sum', status: 'solved', revisionCount: 0, nextRevisionDate: null },
    { id: '2', title: 'Add Two Numbers', status: 'solved', revisionCount: 0, nextRevisionDate: null },
    { id: '3', title: 'Longest Substring', status: 'solved', revisionCount: 0, nextRevisionDate: null }
  ]);

  // Initial progress: 0/3
  let progress = await getDailyProgress();
  assert.equal(progress.date, '2026-10-17');
  assert.equal(progress.completedCount, 0);
  assert.equal(progress.completedQuestionIds.length, 0);
  assert.equal(progress.target, 3);

  // Invitation should be shown initially
  let shouldShow = await shouldShowInvitationToday();
  assert.equal(shouldShow, true);

  // User completes Question 1 with "easy" (15 days)
  const result1 = await markQuestionCompleted('1', 'easy');
  assert.equal(result1.updatedQuestion.revisionCount, 1);
  assert.equal(result1.nextSchedule.daysToAdd, 15);
  assert.equal(result1.updatedQuestion.nextRevisionDate, '2026-11-01');

  progress = await getDailyProgress();
  assert.equal(progress.completedCount, 1);
  assert.deepEqual(progress.completedQuestionIds, ['1']);

  // Complete Question 2 with "hint" (7 days)
  await markQuestionCompleted('2', 'hint');
  progress = await getDailyProgress();
  assert.equal(progress.completedCount, 2);

  // Complete Question 3 with "hard" (4 days)
  await markQuestionCompleted('3', 'hard');
  progress = await getDailyProgress();
  assert.equal(progress.completedCount, 3);
  assert.equal(progress.completedCount >= progress.target, true);

  // Once target is reached, invitation should not show
  shouldShow = await shouldShowInvitationToday();
  assert.equal(shouldShow, false);

  // Simulate Overnight Roll-over to Day 2: 2026-10-18
  DateProvider.setSimulatedDate(new Date(2026, 9, 18, 0, 5, 0));
  assert.equal(getTodayDateString(), '2026-10-18');

  // Next day: getDailyProgress must automatically detect midnight crossed and reset to 0
  const day2Progress = await getDailyProgress();
  assert.equal(day2Progress.date, '2026-10-18');
  assert.equal(day2Progress.completedCount, 0);
  assert.equal(day2Progress.completedQuestionIds.length, 0);
  assert.equal(day2Progress.target, 3);

  // Crucial check: Question library and future schedules MUST NOT be erased!
  const library = await getLibrary();
  const q1 = library.find(q => q.id === '1');
  const q2 = library.find(q => q.id === '2');
  const q3 = library.find(q => q.id === '3');
  assert.equal(q1.revisionCount, 1);
  assert.equal(q1.nextRevisionDate, '2026-11-01');
  assert.equal(q2.revisionCount, 1);
  assert.equal(q2.nextRevisionDate, '2026-10-24');
  assert.equal(q3.revisionCount, 1);
  assert.equal(q3.nextRevisionDate, '2026-10-21');

  // Invitation state on new day should also reset to eligible
  const day2Inv = await getInvitationState();
  assert.equal(day2Inv.date, '2026-10-18');
  assert.equal(day2Inv.dismissed, false);
  const day2ShouldShow = await shouldShowInvitationToday();
  assert.equal(day2ShouldShow, true);

  // Clean up
  DateProvider.reset();
});
