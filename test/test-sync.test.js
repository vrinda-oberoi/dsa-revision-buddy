import test from 'node:test';
import assert from 'node:assert/strict';

import {
  checkLeetCodeUserStatus,
  fetchSolvedQuestionsBatch,
  syncLeetCodeSolvedQuestions
} from '../src/services/leetcodeSync.js';

test('LeetCode sync - checks user signed-in status', async () => {
  // Mock signed-in response
  const mockFetchLoggedIn = async () => ({
    ok: true,
    json: async () => ({
      data: {
        userStatus: {
          isSignedIn: true,
          username: 'neetcode_fan',
          realName: 'DSA Master'
        }
      }
    })
  });

  const res1 = await checkLeetCodeUserStatus({ fetchFn: mockFetchLoggedIn });
  assert.equal(res1.isSignedIn, true);
  assert.equal(res1.username, 'neetcode_fan');
  assert.equal(res1.error, null);

  // Mock logged-out response
  const mockFetchLoggedOut = async () => ({
    ok: true,
    json: async () => ({
      data: {
        userStatus: {
          isSignedIn: false,
          username: '',
          realName: ''
        }
      }
    })
  });

  const res2 = await checkLeetCodeUserStatus({ fetchFn: mockFetchLoggedOut });
  assert.equal(res2.isSignedIn, false);
  assert.equal(res2.error, null);

  // Mock network failure
  const mockFetchError = async () => {
    throw new Error('Connection refused');
  };
  const res3 = await checkLeetCodeUserStatus({ fetchFn: mockFetchError });
  assert.equal(res3.isSignedIn, false);
  assert.ok(res3.error.includes('Connection refused'));
});

test('LeetCode sync - fetches solved questions batch with GraphQL mapping', async () => {
  const mockFetchBatch = async () => ({
    ok: true,
    json: async () => ({
      data: {
        problemsetQuestionList: {
          total: 2,
          questions: [
            {
              questionFrontendId: '1',
              title: 'Two Sum',
              titleSlug: 'two-sum',
              difficulty: 'Easy',
              topicTags: [{ name: 'Array' }, { name: 'Hash Table' }],
              status: 'AC'
            },
            {
              questionFrontendId: '206',
              title: 'Reverse Linked List',
              titleSlug: 'reverse-linked-list',
              difficulty: 'Easy',
              topicTags: [{ name: 'Linked List' }],
              status: 'AC'
            }
          ]
        }
      }
    })
  });

  const batch = await fetchSolvedQuestionsBatch(0, 50, { fetchFn: mockFetchBatch });
  assert.equal(batch.error, null);
  assert.equal(batch.questions.length, 2);
  assert.equal(batch.questions[0].id, '1');
  assert.equal(batch.questions[0].url, 'https://leetcode.com/problems/two-sum/');
  assert.deepEqual(batch.questions[0].topics, ['Array', 'Hash Table']);
  assert.equal(batch.questions[1].id, '206');
});

test('LeetCode sync - full sync workflow and logged out handling', async () => {
  // Test logged out path
  const mockFetchLoggedOut = async () => ({
    ok: true,
    json: async () => ({
      data: {
        userStatus: { isSignedIn: false }
      }
    })
  });

  const syncResult1 = await syncLeetCodeSolvedQuestions({ fetchFn: mockFetchLoggedOut });
  assert.equal(syncResult1.success, false);
  assert.ok(syncResult1.message.includes('not signed in'));

  // Test logged in path
  const mockFetchFull = async (url, options) => {
    const body = JSON.parse(options.body);
    if (body.query.includes('userStatus')) {
      return {
        ok: true,
        json: async () => ({
          data: {
            userStatus: { isSignedIn: true, username: 'algo_pro' }
          }
        })
      };
    }
    return {
      ok: true,
      json: async () => ({
        data: {
          problemsetQuestionList: {
            total: 1,
            questions: [
              {
                questionFrontendId: '704',
                title: 'Binary Search',
                titleSlug: 'binary-search',
                difficulty: 'Easy',
                topicTags: [{ name: 'Binary Search' }],
                status: 'AC'
              }
            ]
          }
        }
      })
    };
  };

  const syncResult2 = await syncLeetCodeSolvedQuestions({ fetchFn: mockFetchFull });
  assert.equal(syncResult2.success, true);
  assert.equal(syncResult2.questions.length, 1);
  assert.equal(syncResult2.username, 'algo_pro');
  assert.equal(syncResult2.questions[0].id, '704');
});
