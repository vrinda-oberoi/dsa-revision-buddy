/**
 * UI Component Renderers and Micro-Animations for DSA Revision Buddy
 */

import { formatFriendlyDate, getDaysDifference } from '../services/dateUtils.js';

/**
 * Trigger confetti celebration animation on a canvas
 * @param {HTMLCanvasElement} canvas 
 */
export function triggerConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;

  const colors = ['#7C3AED', '#9333EA', '#F43F5E', '#FB7185', '#10B981', '#F59E0B', '#3B82F6'];
  const particles = [];
  const particleCount = 70;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2,
      y: height / 2 + 30,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 1.2) * 10,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrameId;
  const startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.opacity -= 0.012;

      if (p.opacity > 0 && p.y < height + 20) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    }

    if (activeParticles > 0 && elapsed < 3500) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

/**
 * Render Floating Trigger Button HTML
 */
export function getFloatingButtonHTML(dueCount = 0, isCompleted = false) {
  const badgeHTML = isCompleted
    ? `<span class="dsa-badge-pill dsa-badge-done">✓ Done</span>`
    : (dueCount > 0 ? `<span class="dsa-badge-pill">${dueCount} Due</span>` : `<span class="dsa-badge-pill">Ready</span>`);

  return `
    <div class="dsa-floating-btn" id="dsa-floating-trigger" title="Open DSA Revision Buddy">
      <div class="dsa-floating-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
      </div>
      <span>DSA Revision</span>
      ${badgeHTML}
    </div>
  `;
}

/**
 * Render First-Visit Daily Invitation Card HTML
 */
export function getInvitationCardHTML(dueCount = 0, target = 3) {
  const message = dueCount > 0
    ? `You have <strong>${dueCount} question${dueCount > 1 ? 's' : ''}</strong> due for spaced repetition today.`
    : `Keep your DSA problem-solving streak sharp! Target: <strong>${target} questions</strong>.`;

  return `
    <div class="dsa-invitation-card" id="dsa-invitation-banner">
      <div class="dsa-invitation-header">
        <div class="dsa-invitation-avatar">🎯</div>
        <div class="dsa-invitation-title">Hey! Ready for today's DSA revision?</div>
      </div>
      <div class="dsa-invitation-subtext">${message}</div>
      <div class="dsa-invitation-actions">
        <button class="dsa-btn-primary" id="dsa-invitation-start">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Start Now
        </button>
        <button class="dsa-btn-secondary" id="dsa-invitation-later">Later</button>
      </div>
    </div>
  `;
}

/**
 * Render Header & Navigation Tabs
 */
export function getModalHeaderHTML(activeTab = 'revision') {
  const tabs = [
    { id: 'revision', label: 'Revise', icon: '⚡' },
    { id: 'library', label: 'Library', icon: '📚' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'history', label: 'History', icon: '⏳' },
    { id: 'settings', label: 'Sync & Settings', icon: '⚙️' }
  ];

  const tabsHTML = tabs.map(t => `
    <button class="dsa-tab-btn ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}">
      <span>${t.icon}</span>
      <span>${t.label}</span>
    </button>
  `).join('');

  return `
    <div class="dsa-modal-header">
      <div class="dsa-header-brand">
        <div class="dsa-header-logo">R</div>
        <div class="dsa-header-titles">
          <div class="dsa-header-title">DSA Revision Buddy</div>
          <div class="dsa-header-subtitle">LeetCode Spaced Repetition</div>
        </div>
      </div>
      <button class="dsa-close-btn" id="dsa-modal-close" title="Close Panel">✕</button>
    </div>
    <div class="dsa-nav-tabs">
      ${tabsHTML}
    </div>
  `;
}

/**
 * Render Daily Goal & Progress Banner
 */
export function getProgressBannerHTML(progress) {
  const completed = progress.completedCount || 0;
  const target = progress.target || 3;
  const pct = Math.min(100, Math.round((completed / target) * 100));
  const remaining = Math.max(0, target - completed);

  return `
    <div class="dsa-progress-card">
      <div class="dsa-progress-top">
        <div class="dsa-progress-label">
          <span>🎯 Daily Revision Goal</span>
        </div>
        <div class="dsa-progress-ratio">${completed} / ${target} Completed</div>
      </div>
      <div class="dsa-progress-bar-track">
        <div class="dsa-progress-bar-fill" style="width: ${pct}%"></div>
      </div>
      <div class="dsa-progress-subtext">
        <span>${pct}% achieved</span>
        <span>${remaining === 0 ? 'Goal completed! 🎉' : `${remaining} question${remaining > 1 ? 's' : ''} remaining`}</span>
      </div>
    </div>
  `;
}

