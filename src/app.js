/**
 * Core RevisionApp Controller
 * Coordinates UI rendering, state management, storage, and user actions.
 */

import { UI_STYLES } from './ui/styles.js';
import {
  getFloatingButtonHTML,
  getInvitationCardHTML,
  getModalHeaderHTML,
  getRevisionViewHTML,
  getLibraryViewHTML,
  getManageQuestionsViewHTML,
  getScheduleViewHTML,
  getHistoryViewHTML,
  getSettingsViewHTML,
  triggerConfetti
} from './ui/components.js';

import {
  getLibrary,
  saveLibrary,
  getSettings,
  saveSettings,
  getDailyProgress,
  markQuestionCompleted,
  getInvitationState,
  dismissInvitationToday,
  shouldShowInvitationToday,
  getSyncMeta,
  updateSyncMeta,
  getHistory,
  updateQuestionInclusion,
  resetDailyProgressForTesting
} from './storage/storage.js';

import { selectNextQuestion, getDueQuestions } from './services/scheduler.js';
import { CANONICAL_DSA_TOPICS } from './services/dsaClassifier.js';
import { syncLeetCodeSolvedQuestions } from './services/leetcodeSync.js';
import {
  importFromCSV,
  importFromJSON,
  mergeLibrary,
  exportToCSV,
  exportToJSON,
  getSampleCSVTemplate
} from './services/importExport.js';

export class RevisionApp {
  /**
   * @param {HTMLElement|ShadowRoot} rootElement 
   * @param {object} [options]
   * @param {boolean} [options.isPopup=false] 
   */
  constructor(rootElement, options = {}) {
    this.root = rootElement;
    this.isPopup = Boolean(options.isPopup);
    
    // Application state
    this.activeTab = 'revision';
    this.library = [];
    this.settings = {};
    this.progress = { completedCount: 0, target: 3, completedQuestionIds: [] };
    this.syncMeta = {};
    this.history = [];
    this.currentQuestion = null;
    this.selectionReason = null;
    this.feedbackStep = false;
    this.celebration = false;
    this.customHardDays = 4;
    this.libraryFilter = 'all';
    this.librarySearch = '';
    this.manageFilter = 'all';
    this.manageSearch = '';
    this.toast = null;
    this.isModalOpen = this.isPopup; // Popups are always open
  }

  /**
   * Initialize application, inject styles and mount UI
   */
  async init() {
    this.injectStyles();
    await this.refreshState();

    if (this.isPopup) {
      this.renderPopupMode();
    } else {
      this.renderInjectedMode();
      this.checkAndShowInvitation();
    }
  }

