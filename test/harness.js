/**
 * Interactive Simulation and Test Script for harness.html
 */

import { DateProvider, getTodayDateString, addDays } from '../src/services/dateUtils.js';
import { getDailyProgress, saveDailyProgress, saveLibrary } from '../src/storage/storage.js';
import { STARTER_QUESTIONS } from '../data/starterQuestions.js';

let simulatedDaysAhead = 0;

function updateStatusDisplay() {
  const statusEl = document.getElementById('sim-status-display');
  if (statusEl) {
    statusEl.textContent = `Date: ${getTodayDateString()} (${simulatedDaysAhead === 0 ? 'Today' : `+${simulatedDaysAhead} day(s)`})`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateStatusDisplay();

  // 1. Midnight Reset Simulation
  const midnightBtn = document.getElementById('sim-btn-midnight');
  if (midnightBtn) {
    midnightBtn.addEventListener('click', async () => {
      simulatedDaysAhead++;
      const nextDate = addDays(getTodayDateString(), 1);
      DateProvider.setSimulatedDate(new Date(`${nextDate}T00:01:00`));
      updateStatusDisplay();

      // Trigger daily progress check which resets counter
      const progress = await getDailyProgress();
      
      // Notify user on screen
      alert(`Midnight crossed! Date rolled over to ${getTodayDateString()}.\nDaily progress counter reset to ${progress.completedCount}/${progress.target} completed.`);
      
      // Reload page to reflect new day state
      location.reload();
    });
  }

  // 2. Open Panel
  const openPanelBtn = document.getElementById('sim-btn-open-panel');
  if (openPanelBtn) {
    openPanelBtn.addEventListener('click', () => {
      const host = document.getElementById('dsa-revision-buddy-host');
      const trigger = host?.shadowRoot?.querySelector('#dsa-floating-trigger');
      if (trigger) {
        trigger.click();
      } else {
        alert('Could not find floating button in shadow DOM.');
      }
    });
  }

  // 3. Trigger Daily Invitation
  const showInvBtn = document.getElementById('sim-btn-show-invitation');
  if (showInvBtn) {
    showInvBtn.addEventListener('click', async () => {
      localStorage.removeItem('dsa_invitation');
      location.reload();
    });
  }

  // 4. Clear and Reset Demo Data
  const resetBtn = document.getElementById('sim-btn-reset-storage');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      localStorage.clear();
      DateProvider.reset();
      await saveLibrary(STARTER_QUESTIONS.map(q => ({ ...q })));
      alert('Cleared all storage and restored 30+ starter questions!');
      location.reload();
    });
  }
});
