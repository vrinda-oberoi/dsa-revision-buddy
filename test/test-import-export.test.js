import test from 'node:test';
import assert from 'node:assert/strict';

import {
  importFromCSV,
  importFromJSON,
  mergeLibrary,
  exportToCSV,
  exportToJSON
} from '../src/services/importExport.js';

test('CSV Import parsing, quotes, and normalization', () => {
  const csvContent = `Problem ID,Title,URL,Difficulty,Topics,Status
1,"Two Sum",https://leetcode.com/problems/two-sum/,Easy,"Array, Hash Table",solved
206,"Reverse Linked List",https://leetcode.com/problems/reverse-linked-list/,EASY,"Linked List; Recursion",solved
42,"Trapping Rain Water",https://leetcode.com/problems/trapping-rain-water/,Hard,"Array, Two Pointers, Stack",solved
3,"Longest Substring Without Repeating Characters",https://leetcode.com/problems/longest-substring-without-repeating-characters/,med,"Hash Table, Sliding Window",attempted`;

  const { questions, errors } = importFromCSV(csvContent);
  assert.equal(errors.length, 0);
  assert.equal(questions.length, 4);

  const q1 = questions[0];
  assert.equal(q1.id, '1');
  assert.equal(q1.title, 'Two Sum');
  assert.equal(q1.difficulty, 'Easy');
  assert.deepEqual(q1.topics, ['Array', 'Hash Table']);
  assert.equal(q1.status, 'solved');

  const q206 = questions[1];
  assert.equal(q206.id, '206');
  assert.equal(q206.difficulty, 'Easy'); // Normalized from EASY
  assert.deepEqual(q206.topics, ['Linked List', 'Recursion']);

  const q3 = questions[3];
  assert.equal(q3.id, '3');
  assert.equal(q3.difficulty, 'Medium'); // Normalized from med
  assert.equal(q3.status, 'attempted');
});

test('JSON Import parsing for arrays and backup payload', () => {
  const rawArrayJSON = JSON.stringify([
    {
      id: '15',
      title: '3Sum',
      url: 'https://leetcode.com/problems/3sum/',
      difficulty: 'Medium',
      topics: ['Array', 'Two Pointers'],
      status: 'solved'
    }
  ]);

  const result1 = importFromJSON(rawArrayJSON);
  assert.equal(result1.errors.length, 0);
  assert.equal(result1.questions.length, 1);
  assert.equal(result1.questions[0].id, '15');

  const backupPayloadJSON = JSON.stringify({
    version: '1.0.0',
    exportDate: '2026-10-17T00:00:00.000Z',
    questions: [
      {
        id: '200',
        title: 'Number of Islands',
        difficulty: 'Medium',
        nextRevisionDate: '2026-10-25',
        revisionCount: 2
      }
    ]
  });

  const result2 = importFromJSON(backupPayloadJSON);
  assert.equal(result2.errors.length, 0);
  assert.equal(result2.questions.length, 1);
  assert.equal(result2.questions[0].id, '200');
  assert.equal(result2.questions[0].nextRevisionDate, '2026-10-25');
  assert.equal(result2.questions[0].revisionCount, 2);
});

test('Library deduplication and merge preservation', () => {
  const existingLibrary = [
    {
      id: '1',
      title: 'Two Sum',
      url: 'https://leetcode.com/problems/two-sum/',
      difficulty: 'Easy',
      topics: ['Array'],
      status: 'solved',
      revisionCount: 3,
      lastRevisionDate: '2026-10-10',
      nextRevisionDate: '2026-10-25',
      history: [{ date: '2026-10-10', feedback: 'easy' }]
    }
  ];

  const incomingQuestions = [
    // Duplicate of #1, with updated topics
    {
      id: '1',
      title: 'Two Sum (LeetCode)',
      url: 'https://leetcode.com/problems/two-sum/',
      difficulty: 'Easy',
      topics: ['Array', 'Hash Table'],
      status: 'solved',
      revisionCount: 0,
      nextRevisionDate: null
    },
    // Brand new question #2
    {
      id: '2',
      title: 'Add Two Numbers',
      url: 'https://leetcode.com/problems/add-two-numbers/',
      difficulty: 'Medium',
      topics: ['Linked List'],
      status: 'solved'
    }
  ];

  const { mergedLibrary, addedCount, updatedCount } = mergeLibrary(existingLibrary, incomingQuestions);

  assert.equal(addedCount, 1);
  assert.equal(updatedCount, 1);
  assert.equal(mergedLibrary.length, 2);

  const mergedQ1 = mergedLibrary.find(q => q.id === '1');
  assert.ok(mergedQ1);
  assert.equal(mergedQ1.title, 'Two Sum (LeetCode)');
  assert.deepEqual(mergedQ1.topics, ['Array', 'Hash Table']);
  // Crucial: Must preserve user's previous revision history and due date!
  assert.equal(mergedQ1.revisionCount, 3);
  assert.equal(mergedQ1.lastRevisionDate, '2026-10-10');
  assert.equal(mergedQ1.nextRevisionDate, '2026-10-25');
  assert.equal(mergedQ1.history.length, 1);
});

test('CSV and JSON export generation', () => {
  const library = [
    {
      id: '1',
      title: 'Two Sum',
      url: 'https://leetcode.com/problems/two-sum/',
      difficulty: 'Easy',
      topics: ['Array', 'Hash Table'],
      status: 'solved',
      revisionCount: 1,
      lastRevisionDate: '2026-10-17',
      nextRevisionDate: '2026-11-01'
    }
  ];

  const csvOutput = exportToCSV(library);
  assert.ok(csvOutput.includes('Problem ID,Title,URL'));
  assert.ok(csvOutput.includes('"1","Two Sum"'));
  assert.ok(csvOutput.includes('"2026-11-01"'));

  const jsonOutput = exportToJSON(library);
  const parsed = JSON.parse(jsonOutput);
  assert.equal(parsed.totalQuestions, 1);
  assert.equal(parsed.questions[0].id, '1');
});
