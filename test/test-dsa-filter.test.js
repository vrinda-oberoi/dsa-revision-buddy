import test from 'node:test';
import assert from 'node:assert/strict';

import {
  classifyQuestion,
  isQuestionEligible,
  CANONICAL_DSA_TOPICS
} from '../src/services/dsaClassifier.js';

import {
  selectNextQuestion,
  getDueQuestions
} from '../src/services/scheduler.js';

import {
  updateQuestionInclusion,
  getSettings,
  saveSettings,
  saveLibrary,
  getLibrary
} from '../src/storage/storage.js';

test('DSA Classifier - identifies DSA, non-DSA (SQL/Pandas), and Needs Review', () => {
  // 1. Valid DSA problems
  const twoSum = { id: '1', title: 'Two Sum', topics: ['Array', 'Hash Table'] };
  const res1 = classifyQuestion(twoSum);
  assert.equal(res1.isDsa, true);
  assert.equal(res1.isNonDsa, false);
  assert.equal(res1.needsReview, false);
  assert.equal(res1.categoryLabel, 'DSA');
  assert.ok(res1.matchedTopics.includes('Arrays and Hashing'));

  const invertTree = { id: '226', title: 'Invert Binary Tree', topics: ['Tree', 'Binary Tree', 'DFS'] };
  const resTree = classifyQuestion(invertTree);
  assert.equal(resTree.isDsa, true);
  assert.ok(resTree.matchedTopics.includes('Trees and Binary Trees'));
  assert.ok(resTree.matchedTopics.includes('Graphs'));

  // 2. Non-DSA SQL and Database problem
  const combineTables = { id: '175', title: 'Combine Two Tables', topics: ['Database'] };
  const resSql = classifyQuestion(combineTables);
  assert.equal(resSql.isDsa, false);
  assert.equal(resSql.isNonDsa, true);
  assert.equal(resSql.needsReview, false);
  assert.equal(resSql.categoryLabel, 'Non-DSA');

  // 3. Non-DSA Pandas problem
  const selectData = { id: '2880', title: 'Select Data', topics: ['Pandas'] };
  const resPandas = classifyQuestion(selectData);
  assert.equal(resPandas.isDsa, false);
  assert.equal(resPandas.isNonDsa, true);
  assert.equal(resPandas.categoryLabel, 'Non-DSA');

  // 4. Non-DSA Shell problem
  const tenthLine = { id: '195', title: 'Tenth Line', topics: ['Shell'] };
  const resShell = classifyQuestion(tenthLine);
  assert.equal(resShell.isDsa, false);
  assert.equal(resShell.isNonDsa, true);

  // 5. Missing or empty topic information (Needs Review)
  const unknownQuestion = { id: '9999', title: 'Mystery Problem', topics: [] };
  const resUnknown = classifyQuestion(unknownQuestion);
  assert.equal(resUnknown.isDsa, false);
  assert.equal(resUnknown.isNonDsa, false);
  assert.equal(resUnknown.needsReview, true);
  assert.equal(resUnknown.categoryLabel, 'Needs Review');
});

test('Question Eligibility - DSA Only, Custom Topics, and All Solved modes', () => {
  const dsaQ = { id: '1', title: 'Two Sum', topics: ['Array', 'Hash Table'] };
  const dpQ = { id: '322', title: 'Coin Change', topics: ['Dynamic Programming', 'Breadth-First Search'] };
  const sqlQ = { id: '175', title: 'Combine Two Tables', topics: ['Database'] };
  const unclassifiedQ = { id: '999', title: 'No Tag Problem', topics: [] };

  // Mode 1: DSA Only (default)
  const dsaSettings = { questionSource: 'dsa_only' };
  assert.equal(isQuestionEligible(dsaQ, dsaSettings), true);
  assert.equal(isQuestionEligible(dpQ, dsaSettings), true);
  assert.equal(isQuestionEligible(sqlQ, dsaSettings), false); // SQL NEVER eligible in DSA Only
  assert.equal(isQuestionEligible(unclassifiedQ, dsaSettings), false); // Needs Review excluded by default

  // Mode 2: Custom Topics (e.g. only Dynamic Programming)
  const customSettings = {
    questionSource: 'custom',
    customTopics: ['Dynamic Programming']
  };
  assert.equal(isQuestionEligible(dpQ, customSettings), true);
  assert.equal(isQuestionEligible(dsaQ, customSettings), false); // Array question not in customTopics
  assert.equal(isQuestionEligible(sqlQ, customSettings), false);

  // Mode 3: All Solved Questions
  const allSettings = { questionSource: 'all' };
  assert.equal(isQuestionEligible(dsaQ, allSettings), true);
  assert.equal(isQuestionEligible(sqlQ, allSettings), true); // SQL allowed if user explicitly chooses 'all'
  assert.equal(isQuestionEligible(unclassifiedQ, allSettings), true);
});

