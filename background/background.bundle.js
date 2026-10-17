// src/services/dateUtils.js
var DateProviderClass = class {
  constructor() {
    this._simulatedDate = null;
  }
  /**
   * Set a simulated date for unit testing or time-travel demos.
   * @param {Date|string|null} date 
   */
  setSimulatedDate(date) {
    if (!date) {
      this._simulatedDate = null;
      return;
    }
    this._simulatedDate = typeof date === "string" ? new Date(date) : new Date(date.getTime());
  }
  /**
   * Reset simulation back to real wall-clock time.
   */
  reset() {
    this._simulatedDate = null;
  }
  /**
   * Get current date (real or simulated)
   * @returns {Date}
   */
  now() {
    return this._simulatedDate ? new Date(this._simulatedDate.getTime()) : /* @__PURE__ */ new Date();
  }
};
var DateProvider = new DateProviderClass();
function formatLocalDate(d = DateProvider.now()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function getTodayDateString() {
  return formatLocalDate(DateProvider.now());
}
function isMidnightCrossed(lastActiveDateStr, currentTodayStr = getTodayDateString()) {
  if (!lastActiveDateStr) return true;
  return currentTodayStr > lastActiveDateStr;
}

// src/data/starterQuestions.js
var STARTER_QUESTIONS = [
  {
    id: "1",
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "20",
    title: "Valid Parentheses",
    url: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    topics: ["String", "Stack"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "21",
    title: "Merge Two Sorted Lists",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    topics: ["Linked List", "Recursion"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "121",
    title: "Best Time to Buy and Sell Stock",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: "Easy",
    topics: ["Array", "Dynamic Programming"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "125",
    title: "Valid Palindrome",
    url: "https://leetcode.com/problems/valid-palindrome/",
    difficulty: "Easy",
    topics: ["Two Pointers", "String"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "226",
    title: "Invert Binary Tree",
    url: "https://leetcode.com/problems/invert-binary-tree/",
    difficulty: "Easy",
    topics: ["Tree", "DFS", "BFS"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "242",
    title: "Valid Anagram",
    url: "https://leetcode.com/problems/valid-anagram/",
    difficulty: "Easy",
    topics: ["Hash Table", "String", "Sorting"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "704",
    title: "Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    topics: ["Array", "Binary Search"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    topics: ["Hash Table", "Sliding Window", "String"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "11",
    title: "Container With Most Water",
    url: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Greedy"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "15",
    title: "3Sum",
    url: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Sorting"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "33",
    title: "Search in Rotated Sorted Array",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    topics: ["Array", "Binary Search"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "49",
    title: "Group Anagrams",
    url: "https://leetcode.com/problems/group-anagrams/",
    difficulty: "Medium",
    topics: ["Array", "Hash Table", "String", "Sorting"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "53",
    title: "Maximum Subarray",
    url: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
    topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "128",
    title: "Longest Consecutive Sequence",
    url: "https://leetcode.com/problems/longest-consecutive-sequence/",
    difficulty: "Medium",
    topics: ["Array", "Hash Table", "Union Find"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "133",
    title: "Clone Graph",
    url: "https://leetcode.com/problems/clone-graph/",
    difficulty: "Medium",
    topics: ["Hash Table", "DFS", "BFS", "Graph"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "139",
    title: "Word Break",
    url: "https://leetcode.com/problems/word-break/",
    difficulty: "Medium",
    topics: ["Hash Table", "String", "Dynamic Programming", "Trie"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "141",
    title: "Linked List Cycle",
    url: "https://leetcode.com/problems/linked-list-cycle/",
    difficulty: "Easy",
    topics: ["Hash Table", "Linked List", "Two Pointers"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "143",
    title: "Reorder List",
    url: "https://leetcode.com/problems/reorder-list/",
    difficulty: "Medium",
    topics: ["Linked List", "Two Pointers", "Stack", "Recursion"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "200",
    title: "Number of Islands",
    url: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    topics: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "206",
    title: "Reverse Linked List",
    url: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: "Easy",
    topics: ["Linked List", "Recursion"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "207",
    title: "Course Schedule",
    url: "https://leetcode.com/problems/course-schedule/",
    difficulty: "Medium",
    topics: ["DFS", "BFS", "Graph", "Topological Sort"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "208",
    title: "Implement Trie (Prefix Tree)",
    url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    difficulty: "Medium",
    topics: ["Hash Table", "String", "Design", "Trie"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "238",
    title: "Product of Array Except Self",
    url: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: "Medium",
    topics: ["Array", "Prefix Sum"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "300",
    title: "Longest Increasing Subsequence",
    url: "https://leetcode.com/problems/longest-increasing-subsequence/",
    difficulty: "Medium",
    topics: ["Array", "Binary Search", "Dynamic Programming"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "322",
    title: "Coin Change",
    url: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming", "BFS"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "347",
    title: "Top K Frequent Elements",
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
    difficulty: "Medium",
    topics: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap", "Bucket Sort"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "42",
    title: "Trapping Rain Water",
    url: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "295",
    title: "Find Median from Data Stream",
    url: "https://leetcode.com/problems/find-median-from-data-stream/",
    difficulty: "Hard",
    topics: ["Two Pointers", "Design", "Sorting", "Heap", "Data Stream"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  },
  {
    id: "297",
    title: "Serialize and Deserialize Binary Tree",
    url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    difficulty: "Hard",
    topics: ["String", "Tree", "DFS", "BFS", "Design", "Binary Tree"],
    status: "solved",
    lastRevisionDate: null,
    revisionCount: 0,
    previousFeedback: null,
    nextRevisionDate: null,
    history: []
  }
];

// src/services/scheduler.js
var DEFAULT_SETTINGS = {
  dailyTarget: 3,
  intervals: {
    easy: 15,
    hint: 7,
    hard: 4
  },
  autoOpenProblemTab: true,
  showInvitation: true
};

// src/storage/storage.js
var STORAGE_KEYS = {
  LIBRARY: "dsa_library",
  PROGRESS: "dsa_daily_progress",
  SETTINGS: "dsa_settings",
  INVITATION: "dsa_invitation",
  HISTORY: "dsa_history",
  SYNC_META: "dsa_sync_meta"
};
var memoryStore = /* @__PURE__ */ new Map();
async function storageGet(key) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result ? result[key] : void 0);
      });
    });
  }
  if (typeof localStorage !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : void 0;
    } catch (e) {
      return memoryStore.get(key);
    }
  }
  return memoryStore.get(key);
}
async function storageSet(key, value) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    });
  }
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      memoryStore.set(key, value);
    }
    return;
  }
  memoryStore.set(key, value);
}
async function getLibrary() {
  const library = await storageGet(STORAGE_KEYS.LIBRARY);
  if (!Array.isArray(library) || library.length === 0) {
    const initial = STARTER_QUESTIONS.map((q) => ({ ...q }));
    await saveLibrary(initial);
    return initial;
  }
  return library;
}
async function saveLibrary(library) {
  await storageSet(STORAGE_KEYS.LIBRARY, library);
}
async function getSettings() {
  const settings = await storageGet(STORAGE_KEYS.SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...settings || {},
    intervals: {
      ...DEFAULT_SETTINGS.intervals,
      ...settings && settings.intervals || {}
    }
  };
}
async function getDailyProgress() {
  const today = getTodayDateString();
  const settings = await getSettings();
  const rawProgress = await storageGet(STORAGE_KEYS.PROGRESS);
  const fallback = {
    date: today,
    completedCount: 0,
    completedQuestionIds: [],
    target: settings.dailyTarget || 3
  };
  if (!rawProgress || typeof rawProgress !== "object") {
    await storageSet(STORAGE_KEYS.PROGRESS, fallback);
    return fallback;
  }
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
    completedCount: typeof rawProgress.completedCount === "number" ? rawProgress.completedCount : 0,
    completedQuestionIds: Array.isArray(rawProgress.completedQuestionIds) ? rawProgress.completedQuestionIds : [],
    target: settings.dailyTarget || 3
  };
}

// background/background.js
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("[DSA Revision Buddy] Installed:", details.reason);
  await getLibrary();
  await getDailyProgress();
  chrome.alarms.create("dsa-midnight-checker", {
    periodInMinutes: 30
  });
});
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "dsa-midnight-checker") {
    await getDailyProgress();
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ status: "PONG", timestamp: Date.now() });
    return true;
  }
});
//# sourceMappingURL=background.bundle.js.map