  /**
   * Inject stylesheet into container or Shadow DOM
   */
  injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = UI_STYLES;
    this.root.appendChild(styleEl);
  }

  /**
   * Refresh all data from storage
   */
  async refreshState() {
    this.library = await getLibrary();
    this.settings = await getSettings();
    this.progress = await getDailyProgress();
    this.syncMeta = await getSyncMeta();
    this.history = await getHistory();
  }

  /**
   * In Content Script mode: Render floating button and create modal container
   */
  renderInjectedMode() {
    // 1. Floating Trigger Button Container
    let triggerContainer = this.root.querySelector('#dsa-trigger-wrap');
    if (!triggerContainer) {
      triggerContainer = document.createElement('div');
      triggerContainer.id = 'dsa-trigger-wrap';
      this.root.appendChild(triggerContainer);
    }

    const dueCount = getDueQuestions(this.library, undefined, this.settings).length;
    const isCompleted = this.progress.completedCount >= this.progress.target;
    triggerContainer.innerHTML = getFloatingButtonHTML(dueCount, isCompleted);

    const btn = triggerContainer.querySelector('#dsa-floating-trigger');
    if (btn) {
      btn.addEventListener('click', () => this.toggleModal());
    }

    // 2. Modal Wrapper
    let modalWrap = this.root.querySelector('#dsa-modal-wrap');
    if (!modalWrap) {
      modalWrap = document.createElement('div');
      modalWrap.id = 'dsa-modal-wrap';
      this.root.appendChild(modalWrap);
    }
  }

  /**
   * Check and show first-visit daily invitation toast
   */
  async checkAndShowInvitation() {
    const shouldShow = await shouldShowInvitationToday();
    if (!shouldShow) return;

    let toastWrap = this.root.querySelector('#dsa-invitation-wrap');
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.id = 'dsa-invitation-wrap';
      this.root.appendChild(toastWrap);
    }

    const dueCount = getDueQuestions(this.library, undefined, this.settings).length;
    toastWrap.innerHTML = getInvitationCardHTML(dueCount, this.progress.target);

    const startBtn = toastWrap.querySelector('#dsa-invitation-start');
    if (startBtn) {
      startBtn.addEventListener('click', async () => {
        await dismissInvitationToday();
        toastWrap.innerHTML = '';
        this.openModal();
        this.startRevisionSession();
      });
    }

    const laterBtn = toastWrap.querySelector('#dsa-invitation-later');
    if (laterBtn) {
      laterBtn.addEventListener('click', async () => {
        await dismissInvitationToday();
        toastWrap.innerHTML = '';
      });
    }
  }

  /**
   * Render in extension Popup mode (full panel view without floating button)
   */
  renderPopupMode() {
    let panelWrap = this.root.querySelector('#dsa-panel-wrap');
    if (!panelWrap) {
      panelWrap = document.createElement('div');
      panelWrap.id = 'dsa-panel-wrap';
      panelWrap.className = 'dsa-root';
      panelWrap.style.width = '100%';
      panelWrap.style.minWidth = '420px';
      this.root.appendChild(panelWrap);
    }
    this.renderModalContent(panelWrap);
  }

  /**
   * Toggle modal open/close in content script
   */
  toggleModal() {
    if (this.isModalOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  /**
   * Open the revision modal
   */
  openModal(tab = 'revision') {
    this.isModalOpen = true;
    this.activeTab = tab;
    const modalWrap = this.root.querySelector('#dsa-modal-wrap');
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="dsa-modal-backdrop" id="dsa-modal-backdrop">
        <div class="dsa-modal-panel dsa-root" id="dsa-modal-panel"></div>
      </div>
    `;

    const backdrop = modalWrap.querySelector('#dsa-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeModal();
      });
    }

    const panel = modalWrap.querySelector('#dsa-modal-panel');
    this.renderModalContent(panel);
  }

  /**
   * Close the revision modal
   */
  closeModal() {
    this.isModalOpen = false;
    const modalWrap = this.root.querySelector('#dsa-modal-wrap');
    if (modalWrap) modalWrap.innerHTML = '';
    // Refresh floating button badge state
    if (!this.isPopup) {
      this.renderInjectedMode();
    }
  }

  /**
   * Render the contents of the modal / popup panel
   * @param {HTMLElement} panel 
   */
  renderModalContent(panel = this.root.querySelector('#dsa-modal-panel') || this.root.querySelector('#dsa-panel-wrap')) {
    if (!panel) return;

    const dueCount = getDueQuestions(this.library, undefined, this.settings).length;

    let bodyHTML = '';
    if (this.activeTab === 'revision') {
      bodyHTML = getRevisionViewHTML({
        currentQuestion: this.currentQuestion,
        selectionReason: this.selectionReason,
        progress: this.progress,
        feedbackStep: this.feedbackStep,
        celebration: this.celebration,
        customHardDays: this.customHardDays,
        settings: this.settings,
        dueCount
      });
    } else if (this.activeTab === 'library') {
      bodyHTML = getLibraryViewHTML(this.library, this.libraryFilter, this.librarySearch);
    } else if (this.activeTab === 'manage') {
      bodyHTML = getManageQuestionsViewHTML(this.library, this.manageFilter, this.manageSearch, this.settings);
    } else if (this.activeTab === 'schedule') {
      bodyHTML = getScheduleViewHTML(this.library);
    } else if (this.activeTab === 'history') {
      bodyHTML = getHistoryViewHTML(this.history);
    } else if (this.activeTab === 'settings') {
      bodyHTML = getSettingsViewHTML(this.settings, this.syncMeta, this.toast);
    }

    panel.innerHTML = `
      ${getModalHeaderHTML(this.activeTab)}
      <div class="dsa-modal-body" id="dsa-modal-body">
        ${bodyHTML}
      </div>
    `;

    this.attachEventListeners(panel);

    // If celebration active, trigger canvas confetti!
    if (this.celebration || (this.progress.completedCount >= this.progress.target && !this.currentQuestion && !this.feedbackStep)) {
      const canvas = panel.querySelector('#dsa-confetti-canvas');
      if (canvas) {
        setTimeout(() => triggerConfetti(canvas), 50);
      }
    }
  }

  /**
   * Attach all interactive click and input listeners
   * @param {HTMLElement} panel 
   */
  attachEventListeners(panel) {
    // 1. Close button
    const closeBtn = panel.querySelector('#dsa-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.isPopup && typeof window !== 'undefined' && window.close) {
          window.close();
        } else {
          this.closeModal();
        }
      });
    }

    // 2. Navigation Tabs
    const tabBtns = panel.querySelectorAll('.dsa-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        this.renderModalContent(panel);
      });
    });

    // 3. Start Session button
    const startSessionBtn = panel.querySelector('#dsa-btn-start-session');
    if (startSessionBtn) {
      startSessionBtn.addEventListener('click', () => this.startRevisionSession());
    }

    // 4. Mark as Done button
    const markDoneBtn = panel.querySelector('#dsa-btn-mark-done');
    if (markDoneBtn) {
      markDoneBtn.addEventListener('click', () => {
        this.feedbackStep = true;
        this.renderModalContent(panel);
      });
    }

    // 5. Feedback buttons
    const feedbackBtns = panel.querySelectorAll('.dsa-feedback-btn');
    feedbackBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const feedback = btn.getAttribute('data-feedback');
        await this.handleFeedbackSubmit(feedback);
      });
    });

    // 6. Hard days switcher (3 or 4 days)
    const hardDayPills = panel.querySelectorAll('[data-set-hard-days]');
    hardDayPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        this.customHardDays = parseInt(pill.getAttribute('data-set-hard-days'), 10);
        this.renderModalContent(panel);
      });
    });

    // 7. Extra Practice button
    const extraPracticeBtn = panel.querySelector('#dsa-btn-extra-practice');
    if (extraPracticeBtn) {
      extraPracticeBtn.addEventListener('click', () => {
        this.celebration = false;
        this.startRevisionSession(true);
      });
    }

    // 7b. Jump buttons from No Eligible Questions screen
    const jumpManageBtn = panel.querySelector('#dsa-btn-jump-manage');
    if (jumpManageBtn) {
      jumpManageBtn.addEventListener('click', () => {
        this.activeTab = 'manage';
        this.renderModalContent(panel);
      });
    }

    const jumpSettingsBtn = panel.querySelector('#dsa-btn-jump-settings');
    if (jumpSettingsBtn) {
      jumpSettingsBtn.addEventListener('click', () => {
        this.activeTab = 'settings';
        this.renderModalContent(panel);
      });
    }

    // 7c. Manage Questions Search & Filters
    const manageSearchInput = panel.querySelector('#dsa-manage-search');
    if (manageSearchInput) {
      manageSearchInput.addEventListener('input', (e) => {
        this.manageSearch = e.target.value;
        this.renderModalContent(panel);
        const newSearch = panel.querySelector('#dsa-manage-search');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
        }
      });
    }

    const manageFilterBtns = panel.querySelectorAll('[data-manage-filter]');
    manageFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.manageFilter = btn.getAttribute('data-manage-filter');
        this.renderModalContent(panel);
      });
    });

    // 7d. Manage Questions Include/Exclude Toggles
    const includeToggles = panel.querySelectorAll('.dsa-toggle-include');
    includeToggles.forEach(toggle => {
      toggle.addEventListener('change', async () => {
        const qId = toggle.getAttribute('data-question-id');
        const isChecked = toggle.checked;
        await updateQuestionInclusion(qId, isChecked ? 'included' : 'excluded');
        await this.refreshState();
        this.showToast(`Question #${qId} ${isChecked ? 'included in' : 'excluded from'} revision.`, 'info');
        this.renderModalContent(panel);
        if (!this.isPopup) this.renderInjectedMode();
      });
    });

    // 8. Library Search & Filters
    const searchInput = panel.querySelector('#dsa-library-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.librarySearch = e.target.value;
        const listContainer = panel.querySelector('.dsa-question-list');
        if (listContainer) {
          // Re-render just the library view
          this.renderModalContent(panel);
          const newSearch = panel.querySelector('#dsa-library-search');
          if (newSearch) {
            newSearch.focus();
            newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
          }
        }
      });
    }

    const filterBtns = panel.querySelectorAll('.dsa-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.libraryFilter = btn.getAttribute('data-filter');
        this.renderModalContent(panel);
      });
    });

    // 9. Manual Question Revise from Library
    const reviseBtns = panel.querySelectorAll('[data-action-revise-id]');
    reviseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-action-revise-id');
        this.reviseSpecificQuestion(qId);
      });
    });

    // 10. Sync LeetCode button
    const syncBtn = panel.querySelector('#dsa-btn-sync-leetcode');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => this.handleSyncLeetCode(syncBtn));
    }

    // 11. File Import
    const triggerImportBtn = panel.querySelector('#dsa-btn-trigger-import');
    const fileInput = panel.querySelector('#dsa-file-import');
    if (triggerImportBtn && fileInput) {
      triggerImportBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleFileImport(e));
    }

    // 12. Sample CSV Download
    const sampleCsvBtn = panel.querySelector('#dsa-btn-download-csv-sample');
    if (sampleCsvBtn) {
      sampleCsvBtn.addEventListener('click', () => this.downloadFile('sample-dsa-template.csv', getSampleCSVTemplate(), 'text/csv'));
    }

    // 13. CSV Export
    const exportCsvBtn = panel.querySelector('#dsa-btn-export-csv');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.downloadFile('dsa-revision-library.csv', exportToCSV(this.library), 'text/csv'));
    }

    // 14. JSON Export
    const exportJsonBtn = panel.querySelector('#dsa-btn-export-json');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => this.downloadFile('dsa-revision-backup.json', exportToJSON(this.library, { history: this.history, settings: this.settings }), 'application/json'));
    }

    // 14b. Revision Question Sources (DSA Only, All, Custom)
    const sourceRadios = panel.querySelectorAll('input[name="dsa-source-radio"]');
    sourceRadios.forEach(radio => {
      radio.addEventListener('change', async () => {
        if (radio.checked) {
          const newSource = radio.value;
          this.settings.questionSource = newSource;
          await saveSettings({ questionSource: newSource });
          await this.refreshState();
          const sourceLabels = {
            dsa_only: 'DSA Only',
            all: 'All Solved Questions',
            custom: 'Custom Topics'
          };
          this.showToast(`Revision source set to ${sourceLabels[newSource] || newSource}!`, 'success');
          this.renderModalContent(panel);
          if (!this.isPopup) this.renderInjectedMode();
        }
      });
    });

    const customTopicChecks = panel.querySelectorAll('.dsa-custom-topic-check');
    customTopicChecks.forEach(ch => {
      ch.addEventListener('change', async () => {
        const topic = ch.getAttribute('data-topic');
        let activeTopics = Array.isArray(this.settings.customTopics) ? [...this.settings.customTopics] : [...CANONICAL_DSA_TOPICS];
        if (ch.checked) {
          if (!activeTopics.includes(topic)) activeTopics.push(topic);
        } else {
          activeTopics = activeTopics.filter(t => t !== topic);
        }
        this.settings.customTopics = activeTopics;
        await saveSettings({ customTopics: activeTopics });
        await this.refreshState();
        this.renderModalContent(panel);
        if (!this.isPopup) this.renderInjectedMode();
      });
    });

    const selectAllTopicsBtn = panel.querySelector('#dsa-btn-select-all-topics');
    if (selectAllTopicsBtn) {
      selectAllTopicsBtn.addEventListener('click', async () => {
        this.settings.customTopics = [...CANONICAL_DSA_TOPICS];
        await saveSettings({ customTopics: this.settings.customTopics });
        await this.refreshState();
        this.renderModalContent(panel);
        if (!this.isPopup) this.renderInjectedMode();
      });
    }

    const deselectAllTopicsBtn = panel.querySelector('#dsa-btn-deselect-all-topics');
    if (deselectAllTopicsBtn) {
      deselectAllTopicsBtn.addEventListener('click', async () => {
        this.settings.customTopics = [];
        await saveSettings({ customTopics: [] });
        await this.refreshState();
        this.renderModalContent(panel);
        if (!this.isPopup) this.renderInjectedMode();
      });
    }

    // 15. Daily Target Selector
    const targetPills = panel.querySelectorAll('.dsa-target-pill');
    targetPills.forEach(pill => {
      pill.addEventListener('click', async () => {
        const targetVal = pill.getAttribute('data-target');
        if (targetVal === 'custom') {
          this.settings.dailyTarget = 5;
          await saveSettings({ dailyTarget: 5 });
        } else {
          const num = parseInt(targetVal, 10);
          this.settings.dailyTarget = num;
          await saveSettings({ dailyTarget: num });
          this.progress.target = num;
        }
        await this.refreshState();
        this.showToast('Daily target updated!', 'success');
        this.renderModalContent(panel);
      });
    });

    const customTargetInput = panel.querySelector('#dsa-custom-target-input');
    const saveCustomTargetBtn = panel.querySelector('#dsa-btn-save-custom-target');
    if (saveCustomTargetBtn && customTargetInput) {
      saveCustomTargetBtn.addEventListener('click', async () => {
        const val = parseInt(customTargetInput.value, 10);
        if (val && val > 0 && val <= 50) {
          this.settings.dailyTarget = val;
          await saveSettings({ dailyTarget: val });
          this.progress.target = val;
          await this.refreshState();
          this.showToast(`Custom target set to ${val} questions/day!`, 'success');
          this.renderModalContent(panel);
        }
      });
    }

    // 16. Spaced Repetition Interval Savers
    const saveIntervalsBtn = panel.querySelector('#dsa-btn-save-intervals');
    if (saveIntervalsBtn) {
      saveIntervalsBtn.addEventListener('click', async () => {
        const easyVal = parseInt(panel.querySelector('#dsa-interval-easy')?.value || 15, 10);
        const hintVal = parseInt(panel.querySelector('#dsa-interval-hint')?.value || 7, 10);
        const hardVal = parseInt(panel.querySelector('#dsa-interval-hard')?.value || 4, 10);

        await saveSettings({
          intervals: {
            easy: Math.max(1, easyVal),
            hint: Math.max(1, hintVal),
            hard: Math.max(1, hardVal)
          }
        });
        await this.refreshState();
        this.showToast('Spaced repetition intervals updated!', 'success');
        this.renderModalContent(panel);
      });
    }

    // 17. Reset Daily Progress (for testing)
    const resetDailyBtn = panel.querySelector('#dsa-btn-reset-daily');
    if (resetDailyBtn) {
      resetDailyBtn.addEventListener('click', async () => {
        await resetDailyProgressForTesting();
        this.currentQuestion = null;
        this.feedbackStep = false;
        this.celebration = false;
        await this.refreshState();
        this.showToast("Today's progress reset for testing!", 'info');
        this.renderModalContent(panel);
      });
    }
  }

  /**
   * Start a revision session
   * @param {boolean} [allowRepeats=false]
   */
  startRevisionSession(allowRepeats = false) {
    const selection = selectNextQuestion(
      this.library,
      this.progress.completedQuestionIds,
      { allowRepeatsToday: allowRepeats, settings: this.settings }
    );

    if (!selection.question) {
      if (selection.reason === 'all_completed_today') {
        this.celebration = true;
      } else if (selection.reason === 'no_eligible_questions') {
        this.selectionReason = 'no_eligible_questions';
        this.activeTab = 'revision';
      } else if (selection.reason === 'library_empty') {
        this.showToast('Your library is empty. Please sync or import questions.', 'error');
        this.activeTab = 'settings';
      }
      this.renderModalContent();
      return;
    }

    this.currentQuestion = selection.question;
    this.selectionReason = selection.reason;
    this.feedbackStep = false;
    this.celebration = false;
    this.activeTab = 'revision';
    this.renderModalContent();
  }

  /**
   * Revise a specific question directly from the library explorer
   * @param {string|number} questionId 
   */
  reviseSpecificQuestion(questionId) {
    const q = this.library.find(item => String(item.id) === String(questionId));
    if (!q) return;

    this.currentQuestion = q;
    this.selectionReason = 'manual_pick';
    this.feedbackStep = false;
    this.celebration = false;
    this.activeTab = 'revision';
    this.renderModalContent();
  }

  /**
   * Submit spaced repetition feedback after completing a question
   * @param {'easy'|'hint'|'hard'} feedback 
   */
  async handleFeedbackSubmit(feedback) {
    if (!this.currentQuestion) return;

    const result = await markQuestionCompleted(
      this.currentQuestion.id,
      feedback,
      { customIntervalDays: this.customHardDays }
    );

    await this.refreshState();
    this.currentQuestion = null;
    this.feedbackStep = false;

    // Check if target reached
    if (this.progress.completedCount >= this.progress.target) {
      this.celebration = true;
    } else {
      // Automatically pull the next question
      this.startRevisionSession();
      return;
    }

    this.renderModalContent();
    if (!this.isPopup) {
      this.renderInjectedMode();
    }
  }

  /**
   * Handle LeetCode Account Sync
   * @param {HTMLButtonElement} syncBtn 
   */
  async handleSyncLeetCode(syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="dsa-spin"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
      Syncing...
    `;

    try {
      const result = await syncLeetCodeSolvedQuestions({
        onProgress: (p) => {
          this.showToast(p.message, 'info');
          const toastEl = this.root.querySelector('.dsa-toast');
          if (toastEl) toastEl.textContent = p.message;
        }
      });

      if (result.success) {
        const { mergedLibrary, addedCount, updatedCount } = mergeLibrary(this.library, result.questions);
        await saveLibrary(mergedLibrary);
        await updateSyncMeta({
          lastSyncedAt: new Date().toISOString(),
          totalCount: mergedLibrary.length,
          username: result.username
        });
        await this.refreshState();
        this.showToast(`Sync successful! Added ${addedCount} new questions, updated ${updatedCount}.`, 'success');
      } else {
        this.showToast(result.message, 'error');
      }
    } catch (e) {
      this.showToast(`Sync failed: ${e.message}`, 'error');
    } finally {
      this.renderModalContent();
    }
  }

  /**
   * Handle CSV / JSON File Import
   * @param {Event} event 
   */
  async handleFileImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text !== 'string') return;

      let imported = [];
      let errors = [];

      if (file.name.endsWith('.json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
        const jsonRes = importFromJSON(text);
        imported = jsonRes.questions;
        errors = jsonRes.errors;
      } else {
        const csvRes = importFromCSV(text);
        imported = csvRes.questions;
        errors = csvRes.errors;
      }

      if (imported.length === 0) {
        this.showToast(`Import failed: ${errors[0] || 'No valid questions found in file.'}`, 'error');
        this.renderModalContent();
        return;
      }

      const { mergedLibrary, addedCount, updatedCount } = mergeLibrary(this.library, imported);
      await saveLibrary(mergedLibrary);
      await this.refreshState();

      this.showToast(`Successfully imported ${imported.length} questions! (+${addedCount} new, ${updatedCount} updated)`, 'success');
      this.renderModalContent();
    };

    reader.readAsText(file);
    // Reset file input value
    event.target.value = '';
  }

  /**
   * Helper to trigger a file download in browser
   * @param {string} filename 
   * @param {string} content 
   * @param {string} mimeType 
   */
  downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Show a temporary toast message
   * @param {string} message 
   * @param {'success'|'error'|'info'} type 
   */
  showToast(message, type = 'info') {
    this.toast = { message, type };
  }
}