test('Manual Overrides - Manual exclusion and inclusion always take precedence', () => {
  const dsaSettings = { questionSource: 'dsa_only' };

  // Case 1: DSA problem manually excluded by user
  const excludedDsa = {
    id: '1',
    title: 'Two Sum',
    topics: ['Array', 'Hash Table'],
    manualInclusion: 'excluded'
  };
  assert.equal(isQuestionEligible(excludedDsa, dsaSettings), false);

  const excludedDsaFlag = {
    id: '1',
    title: 'Two Sum',
    topics: ['Array', 'Hash Table'],
    isExcluded: true
  };
  assert.equal(isQuestionEligible(excludedDsaFlag, dsaSettings), false);

  // Case 2: Non-DSA or Needs Review problem manually included by user
  const includedSql = {
    id: '175',
    title: 'Combine Two Tables',
    topics: ['Database'],
    manualInclusion: 'included'
  };
  assert.equal(isQuestionEligible(includedSql, dsaSettings), true);

  const includedNeedsReview = {
    id: '999',
    title: 'Custom Algorithm',
    topics: [],
    manualInclusion: 'included'
  };
  assert.equal(isQuestionEligible(includedNeedsReview, dsaSettings), true);
});

test('Scheduler - SQL questions never selected in DSA Only mode', () => {
  const mixedLibrary = [
    { id: '175', title: 'Combine Two Tables', topics: ['Database'], status: 'solved', nextRevisionDate: '2026-10-10' }, // Overdue SQL!
    { id: '176', title: 'Second Highest Salary', topics: ['Database', 'SQL'], status: 'solved', nextRevisionDate: '2026-10-10' }, // Overdue SQL!
    { id: '2880', title: 'Select Data', topics: ['Pandas'], status: 'solved', nextRevisionDate: '2026-10-10' }, // Overdue Pandas!
    { id: '1', title: 'Two Sum', topics: ['Array', 'Hash Table'], status: 'solved', nextRevisionDate: '2026-10-16' } // Due DSA question
  ];

  // In DSA Only mode, Two Sum must be selected, NOT the more overdue SQL questions!
  const selection = selectNextQuestion(mixedLibrary, [], {
    settings: { questionSource: 'dsa_only' },
    todayStr: '2026-10-17'
  });

  assert.ok(selection.question !== null);
  assert.equal(selection.question.id, '1');
  assert.equal(selection.question.title, 'Two Sum');

  // getDueQuestions should also only count the DSA question (1 due, not 4!)
  const due = getDueQuestions(mixedLibrary, '2026-10-17', { questionSource: 'dsa_only' });
  assert.equal(due.length, 1);
  assert.equal(due[0].id, '1');
});

test('Scheduler - Helpful reason when library has no eligible questions', () => {
  const sqlOnlyLibrary = [
    { id: '175', title: 'Combine Two Tables', topics: ['Database'], status: 'solved' },
    { id: '176', title: 'Second Highest Salary', topics: ['Database'], status: 'solved' }
  ];

  // In DSA Only mode, no eligible questions exist
  const selection = selectNextQuestion(sqlOnlyLibrary, [], {
    settings: { questionSource: 'dsa_only' },
    todayStr: '2026-10-17'
  });

  assert.equal(selection.question, null);
  assert.equal(selection.reason, 'no_eligible_questions');
});

test('Storage - updateQuestionInclusion toggles and persists', async () => {
  await saveLibrary([
    { id: '1', title: 'Two Sum', topics: ['Array'], status: 'solved' },
    { id: '2', title: 'Add Two Numbers', topics: ['Linked List'], status: 'solved' }
  ]);

  // Manually exclude #1
  await updateQuestionInclusion('1', 'excluded');
  let lib = await getLibrary();
  let q1 = lib.find(q => q.id === '1');
  assert.equal(q1.manualInclusion, 'excluded');
  assert.equal(q1.isExcluded, true);
  assert.equal(isQuestionEligible(q1, { questionSource: 'dsa_only' }), false);

  // Manually include #1
  await updateQuestionInclusion('1', 'included');
  lib = await getLibrary();
  q1 = lib.find(q => q.id === '1');
  assert.equal(q1.manualInclusion, 'included');
  assert.equal(q1.isExcluded, false);
  assert.equal(isQuestionEligible(q1, { questionSource: 'dsa_only' }), true);

  // Reset to auto
  await updateQuestionInclusion('1', 'auto');
  lib = await getLibrary();
  q1 = lib.find(q => q.id === '1');
  assert.equal(q1.manualInclusion, undefined);
  assert.equal(q1.isExcluded, undefined);
  assert.equal(isQuestionEligible(q1, { questionSource: 'dsa_only' }), true);
});