/**
 * Render Revision Tab View
 */
export function getRevisionViewHTML(state) {
  const { currentQuestion, progress, feedbackStep, celebration, customHardDays = 4, dueCount = 0 } = state;
  const progressBanner = getProgressBannerHTML(progress);

  // 1. Goal Completed Celebration View
  if (celebration || (progress.completedCount >= progress.target && !currentQuestion && !feedbackStep)) {
    return `
      ${progressBanner}
      <div class="dsa-celebration-card">
        <canvas class="dsa-confetti-canvas" id="dsa-confetti-canvas"></canvas>
        <div class="dsa-celebration-badge">🎉</div>
        <div class="dsa-celebration-title">Today's Revision Completed!</div>
        <div class="dsa-celebration-subtext">
          Awesome work! You hit your daily target of ${progress.target} question${progress.target > 1 ? 's' : ''}. Spaced repetition schedules have been updated.
        </div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button class="dsa-btn-primary" id="dsa-btn-extra-practice" style="max-width: 200px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Extra Practice
          </button>
        </div>
      </div>
    `;
  }

  // 2. Feedback Step (Question marked done, asking how difficult it was)
  if (feedbackStep && currentQuestion) {
    return `
      ${progressBanner}
      <div class="dsa-feedback-card">
        <div class="dsa-feedback-title">How difficult was this question for you?</div>
        <div class="dsa-feedback-subtitle">Problem #${currentQuestion.id}: ${currentQuestion.title}</div>
        
        <div class="dsa-feedback-options">
          <button class="dsa-feedback-btn" data-feedback="easy">
            <div class="dsa-feedback-main">
              <span class="dsa-feedback-icon">🟢</span>
              <div>
                <div class="dsa-feedback-name">Easy — Solved independently</div>
                <div class="dsa-feedback-desc">No hints needed, felt confident</div>
              </div>
            </div>
            <span class="dsa-feedback-interval">+15 days</span>
          </button>

          <button class="dsa-feedback-btn" data-feedback="hint">
            <div class="dsa-feedback-main">
              <span class="dsa-feedback-icon">🟡</span>
              <div>
                <div class="dsa-feedback-name">Needed a Hint</div>
                <div class="dsa-feedback-desc">Needed a small hint or peek at tags</div>
              </div>
            </div>
            <span class="dsa-feedback-interval">+7 days</span>
          </button>

          <div style="display: flex; flex-direction: column;">
            <button class="dsa-feedback-btn" data-feedback="hard" data-custom-days="${customHardDays}">
              <div class="dsa-feedback-main">
                <span class="dsa-feedback-icon">🔴</span>
                <div>
                  <div class="dsa-feedback-name">Needed Full Solution / Video</div>
                  <div class="dsa-feedback-desc">Struggled or had to watch editorial</div>
                </div>
              </div>
              <span class="dsa-feedback-interval">+${customHardDays} days</span>
            </button>
            <div class="dsa-hard-choices">
              <span style="font-size: 11px; color: var(--dsa-text-muted); align-self: center;">Revise hard in:</span>
              <button class="dsa-mini-pill ${customHardDays === 3 ? 'active' : ''}" data-set-hard-days="3">3 days</button>
              <button class="dsa-mini-pill ${customHardDays === 4 ? 'active' : ''}" data-set-hard-days="4">4 days</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Active Question View
  if (currentQuestion) {
    const diffClass = currentQuestion.difficulty === 'Easy' ? 'dsa-diff-easy' : (currentQuestion.difficulty === 'Hard' ? 'dsa-diff-hard' : 'dsa-diff-medium');
    const topicsHTML = (currentQuestion.topics || []).slice(0, 4).map(t => `<span class="dsa-topic-tag">${t}</span>`).join('');
    
    let urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-new">Fresh Pick</span>';
    if (state.selectionReason === 'overdue') {
      urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-overdue">⚠️ Overdue</span>';
    } else if (state.selectionReason === 'due') {
      urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-due">⏰ Due Today</span>';
    }

    return `
      ${progressBanner}
      <div class="dsa-question-card">
        <div class="dsa-card-accent-bar"></div>
        <div class="dsa-card-meta-row">
          <span class="dsa-meta-badge ${diffClass}">${currentQuestion.difficulty || 'Medium'}</span>
          ${urgencyBadge}
        </div>
        <div class="dsa-question-title">#${currentQuestion.id}. ${currentQuestion.title}</div>
        <div class="dsa-topic-tags">${topicsHTML}</div>
        
        <div style="font-size: 12px; color: var(--dsa-text-muted); margin-bottom: 16px;">
          Previous revisions: <strong>${currentQuestion.revisionCount || 0}</strong> • Next schedule: <strong>${formatFriendlyDate(currentQuestion.nextRevisionDate)}</strong>
        </div>

        <div class="dsa-question-actions">
          <a href="${currentQuestion.url}" target="_blank" rel="noopener noreferrer" class="dsa-btn-open" id="dsa-btn-open-problem">
            Open Problem
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <button class="dsa-btn-done" id="dsa-btn-mark-done">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Mark as Done
          </button>
        </div>
      </div>
    `;
  }

  // 4. Idle Start Screen
  return `
    ${progressBanner}
    <div class="dsa-section-card" style="text-align: center; padding: 28px 20px;">
      <div style="font-size: 32px; margin-bottom: 8px;">🧠</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 6px;">
        Ready for Today's Revision Session?
      </div>
      <div style="font-size: 13px; color: var(--dsa-text-muted); max-width: 360px; margin: 0 auto 20px auto; line-height: 1.4;">
        ${dueCount > 0 ? `You have <strong>${dueCount} question${dueCount > 1 ? 's' : ''}</strong> due for revision.` : 'No questions overdue right now. We will pick fresh practice questions from your library.'}
      </div>
      <button class="dsa-btn-primary" id="dsa-btn-start-session" style="padding: 12px 24px; font-size: 14px; margin: 0 auto;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Start Revision Session
      </button>
    </div>
  `;
}

/**
 * Render Library Explorer View HTML
 */
export function getLibraryViewHTML(library = [], filter = 'all', searchQuery = '') {
  const normalizedQuery = searchQuery.toLowerCase().trim();

  let filtered = library.filter(q => {
    if (!q) return false;
    // Search query match
    if (normalizedQuery) {
      const matchId = String(q.id).includes(normalizedQuery);
      const matchTitle = (q.title || '').toLowerCase().includes(normalizedQuery);
      const matchTopics = (q.topics || []).some(t => String(t).toLowerCase().includes(normalizedQuery));
      if (!matchId && !matchTitle && !matchTopics) return false;
    }
    // Filter pills
    if (filter === 'due') {
      return q.nextRevisionDate && getDaysDifference(q.nextRevisionDate) <= 0;
    }
    if (filter === 'easy' || filter === 'medium' || filter === 'hard') {
      return (q.difficulty || '').toLowerCase() === filter;
    }
    if (filter === 'solved') {
      return q.status === 'solved';
    }
    return true;
  });

  const filterButtons = [
    { id: 'all', label: `All (${library.length})` },
    { id: 'due', label: 'Due for Revision' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' }
  ].map(b => `<button class="dsa-filter-btn ${filter === b.id ? 'active' : ''}" data-filter="${b.id}">${b.label}</button>`).join('');

  const rowsHTML = filtered.length > 0 ? filtered.map(q => {
    const diffClass = q.difficulty === 'Easy' ? 'dsa-diff-easy' : (q.difficulty === 'Hard' ? 'dsa-diff-hard' : 'dsa-diff-medium');
    const dueDiff = q.nextRevisionDate ? getDaysDifference(q.nextRevisionDate) : null;
    let scheduleText = 'Not scheduled';
    if (dueDiff !== null) {
      scheduleText = dueDiff <= 0 ? `⚠️ Due (${formatFriendlyDate(q.nextRevisionDate)})` : `In ${dueDiff}d (${formatFriendlyDate(q.nextRevisionDate)})`;
    }

    return `
      <div class="dsa-list-item">
        <div class="dsa-item-left">
          <span class="dsa-meta-badge ${diffClass}">${q.difficulty || 'Med'}</span>
          <div class="dsa-item-title-col">
            <span class="dsa-item-title" title="${q.title}">#${q.id}. ${q.title}</span>
            <span class="dsa-item-sub">Rev: ${q.revisionCount || 0} • ${scheduleText}</span>
          </div>
        </div>
        <div class="dsa-item-actions">
          <button class="dsa-btn-secondary dsa-btn-mini" data-action-revise-id="${q.id}">Revise</button>
          <a href="${q.url}" target="_blank" rel="noopener noreferrer" class="dsa-btn-secondary dsa-btn-mini" title="Open in LeetCode">↗</a>
        </div>
      </div>
    `;
  }).join('') : `<div style="text-align: center; padding: 24px; color: var(--dsa-text-muted);">No questions match the current filter.</div>`;

  return `
    <div class="dsa-search-bar">
      <input type="text" class="dsa-input" id="dsa-library-search" placeholder="Search by problem title, number, or topic..." value="${searchQuery}" />
    </div>
    <div class="dsa-filter-row">
      ${filterButtons}
    </div>
    <div class="dsa-question-list">
      ${rowsHTML}
    </div>
  `;
}

/**
 * Render Upcoming Schedule View HTML
 */
export function getScheduleViewHTML(library = []) {
  const overdue = [];
  const dueToday = [];
  const next7Days = [];
  const later = [];

  for (const q of library) {
    if (!q || !q.nextRevisionDate) continue;
    const diff = getDaysDifference(q.nextRevisionDate);
    if (diff < 0) overdue.push(q);
    else if (diff === 0) dueToday.push(q);
    else if (diff <= 7) next7Days.push(q);
    else later.push(q);
  }

  const renderGroup = (title, items, badgeClass = '') => {
    if (items.length === 0) return '';
    return `
      <div style="margin-bottom: 14px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
          <span>${title}</span>
          <span style="font-size: 11px; background: #F1F5F9; padding: 2px 7px; border-radius: 9999px;">${items.length}</span>
        </div>
        <div class="dsa-question-list" style="max-height: 180px;">
          ${items.map(q => `
            <div class="dsa-list-item">
              <span class="dsa-item-title">#${q.id}. ${q.title}</span>
              <span style="font-size: 11.5px; font-weight: 600; color: var(--dsa-purple-start);">${formatFriendlyDate(q.nextRevisionDate)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  return `
    <div class="dsa-section-card">
      <div class="dsa-section-title">📅 Spaced Repetition Calendar</div>
      <div class="dsa-section-desc">Upcoming questions scheduled for revision by due date.</div>
      
      ${overdue.length > 0 ? renderGroup('⚠️ Overdue Revisions', overdue) : ''}
      ${dueToday.length > 0 ? renderGroup('⏰ Due Today', dueToday) : ''}
      ${next7Days.length > 0 ? renderGroup('🗓️ Next 7 Days', next7Days) : ''}
      ${later.length > 0 ? renderGroup('⏳ Later On', later) : ''}
      ${(overdue.length === 0 && dueToday.length === 0 && next7Days.length === 0 && later.length === 0) ? '<div style="text-align: center; color: var(--dsa-text-muted); padding: 20px;">No scheduled revisions found. Start a revision session to schedule questions!</div>' : ''}
    </div>
  `;
}

/**
 * Render Revision History View HTML
 */
export function getHistoryViewHTML(history = []) {
  if (history.length === 0) {
    return `
      <div class="dsa-section-card" style="text-align: center; padding: 30px 20px; color: var(--dsa-text-muted);">
        <div style="font-size: 28px; margin-bottom: 8px;">📜</div>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">No Revision History Yet</div>
        <div style="font-size: 12px;">Completed revisions will be logged here with timestamps and feedback ratings.</div>
      </div>
    `;
  }

  const feedbackEmoji = { easy: '🟢 Easy (+15d)', hint: '🟡 Hint (+7d)', hard: '🔴 Solution' };

  return `
    <div class="dsa-section-card">
      <div class="dsa-section-title">📜 Completed Revision Log</div>
      <div class="dsa-section-desc">Showing past revisions and spaced repetition feedback.</div>
      <div class="dsa-history-list" style="max-height: 420px; overflow-y: auto;">
        ${history.map(h => `
          <div class="dsa-history-row">
            <div>
              <div style="font-size: 13px; font-weight: 600; color: var(--dsa-text-main);">#${h.id} ${h.title || ''}</div>
              <div style="font-size: 11px; color: var(--dsa-text-muted);">Revised on ${h.date} • Next: ${h.nextRevisionDate}</div>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; padding: 4px 8px; border-radius: 6px; background: #F1F5F9; color: var(--dsa-text-main);">
              ${feedbackEmoji[h.feedback] || h.feedback}
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render Sync and Settings View HTML
 */
export function getSettingsViewHTML(settings, syncMeta, toast = null) {
  const targetOptions = [1, 2, 3, 5, 6, 10];
  const isCustomTarget = !targetOptions.includes(settings.dailyTarget);

  const toastHTML = toast ? `<div class="dsa-toast dsa-toast-${toast.type}">${toast.message}</div>` : '';

  return `
    ${toastHTML}

    <!-- 1. LeetCode Session Synchronization -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        LeetCode Account Synchronization
      </div>
      <div class="dsa-section-desc">
        Sync questions you have solved directly from your active LeetCode session. No password or API keys required.
      </div>
      <div style="font-size: 12px; color: var(--dsa-text-muted); margin-bottom: 12px;">
        Last synchronized: <strong>${syncMeta.lastSyncedAt ? new Date(syncMeta.lastSyncedAt).toLocaleString() : 'Never'}</strong>
        ${syncMeta.username ? ` • Account: <strong>@${syncMeta.username}</strong>` : ''}
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="dsa-btn-primary" id="dsa-btn-sync-leetcode">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          Sync Questions Now
        </button>
      </div>
    </div>

    <!-- 2. Manual CSV / JSON Fallback -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">📂 Import & Export Backup</div>
      <div class="dsa-section-desc">
        Import your solved questions manually via CSV or JSON, or download a full backup of your revision history.
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <input type="file" id="dsa-file-import" accept=".csv,.json" style="display: none;" />
        <button class="dsa-btn-secondary" id="dsa-btn-trigger-import">📥 Import CSV / JSON</button>
        <button class="dsa-btn-secondary" id="dsa-btn-download-csv-sample">📄 Sample CSV</button>
        <button class="dsa-btn-secondary" id="dsa-btn-export-csv">📤 Export CSV</button>
        <button class="dsa-btn-secondary" id="dsa-btn-export-json">💾 Backup JSON</button>
      </div>
    </div>

    <!-- 3. Daily Target Configuration -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">🎯 Daily Target Goal</div>
      <div class="dsa-section-desc">Choose how many DSA questions you want to revise each day.</div>
      <div class="dsa-target-selector">
        ${targetOptions.map(num => `
          <button class="dsa-target-pill ${settings.dailyTarget === num ? 'active' : ''}" data-target="${num}">${num} / day</button>
        `).join('')}
        <button class="dsa-target-pill ${isCustomTarget ? 'active' : ''}" data-target="custom">Custom</button>
      </div>
      ${isCustomTarget ? `
        <div style="margin-top: 10px; display: flex; gap: 8px; align-items: center;">
          <input type="number" id="dsa-custom-target-input" class="dsa-input" style="max-width: 100px;" value="${settings.dailyTarget}" min="1" max="50" />
          <button class="dsa-btn-secondary" id="dsa-btn-save-custom-target">Save</button>
        </div>
      ` : ''}
    </div>

    <!-- 4. Spaced Repetition Intervals -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">⏱️ Spaced Repetition Intervals (Days)</div>
      <div class="dsa-section-desc">Customize how many days later questions become due again based on feedback.</div>
      <div class="dsa-intervals-grid">
        <div class="dsa-interval-field">
          <label>Easy (Days)</label>
          <input type="number" id="dsa-interval-easy" class="dsa-input" value="${settings.intervals?.easy ?? 15}" min="1" max="180" />
        </div>
        <div class="dsa-interval-field">
          <label>Hint (Days)</label>
          <input type="number" id="dsa-interval-hint" class="dsa-input" value="${settings.intervals?.hint ?? 7}" min="1" max="90" />
        </div>
        <div class="dsa-interval-field">
          <label>Solution (Days)</label>
          <input type="number" id="dsa-interval-hard" class="dsa-input" value="${settings.intervals?.hard ?? 4}" min="1" max="30" />
        </div>
      </div>
      <button class="dsa-btn-secondary" id="dsa-btn-save-intervals" style="margin-top: 10px;">Save Intervals</button>
    </div>

    <!-- 5. Developer & Testing Tools -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">🧪 Testing Utilities</div>
      <div class="dsa-section-desc">Instantly test the daily reset or restore initial starter questions.</div>
      <div style="display: flex; gap: 8px;">
        <button class="dsa-btn-secondary" id="dsa-btn-reset-daily">Reset Today's Progress</button>
      </div>
    </div>
  `;
}
