/**
 * DSA Revision Buddy - Manifest V3 Background Service Worker
 * Manages periodic alarms, installation lifecycle, and storage maintenance.
 */

import { getDailyProgress, getLibrary } from '../src/storage/storage.js';

// Setup alarms on installation
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[DSA Revision Buddy] Installed:', details.reason);
  
  // Initialize storage
  await getLibrary();
  await getDailyProgress();

  // Create alarm to check midnight rollover periodically
  chrome.alarms.create('dsa-midnight-checker', {
    periodInMinutes: 30
  });
});

// Periodic alarm listener
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'dsa-midnight-checker') {
    // getDailyProgress automatically checks and resets on midnight rollover
    await getDailyProgress();
  }
});

// Listen for messages from content scripts or popup if needed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PING') {
    sendResponse({ status: 'PONG', timestamp: Date.now() });
    return true;
  }
});
