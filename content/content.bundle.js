(() => {
  // src/ui/styles.js
  var UI_STYLES = `
:host, .dsa-root {
  --dsa-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --dsa-bg: #FAF9F6;
  --dsa-card-bg: #FFFFFF;
  --dsa-text-main: #1E293B;
  --dsa-text-muted: #64748B;
  --dsa-text-subtle: #94A3B8;
  --dsa-border: rgba(148, 163, 184, 0.2);
  --dsa-border-strong: rgba(124, 58, 237, 0.2);
  
  --dsa-purple-start: #7C3AED;
  --dsa-purple-end: #9333EA;
  --dsa-purple-light: #F5F3FF;
  --dsa-purple-border: #DDD6FE;
  
  --dsa-coral-start: #F43F5E;
  --dsa-coral-end: #FB7185;
  --dsa-coral-light: #FFF1F2;
  --dsa-coral-border: #FECDD3;

  --dsa-easy-bg: #ECFDF5;
  --dsa-easy-text: #065F46;
  --dsa-easy-border: #A7F3D0;
  
  --dsa-med-bg: #FFFBEB;
  --dsa-med-text: #92400E;
  --dsa-med-border: #FDE68A;
  
  --dsa-hard-bg: #FFF1F2;
  --dsa-hard-text: #9F1239;
  --dsa-hard-border: #FECDD3;

  --dsa-shadow-sm: 0 2px 4px rgba(0,0,0,0.04);
  --dsa-shadow-md: 0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(0,0,0,0.04);
  --dsa-shadow-lg: 0 20px 35px -8px rgba(124, 58, 237, 0.18), 0 12px 16px -8px rgba(0,0,0,0.06);
  --dsa-shadow-float: 0 12px 30px rgba(124, 58, 237, 0.35);

  font-family: var(--dsa-font);
  color: var(--dsa-text-main);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

*, *::before, *::after {
  box-sizing: inherit;
}

/* Floating Trigger Button */
.dsa-floating-btn {
  position: fixed;
  right: 20px;
  bottom: 32px;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 18px 10px 14px;
  background: linear-gradient(135deg, var(--dsa-purple-start) 0%, var(--dsa-purple-end) 100%);
  color: #FFFFFF;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  box-shadow: var(--dsa-shadow-float);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  font-weight: 600;
  font-size: 13.5px;
  letter-spacing: 0.2px;
}

.dsa-floating-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 36px rgba(124, 58, 237, 0.45);
}

.dsa-floating-btn:active {
  transform: translateY(0) scale(0.98);
}

.dsa-floating-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.dsa-badge-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 9999px;
  background: #FFFFFF;
  color: var(--dsa-purple-start);
  margin-left: 2px;
}

.dsa-badge-pill.dsa-badge-done {
  background: #10B981;
  color: #FFFFFF;
}

/* Invitation Floating Toast */
.dsa-invitation-card {
  position: fixed;
  right: 20px;
  bottom: 85px;
  z-index: 2147483646;
  width: 320px;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1.5px solid var(--dsa-purple-border);
  box-shadow: var(--dsa-shadow-lg);
  padding: 16px;
  animation: dsaSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dsaSlideUp {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.dsa-invitation-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.dsa-invitation-avatar {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7C3AED 0%, #F43F5E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.dsa-invitation-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--dsa-text-main);
  line-height: 1.3;
}

.dsa-invitation-subtext {
  font-size: 12.5px;
  color: var(--dsa-text-muted);
  margin-bottom: 14px;
  line-height: 1.4;
}

.dsa-invitation-actions {
  display: flex;
  gap: 8px;
}

.dsa-btn-primary {
  flex: 1;
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: #FFFFFF;
  background: linear-gradient(135deg, var(--dsa-purple-start) 0%, var(--dsa-purple-end) 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.dsa-btn-primary:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.dsa-btn-secondary {
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--dsa-text-muted);
  background: #F1F5F9;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dsa-btn-secondary:hover {
  background: #E2E8F0;
  color: var(--dsa-text-main);
}

/* Modal Backdrop & Panel */
.dsa-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 2147483646;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: dsaFadeIn 0.2s ease;
}

@keyframes dsaFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.dsa-modal-panel {
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  background: var(--dsa-bg);
  border-radius: 20px;
  box-shadow: var(--dsa-shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  animation: dsaModalZoom 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dsaModalZoom {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Modal Header */
.dsa-modal-header {
  padding: 16px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid var(--dsa-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dsa-header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dsa-header-logo {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--dsa-purple-start) 0%, var(--dsa-coral-start) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.25);
}

.dsa-header-titles {
  display: flex;
  flex-direction: column;
}

.dsa-header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--dsa-text-main);
  letter-spacing: -0.2px;
}

.dsa-header-subtitle {
  font-size: 11.5px;
  color: var(--dsa-text-muted);
}

.dsa-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: var(--dsa-text-subtle);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.15s ease;
}

.dsa-close-btn:hover {
  background: #F1F5F9;
  color: var(--dsa-text-main);
}

/* Navigation Tabs */
.dsa-nav-tabs {
  display: flex;
  padding: 6px 16px;
  background: #FFFFFF;
  border-bottom: 1px solid var(--dsa-border);
  gap: 6px;
  overflow-x: auto;
}

.dsa-tab-btn {
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--dsa-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.dsa-tab-btn:hover {
  background: #F8FAFC;
  color: var(--dsa-text-main);
}

.dsa-tab-btn.active {
  background: var(--dsa-purple-light);
  color: var(--dsa-purple-start);
}

/* Modal Body Content */
.dsa-modal-body {
  padding: 18px 20px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Daily Goal & Progress Banner */
.dsa-progress-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px 18px;
  border: 1px solid var(--dsa-border);
  box-shadow: var(--dsa-shadow-sm);
}

.dsa-progress-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.dsa-progress-label {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--dsa-text-main);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dsa-progress-ratio {
  font-size: 13px;
  font-weight: 700;
  color: var(--dsa-purple-start);
}

.dsa-progress-bar-track {
  width: 100%;
  height: 8px;
  background: #F1F5F9;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 8px;
}

.dsa-progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--dsa-purple-start) 0%, var(--dsa-coral-start) 100%);
  border-radius: 9999px;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.dsa-progress-subtext {
  font-size: 12px;
  color: var(--dsa-text-muted);
  display: flex;
  justify-content: space-between;
}

/* Question Active Card */
.dsa-question-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid var(--dsa-border-strong);
  box-shadow: var(--dsa-shadow-md);
  position: relative;
  overflow: hidden;
}

.dsa-card-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--dsa-purple-start) 0%, var(--dsa-coral-start) 100%);
}

.dsa-card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.dsa-meta-badge {
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.dsa-diff-easy {
  background: var(--dsa-easy-bg);
  color: var(--dsa-easy-text);
  border: 1px solid var(--dsa-easy-border);
}

.dsa-diff-medium {
  background: var(--dsa-med-bg);
  color: var(--dsa-med-text);
  border: 1px solid var(--dsa-med-border);
}

.dsa-diff-hard {
  background: var(--dsa-hard-bg);
  color: var(--dsa-hard-text);
  border: 1px solid var(--dsa-hard-border);
}

.dsa-urgency-pill {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 9999px;
}

.dsa-urgency-overdue {
  background: #FEE2E2;
  color: #B91C1C;
}

.dsa-urgency-due {
  background: #FEF3C7;
  color: #B45309;
}

.dsa-urgency-new {
  background: #E0E7FF;
  color: #3730A3;
}

.dsa-question-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--dsa-text-main);
  margin-bottom: 10px;
  line-height: 1.35;
}

.dsa-topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.dsa-topic-tag {
  font-size: 11.5px;
  padding: 2px 8px;
  background: #F8FAFC;
  color: var(--dsa-text-muted);
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.dsa-question-actions {
  display: flex;
  gap: 10px;
}

.dsa-btn-open {
  flex: 1;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--dsa-purple-start);
  background: var(--dsa-purple-light);
  border: 1.5px solid var(--dsa-purple-border);
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.dsa-btn-open:hover {
  background: #EDE9FE;
  transform: translateY(-1px);
}

.dsa-btn-done {
  flex: 1.2;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #FFFFFF;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.dsa-btn-done:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

/* Spaced Repetition Feedback View */
.dsa-feedback-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 18px;
  border: 1.5px solid var(--dsa-purple-border);
  box-shadow: var(--dsa-shadow-md);
  text-align: center;
  animation: dsaSlideUp 0.3s ease;
}

.dsa-feedback-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--dsa-text-main);
  margin-bottom: 6px;
}

.dsa-feedback-subtitle {
  font-size: 12.5px;
  color: var(--dsa-text-muted);
  margin-bottom: 14px;
}

.dsa-feedback-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dsa-feedback-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1.5px solid #E2E8F0;
  background: #FFFFFF;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.dsa-feedback-btn:hover {
  border-color: var(--dsa-purple-start);
  transform: translateY(-1px);
  box-shadow: var(--dsa-shadow-sm);
}

.dsa-feedback-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dsa-feedback-icon {
  font-size: 20px;
}

.dsa-feedback-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--dsa-text-main);
}

.dsa-feedback-desc {
  font-size: 11.5px;
  color: var(--dsa-text-muted);
}

.dsa-feedback-interval {
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  background: #F1F5F9;
  color: var(--dsa-purple-start);
  white-space: nowrap;
}

.dsa-hard-choices {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  justify-content: flex-end;
}

.dsa-mini-pill {
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  background: var(--dsa-coral-light);
  color: var(--dsa-coral-start);
  border: 1px solid var(--dsa-coral-border);
  cursor: pointer;
}

.dsa-mini-pill.active {
  background: var(--dsa-coral-start);
  color: white;
}

/* Celebration State */
.dsa-celebration-card {
  background: linear-gradient(135deg, #FAF5FF 0%, #FFF1F2 100%);
  border-radius: 18px;
  padding: 24px 20px;
  text-align: center;
  border: 1.5px solid var(--dsa-purple-border);
  box-shadow: var(--dsa-shadow-md);
  position: relative;
  overflow: hidden;
}

.dsa-celebration-badge {
  font-size: 40px;
  margin-bottom: 8px;
  display: inline-block;
  animation: dsaBounce 1.2s infinite;
}

@keyframes dsaBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.dsa-celebration-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--dsa-text-main);
  margin-bottom: 6px;
}

.dsa-celebration-subtext {
  font-size: 13px;
  color: var(--dsa-text-muted);
  margin-bottom: 16px;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
}

.dsa-confetti-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

/* Library Explorer */
.dsa-search-bar {
  display: flex;
  gap: 8px;
}

.dsa-input {
  flex: 1;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--dsa-border);
  background: #FFFFFF;
  font-size: 13px;
  color: var(--dsa-text-main);
  outline: none;
  font-family: inherit;
}

.dsa-input:focus {
  border-color: var(--dsa-purple-start);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.dsa-filter-row {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.dsa-filter-btn {
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid var(--dsa-border);
  background: #FFFFFF;
  color: var(--dsa-text-muted);
  cursor: pointer;
  white-space: nowrap;
}

.dsa-filter-btn.active {
  background: var(--dsa-purple-start);
  color: white;
  border-color: var(--dsa-purple-start);
}

.dsa-question-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.dsa-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid var(--dsa-border);
  transition: all 0.15s ease;
}

.dsa-list-item:hover {
  border-color: var(--dsa-purple-border);
  box-shadow: var(--dsa-shadow-sm);
}

.dsa-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.dsa-item-title-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dsa-item-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--dsa-text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dsa-item-sub {
  font-size: 11px;
  color: var(--dsa-text-muted);
}

.dsa-item-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dsa-btn-mini {
  padding: 5px 9px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

/* History and Timeline */
.dsa-history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dsa-history-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid var(--dsa-border);
}

/* Settings and Sync Views */
.dsa-section-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid var(--dsa-border);
}

.dsa-section-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--dsa-text-main);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dsa-section-desc {
  font-size: 12px;
  color: var(--dsa-text-muted);
  margin-bottom: 12px;
}

.dsa-target-selector {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.dsa-target-pill {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  border: 1.5px solid var(--dsa-border);
  background: #FFFFFF;
  color: var(--dsa-text-muted);
  cursor: pointer;
}

.dsa-target-pill.active {
  background: var(--dsa-purple-light);
  color: var(--dsa-purple-start);
  border-color: var(--dsa-purple-start);
}

.dsa-intervals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.dsa-interval-field label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--dsa-text-muted);
  margin-bottom: 4px;
}

.dsa-toast {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
}

.dsa-toast-success {
  background: #ECFDF5;
  color: #065F46;
  border: 1px solid #A7F3D0;
}

.dsa-toast-error {
  background: #FFF1F2;
  color: #9F1239;
  border: 1px solid #FECDD3;
}

.dsa-toast-info {
  background: #EFF6FF;
  color: #1E40AF;
  border: 1px solid #BFDBFE;
}

/* Category Badges */
.dsa-cat-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.dsa-cat-dsa {
  background: var(--dsa-easy-bg);
  color: var(--dsa-easy-text);
  border: 1px solid var(--dsa-easy-border);
}

.dsa-cat-nondsa {
  background: var(--dsa-hard-bg);
  color: var(--dsa-hard-text);
  border: 1px solid var(--dsa-hard-border);
}

.dsa-cat-review {
  background: var(--dsa-med-bg);
  color: var(--dsa-med-text);
  border: 1px solid var(--dsa-med-border);
}

/* Revision Source Options in Settings */
.dsa-source-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.dsa-source-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  background: #F8FAFC;
  border: 1.5px solid var(--dsa-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.dsa-source-option:hover {
  border-color: var(--dsa-purple-border);
}

.dsa-source-option.active {
  background: var(--dsa-purple-light);
  border-color: var(--dsa-purple-start);
}

.dsa-source-radio {
  margin-top: 3px;
  cursor: pointer;
  accent-color: var(--dsa-purple-start);
}

.dsa-source-info {
  display: flex;
  flex-direction: column;
}

.dsa-source-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--dsa-text-main);
}

.dsa-source-desc {
  font-size: 11.5px;
  color: var(--dsa-text-muted);
}

/* Custom Topics Grid */
.dsa-custom-topics-box {
  background: #F8FAFC;
  border: 1px solid var(--dsa-border);
  border-radius: 12px;
  padding: 12px;
  margin-top: 8px;
  animation: dsaFadeIn 0.2s ease;
}

.dsa-topics-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.dsa-topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 6px;
  max-height: 190px;
  overflow-y: auto;
  padding-right: 4px;
}

.dsa-topic-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  background: #FFFFFF;
  border: 1px solid var(--dsa-border);
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--dsa-text-main);
  cursor: pointer;
  user-select: none;
}

.dsa-topic-chip:hover {
  border-color: var(--dsa-purple-border);
}

.dsa-topic-chip input[type="checkbox"] {
  accent-color: var(--dsa-purple-start);
  cursor: pointer;
}

/* Manage Questions Screen */
.dsa-manage-stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.dsa-stat-chip {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: #FFFFFF;
  border: 1px solid var(--dsa-border);
  color: var(--dsa-text-muted);
}

/* iOS-Style Toggle Switch */
.dsa-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}

.dsa-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.dsa-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBD5E1;
  transition: 0.25s;
  border-radius: 34px;
}

.dsa-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.25s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

input:checked + .dsa-slider {
  background: linear-gradient(135deg, var(--dsa-purple-start) 0%, var(--dsa-purple-end) 100%);
}

input:checked + .dsa-slider:before {
  transform: translateX(16px);
}

`;

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
  function parseLocalDate(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return /* @__PURE__ */ new Date();
    const parts = dateStr.split("-");
    if (parts.length !== 3) return /* @__PURE__ */ new Date();
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 0, 0, 0, 0);
  }
  function addDays(dateStr, days) {
    const d = parseLocalDate(dateStr);
    d.setDate(d.getDate() + Number(days));
    return formatLocalDate(d);
  }
  function getDaysDifference(targetDateStr, baseDateStr = getTodayDateString()) {
    if (!targetDateStr) return 0;
    const target = parseLocalDate(targetDateStr);
    const base = parseLocalDate(baseDateStr);
    const diffMs = target.getTime() - base.getTime();
    return Math.round(diffMs / (1e3 * 60 * 60 * 24));
  }
  function isDueOrOverdue(dateStr, todayStr = getTodayDateString()) {
    if (!dateStr) return false;
    return dateStr <= todayStr;
  }
  function isMidnightCrossed(lastActiveDateStr, currentTodayStr = getTodayDateString()) {
    if (!lastActiveDateStr) return true;
    return currentTodayStr > lastActiveDateStr;
  }
  function formatFriendlyDate(dateStr, todayStr = getTodayDateString()) {
    if (!dateStr) return "Not scheduled";
    const diff = getDaysDifference(dateStr, todayStr);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    if (diff > 1 && diff <= 30) return `In ${diff} days`;
    if (diff < -1) return `${Math.abs(diff)} days overdue`;
    const d = parseLocalDate(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  // src/services/dsaClassifier.js
  var NON_DSA_TAGS = /* @__PURE__ */ new Set([
    "database",
    "sql",
    "pandas",
    "shell",
    "bash",
    "concurrency",
    "operating system",
    "multithreading"
  ]);
  var DSA_TOPICS_MAP = {
    "Arrays and Hashing": [
      "array",
      "hash table",
      "hash",
      "hashing",
      "counting",
      "prefix sum"
    ],
    "Strings": [
      "string",
      "string matching",
      "rolling hash"
    ],
    "Two Pointers": [
      "two pointers",
      "two pointer"
    ],
    "Sliding Window": [
      "sliding window"
    ],
    "Binary Search": [
      "binary search",
      "bisection"
    ],
    "Sorting": [
      "sorting",
      "sort",
      "bucket sort",
      "radix sort",
      "merge sort",
      "quickselect"
    ],
    "Linked Lists": [
      "linked list",
      "doubly-linked list",
      "doubly linked list"
    ],
    "Stacks and Queues": [
      "stack",
      "queue",
      "monotonic queue",
      "deque"
    ],
    "Recursion and Backtracking": [
      "recursion",
      "backtracking"
    ],
    "Trees and Binary Trees": [
      "tree",
      "binary tree"
    ],
    "Binary Search Trees": [
      "binary search tree",
      "bst"
    ],
    "Heaps and Priority Queues": [
      "heap (priority queue)",
      "heap",
      "priority queue"
    ],
    "Graphs": [
      "graph",
      "breadth-first search",
      "depth-first search",
      "bfs",
      "dfs",
      "topological sort",
      "shortest path",
      "minimum spanning tree",
      "union find",
      "biconnected component",
      "strongly connected component",
      "eulerian circuit"
    ],
    "Greedy Algorithms": [
      "greedy"
    ],
    "Dynamic Programming": [
      "dynamic programming",
      "dp",
      "memoization"
    ],
    "Tries": [
      "trie"
    ],
    "Bit Manipulation": [
      "bit manipulation",
      "bitmask",
      "bitwise"
    ],
    "Intervals": [
      "intervals",
      "interval",
      "line sweep"
    ],
    "Monotonic Stack": [
      "monotonic stack"
    ],
    "Math and Bitwise DSA": [
      "math",
      "number theory",
      "combinatorics",
      "geometry",
      "game theory",
      "probability and statistics",
      "matrix",
      "divide and conquer",
      "segment tree",
      "binary indexed tree"
    ]
  };
  var CANONICAL_DSA_TOPICS = Object.keys(DSA_TOPICS_MAP);
  function normalizeTag(tag) {
    if (!tag) return "";
    return String(tag).trim().toLowerCase();
  }
  function classifyQuestion(question) {
    if (!question) {
      return {
        isDsa: false,
        isNonDsa: false,
        needsReview: true,
        matchedTopics: [],
        categoryLabel: "Needs Review",
        reason: "No question data provided"
      };
    }
    const rawTopics = Array.isArray(question.topics) ? question.topics : [];
    const normalizedTags = rawTopics.map((t) => normalizeTag(t)).filter(Boolean);
    const urlLower = String(question.url || "").toLowerCase();
    const hasSqlInUrl = urlLower.includes("/database/") || urlLower.includes("/pandas/");
    const matchedNonDsaTag = normalizedTags.find((tag) => NON_DSA_TAGS.has(tag));
    if (matchedNonDsaTag || hasSqlInUrl) {
      return {
        isDsa: false,
        isNonDsa: true,
        needsReview: false,
        matchedTopics: [],
        categoryLabel: "Non-DSA",
        reason: `Contains non-DSA tag: ${matchedNonDsaTag || "Database/Pandas"}`
      };
    }
    if (normalizedTags.length === 0) {
      return {
        isDsa: false,
        isNonDsa: false,
        needsReview: true,
        matchedTopics: [],
        categoryLabel: "Needs Review",
        reason: "Missing topic tags (Needs Review)"
      };
    }
    const matchedCanonicalTopics = /* @__PURE__ */ new Set();
    for (const [canonicalTopic, tagAliases] of Object.entries(DSA_TOPICS_MAP)) {
      for (const tag of normalizedTags) {
        if (tagAliases.some((alias) => alias === tag || tag.includes(alias))) {
          matchedCanonicalTopics.add(canonicalTopic);
        }
      }
    }
    const matchedTopicsList = Array.from(matchedCanonicalTopics);
    if (matchedTopicsList.length > 0) {
      return {
        isDsa: true,
        isNonDsa: false,
        needsReview: false,
        matchedTopics: matchedTopicsList,
        categoryLabel: "DSA",
        reason: `Matched DSA topics: ${matchedTopicsList.join(", ")}`
      };
    }
    return {
      isDsa: false,
      isNonDsa: false,
      needsReview: true,
      matchedTopics: [],
      categoryLabel: "Needs Review",
      reason: `Unrecognized topic tags: ${rawTopics.join(", ")} (Needs Review)`
    };
  }
  function isQuestionEligible(question, settings = {}) {
    if (!question) return false;
    if (question.manualInclusion === "excluded" || question.isExcluded === true) {
      return false;
    }
    if (question.manualInclusion === "included") {
      return true;
    }
    const source = settings.questionSource || "dsa_only";
    const classification = classifyQuestion(question);
    if (source === "all") {
      return true;
    }
    if (source === "dsa_only") {
      return classification.isDsa && !classification.isNonDsa && !classification.needsReview;
    }
    if (source === "custom") {
      const activeCustomTopics = Array.isArray(settings.customTopics) && settings.customTopics.length > 0 ? settings.customTopics : CANONICAL_DSA_TOPICS;
      if (!classification.isDsa || classification.isNonDsa) {
        return false;
      }
      return classification.matchedTopics.some((topic) => activeCustomTopics.includes(topic));
    }
    return false;
  }

  // src/ui/components.js
  function triggerConfetti(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const colors = ["#7C3AED", "#9333EA", "#F43F5E", "#FB7185", "#10B981", "#F59E0B", "#3B82F6"];
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
        p.vy += 0.28;
        p.vx *= 0.98;
        p.rotation += p.vRot;
        p.opacity -= 0.012;
        if (p.opacity > 0 && p.y < height + 20) {
          activeParticles++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
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
  function getFloatingButtonHTML(dueCount = 0, isCompleted = false) {
    const badgeHTML = isCompleted ? `<span class="dsa-badge-pill dsa-badge-done">\u2713 Done</span>` : dueCount > 0 ? `<span class="dsa-badge-pill">${dueCount} Due</span>` : `<span class="dsa-badge-pill">Ready</span>`;
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
  function getInvitationCardHTML(dueCount = 0, target = 3) {
    const message = dueCount > 0 ? `You have <strong>${dueCount} question${dueCount > 1 ? "s" : ""}</strong> due for spaced repetition today.` : `Keep your DSA problem-solving streak sharp! Target: <strong>${target} questions</strong>.`;
    return `
    <div class="dsa-invitation-card" id="dsa-invitation-banner">
      <div class="dsa-invitation-header">
        <div class="dsa-invitation-avatar">\u{1F3AF}</div>
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
  function getModalHeaderHTML(activeTab = "revision") {
    const tabs = [
      { id: "revision", label: "Revise", icon: "\u26A1" },
      { id: "library", label: "Library", icon: "\u{1F4DA}" },
      { id: "manage", label: "Manage", icon: "\u{1F3AF}" },
      { id: "schedule", label: "Schedule", icon: "\u{1F4C5}" },
      { id: "history", label: "History", icon: "\u23F3" },
      { id: "settings", label: "Sync & Settings", icon: "\u2699\uFE0F" }
    ];
    const tabsHTML = tabs.map((t) => `
    <button class="dsa-tab-btn ${t.id === activeTab ? "active" : ""}" data-tab="${t.id}">
      <span>${t.icon}</span>
      <span>${t.label}</span>
    </button>
  `).join("");
    return `
    <div class="dsa-modal-header">
      <div class="dsa-header-brand">
        <div class="dsa-header-logo">R</div>
        <div class="dsa-header-titles">
          <div class="dsa-header-title">DSA Revision Buddy</div>
          <div class="dsa-header-subtitle">LeetCode Spaced Repetition</div>
        </div>
      </div>
      <button class="dsa-close-btn" id="dsa-modal-close" title="Close Panel">\u2715</button>
    </div>
    <div class="dsa-nav-tabs">
      ${tabsHTML}
    </div>
  `;
  }
  function getProgressBannerHTML(progress) {
    const completed = progress.completedCount || 0;
    const target = progress.target || 3;
    const pct = Math.min(100, Math.round(completed / target * 100));
    const remaining = Math.max(0, target - completed);
    return `
    <div class="dsa-progress-card">
      <div class="dsa-progress-top">
        <div class="dsa-progress-label">
          <span>\u{1F3AF} Daily Revision Goal</span>
        </div>
        <div class="dsa-progress-ratio">${completed} / ${target} Completed</div>
      </div>
      <div class="dsa-progress-bar-track">
        <div class="dsa-progress-bar-fill" style="width: ${pct}%"></div>
      </div>
      <div class="dsa-progress-subtext">
        <span>${pct}% achieved</span>
        <span>${remaining === 0 ? "Goal completed! \u{1F389}" : `${remaining} question${remaining > 1 ? "s" : ""} remaining`}</span>
      </div>
    </div>
  `;
  }
  function getRevisionViewHTML(state) {
    const { currentQuestion, progress, feedbackStep, celebration, customHardDays = 4, dueCount = 0 } = state;
    const progressBanner = getProgressBannerHTML(progress);
    if (celebration || progress.completedCount >= progress.target && !currentQuestion && !feedbackStep) {
      return `
      ${progressBanner}
      <div class="dsa-celebration-card">
        <canvas class="dsa-confetti-canvas" id="dsa-confetti-canvas"></canvas>
        <div class="dsa-celebration-badge">\u{1F389}</div>
        <div class="dsa-celebration-title">Today's Revision Completed!</div>
        <div class="dsa-celebration-subtext">
          Awesome work! You hit your daily target of ${progress.target} question${progress.target > 1 ? "s" : ""}. Spaced repetition schedules have been updated.
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
    if (feedbackStep && currentQuestion) {
      return `
      ${progressBanner}
      <div class="dsa-feedback-card">
        <div class="dsa-feedback-title">How difficult was this question for you?</div>
        <div class="dsa-feedback-subtitle">Problem #${currentQuestion.id}: ${currentQuestion.title}</div>
        
        <div class="dsa-feedback-options">
          <button class="dsa-feedback-btn" data-feedback="easy">
            <div class="dsa-feedback-main">
              <span class="dsa-feedback-icon">\u{1F7E2}</span>
              <div>
                <div class="dsa-feedback-name">Easy \u2014 Solved independently</div>
                <div class="dsa-feedback-desc">No hints needed, felt confident</div>
              </div>
            </div>
            <span class="dsa-feedback-interval">+15 days</span>
          </button>

          <button class="dsa-feedback-btn" data-feedback="hint">
            <div class="dsa-feedback-main">
              <span class="dsa-feedback-icon">\u{1F7E1}</span>
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
                <span class="dsa-feedback-icon">\u{1F534}</span>
                <div>
                  <div class="dsa-feedback-name">Needed Full Solution / Video</div>
                  <div class="dsa-feedback-desc">Struggled or had to watch editorial</div>
                </div>
              </div>
              <span class="dsa-feedback-interval">+${customHardDays} days</span>
            </button>
            <div class="dsa-hard-choices">
              <span style="font-size: 11px; color: var(--dsa-text-muted); align-self: center;">Revise hard in:</span>
              <button class="dsa-mini-pill ${customHardDays === 3 ? "active" : ""}" data-set-hard-days="3">3 days</button>
              <button class="dsa-mini-pill ${customHardDays === 4 ? "active" : ""}" data-set-hard-days="4">4 days</button>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    if (currentQuestion) {
      const diffClass = currentQuestion.difficulty === "Easy" ? "dsa-diff-easy" : currentQuestion.difficulty === "Hard" ? "dsa-diff-hard" : "dsa-diff-medium";
      const topicsHTML = (currentQuestion.topics || []).slice(0, 4).map((t) => `<span class="dsa-topic-tag">${t}</span>`).join("");
      let urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-new">Fresh Pick</span>';
      if (state.selectionReason === "overdue") {
        urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-overdue">\u26A0\uFE0F Overdue</span>';
      } else if (state.selectionReason === "due") {
        urgencyBadge = '<span class="dsa-urgency-pill dsa-urgency-due">\u23F0 Due Today</span>';
      }
      return `
      ${progressBanner}
      <div class="dsa-question-card">
        <div class="dsa-card-accent-bar"></div>
        <div class="dsa-card-meta-row">
          <span class="dsa-meta-badge ${diffClass}">${currentQuestion.difficulty || "Medium"}</span>
          ${urgencyBadge}
        </div>
        <div class="dsa-question-title">#${currentQuestion.id}. ${currentQuestion.title}</div>
        <div class="dsa-topic-tags">${topicsHTML}</div>
        
        <div style="font-size: 12px; color: var(--dsa-text-muted); margin-bottom: 16px;">
          Previous revisions: <strong>${currentQuestion.revisionCount || 0}</strong> \u2022 Next schedule: <strong>${formatFriendlyDate(currentQuestion.nextRevisionDate)}</strong>
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
    if (state.selectionReason === "no_eligible_questions") {
      const source = state.settings?.questionSource || "dsa_only";
      let sourceDesc = "DSA Only";
      if (source === "custom") sourceDesc = "Custom Topics";
      else if (source === "all") sourceDesc = "All Solved Questions";
      return `
      ${progressBanner}
      <div class="dsa-section-card" style="text-align: center; padding: 28px 20px;">
        <div style="font-size: 32px; margin-bottom: 8px;">\u{1F50D}</div>
        <div style="font-size: 16px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 6px;">
          No Eligible Revision Questions Found
        </div>
        <div style="font-size: 13px; color: var(--dsa-text-muted); max-width: 380px; margin: 0 auto 18px auto; line-height: 1.4;">
          Your revision source is currently set to <strong>${sourceDesc}</strong>. No solved problems match this criteria, or matching problems were manually excluded.
        </div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button class="dsa-btn-primary" id="dsa-btn-jump-manage">Manage Questions</button>
          <button class="dsa-btn-secondary" id="dsa-btn-jump-settings">Revision Sources</button>
        </div>
      </div>
    `;
    }
    return `
    ${progressBanner}
    <div class="dsa-section-card" style="text-align: center; padding: 28px 20px;">
      <div style="font-size: 32px; margin-bottom: 8px;">\u{1F9E0}</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 6px;">
        Ready for Today's Revision Session?
      </div>
      <div style="font-size: 13px; color: var(--dsa-text-muted); max-width: 360px; margin: 0 auto 20px auto; line-height: 1.4;">
        ${dueCount > 0 ? `You have <strong>${dueCount} question${dueCount > 1 ? "s" : ""}</strong> due for revision.` : "No questions overdue right now. We will pick fresh practice questions from your library."}
      </div>
      <button class="dsa-btn-primary" id="dsa-btn-start-session" style="padding: 12px 24px; font-size: 14px; margin: 0 auto;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Start Revision Session
      </button>
    </div>
  `;
  }
  function getLibraryViewHTML(library = [], filter = "all", searchQuery = "") {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    let filtered = library.filter((q) => {
      if (!q) return false;
      if (normalizedQuery) {
        const matchId = String(q.id).includes(normalizedQuery);
        const matchTitle = (q.title || "").toLowerCase().includes(normalizedQuery);
        const matchTopics = (q.topics || []).some((t) => String(t).toLowerCase().includes(normalizedQuery));
        if (!matchId && !matchTitle && !matchTopics) return false;
      }
      if (filter === "due") {
        return q.nextRevisionDate && getDaysDifference(q.nextRevisionDate) <= 0;
      }
      if (filter === "easy" || filter === "medium" || filter === "hard") {
        return (q.difficulty || "").toLowerCase() === filter;
      }
      if (filter === "solved") {
        return q.status === "solved";
      }
      return true;
    });
    const filterButtons = [
      { id: "all", label: `All (${library.length})` },
      { id: "due", label: "Due for Revision" },
      { id: "easy", label: "Easy" },
      { id: "medium", label: "Medium" },
      { id: "hard", label: "Hard" }
    ].map((b) => `<button class="dsa-filter-btn ${filter === b.id ? "active" : ""}" data-filter="${b.id}">${b.label}</button>`).join("");
    const rowsHTML = filtered.length > 0 ? filtered.map((q) => {
      const diffClass = q.difficulty === "Easy" ? "dsa-diff-easy" : q.difficulty === "Hard" ? "dsa-diff-hard" : "dsa-diff-medium";
      const dueDiff = q.nextRevisionDate ? getDaysDifference(q.nextRevisionDate) : null;
      let scheduleText = "Not scheduled";
      if (dueDiff !== null) {
        scheduleText = dueDiff <= 0 ? `\u26A0\uFE0F Due (${formatFriendlyDate(q.nextRevisionDate)})` : `In ${dueDiff}d (${formatFriendlyDate(q.nextRevisionDate)})`;
      }
      return `
      <div class="dsa-list-item">
        <div class="dsa-item-left">
          <span class="dsa-meta-badge ${diffClass}">${q.difficulty || "Med"}</span>
          <div class="dsa-item-title-col">
            <span class="dsa-item-title" title="${q.title}">#${q.id}. ${q.title}</span>
            <span class="dsa-item-sub">Rev: ${q.revisionCount || 0} \u2022 ${scheduleText}</span>
          </div>
        </div>
        <div class="dsa-item-actions">
          <button class="dsa-btn-secondary dsa-btn-mini" data-action-revise-id="${q.id}">Revise</button>
          <a href="${q.url}" target="_blank" rel="noopener noreferrer" class="dsa-btn-secondary dsa-btn-mini" title="Open in LeetCode">\u2197</a>
        </div>
      </div>
    `;
    }).join("") : `<div style="text-align: center; padding: 24px; color: var(--dsa-text-muted);">No questions match the current filter.</div>`;
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
  function getManageQuestionsViewHTML(library = [], filter = "all", searchQuery = "", settings = {}) {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const questionsWithMeta = library.map((q) => {
      const classification = classifyQuestion(q);
      const isIncluded = isQuestionEligible(q, settings);
      const hasManualOverride = q.manualInclusion === "included" || q.manualInclusion === "excluded" || q.isExcluded === true;
      return {
        question: q,
        classification,
        isIncluded,
        hasManualOverride
      };
    });
    const totalCount = questionsWithMeta.length;
    const dsaCount = questionsWithMeta.filter((item) => item.classification.isDsa).length;
    const nonDsaCount = questionsWithMeta.filter((item) => item.classification.isNonDsa).length;
    const needsReviewCount = questionsWithMeta.filter((item) => item.classification.needsReview).length;
    const excludedCount = questionsWithMeta.filter((item) => !item.isIncluded).length;
    const includedCount = questionsWithMeta.filter((item) => item.isIncluded).length;
    let filtered = questionsWithMeta.filter((item) => {
      const q = item.question;
      if (normalizedQuery) {
        const matchId = String(q.id).includes(normalizedQuery);
        const matchTitle = (q.title || "").toLowerCase().includes(normalizedQuery);
        const matchTopics = (q.topics || []).some((t) => String(t).toLowerCase().includes(normalizedQuery));
        if (!matchId && !matchTitle && !matchTopics) return false;
      }
      if (filter === "dsa") return item.classification.isDsa;
      if (filter === "nondsa") return item.classification.isNonDsa;
      if (filter === "needs_review") return item.classification.needsReview;
      if (filter === "excluded") return !item.isIncluded;
      if (filter === "included") return item.isIncluded;
      return true;
    });
    const filterButtons = [
      { id: "all", label: `All (${totalCount})` },
      { id: "dsa", label: `DSA (${dsaCount})` },
      { id: "nondsa", label: `Non-DSA (${nonDsaCount})` },
      { id: "needs_review", label: `Needs Review (${needsReviewCount})` },
      { id: "included", label: `Included (${includedCount})` },
      { id: "excluded", label: `Excluded (${excludedCount})` }
    ].map((b) => `<button class="dsa-filter-btn ${filter === b.id ? "active" : ""}" data-manage-filter="${b.id}">${b.label}</button>`).join("");
    const rowsHTML = filtered.length > 0 ? filtered.map((item) => {
      const q = item.question;
      const diffClass = q.difficulty === "Easy" ? "dsa-diff-easy" : q.difficulty === "Hard" ? "dsa-diff-hard" : "dsa-diff-medium";
      const topicsHTML = (q.topics || []).length > 0 ? (q.topics || []).slice(0, 3).map((t) => `<span class="dsa-topic-tag">${t}</span>`).join("") : '<span class="dsa-topic-tag" style="color: #B45309;">No tags</span>';
      let catBadge = "";
      if (item.classification.isDsa) {
        catBadge = `<span class="dsa-cat-badge dsa-cat-dsa">\u{1F7E2} DSA</span>`;
      } else if (item.classification.isNonDsa) {
        catBadge = `<span class="dsa-cat-badge dsa-cat-nondsa">\u{1F534} Non-DSA</span>`;
      } else {
        catBadge = `<span class="dsa-cat-badge dsa-cat-review" title="${item.classification.reason}">\u26A0\uFE0F Needs Review</span>`;
      }
      let overrideBadge = "";
      if (item.hasManualOverride) {
        overrideBadge = `<span style="font-size: 10px; font-weight: 700; color: var(--dsa-purple-start); margin-left: 4px;" title="Manually overridden by user">(Manual)</span>`;
      }
      return `
      <div class="dsa-list-item" style="padding: 10px 12px;">
        <div class="dsa-item-left" style="flex: 1; min-width: 0;">
          <label class="dsa-switch" title="Toggle inclusion in revision">
            <input type="checkbox" class="dsa-toggle-include" data-question-id="${q.id}" ${item.isIncluded ? "checked" : ""} />
            <span class="dsa-slider"></span>
          </label>
          <div class="dsa-item-title-col" style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span class="dsa-item-title" title="${q.title}">#${q.id}. ${q.title}</span>
              ${catBadge}
              ${overrideBadge}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px; flex-wrap: wrap;">
              <span class="dsa-meta-badge ${diffClass}" style="padding: 1px 5px; font-size: 10px;">${q.difficulty || "Med"}</span>
              <span style="font-size: 11px; color: ${item.isIncluded ? "var(--dsa-easy-text)" : "var(--dsa-hard-text)"}; font-weight: 600;">
                ${item.isIncluded ? "\u2713 Included" : "\u2715 Excluded"}
              </span>
              <span style="color: #CBD5E1;">\u2022</span>
              <span style="font-size: 11px; color: var(--dsa-text-muted);">${q.status === "solved" ? "Solved" : "Attempted"}</span>
              <span style="color: #CBD5E1;">\u2022</span>
              <div style="display: inline-flex; gap: 4px;">${topicsHTML}</div>
            </div>
          </div>
        </div>
        <div class="dsa-item-actions">
          <a href="${q.url}" target="_blank" rel="noopener noreferrer" class="dsa-btn-secondary dsa-btn-mini" title="Open in LeetCode">\u2197</a>
        </div>
      </div>
    `;
    }).join("") : `<div style="text-align: center; padding: 24px; color: var(--dsa-text-muted);">No questions match the current filter.</div>`;
    return `
    <div class="dsa-section-card" style="padding: 12px 14px; margin-bottom: 2px;">
      <div style="font-size: 13.5px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 4px;">
        \u{1F3AF} Manage Revision Questions
      </div>
      <div style="font-size: 12px; color: var(--dsa-text-muted); margin-bottom: 8px;">
        Review synced questions, inspect topic classifications, and toggle whether each question is included or excluded from daily revision.
      </div>
      <div class="dsa-manage-stats">
        <span class="dsa-stat-chip">\u2728 ${dsaCount} DSA</span>
        <span class="dsa-stat-chip">\u{1F534} ${nonDsaCount} Non-DSA</span>
        <span class="dsa-stat-chip">\u26A0\uFE0F ${needsReviewCount} Needs Review</span>
        <span class="dsa-stat-chip">\u{1F6AB} ${excludedCount} Excluded</span>
      </div>
    </div>

    <div class="dsa-search-bar">
      <input type="text" class="dsa-input" id="dsa-manage-search" placeholder="Search by title, number, or tag..." value="${searchQuery}" />
    </div>

    <div class="dsa-filter-row">
      ${filterButtons}
    </div>

    <div class="dsa-question-list" style="max-height: 380px;">
      ${rowsHTML}
    </div>
  `;
  }
  function getScheduleViewHTML(library = []) {
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
    const renderGroup = (title, items, badgeClass = "") => {
      if (items.length === 0) return "";
      return `
      <div style="margin-bottom: 14px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--dsa-text-main); margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
          <span>${title}</span>
          <span style="font-size: 11px; background: #F1F5F9; padding: 2px 7px; border-radius: 9999px;">${items.length}</span>
        </div>
        <div class="dsa-question-list" style="max-height: 180px;">
          ${items.map((q) => `
            <div class="dsa-list-item">
              <span class="dsa-item-title">#${q.id}. ${q.title}</span>
              <span style="font-size: 11.5px; font-weight: 600; color: var(--dsa-purple-start);">${formatFriendlyDate(q.nextRevisionDate)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    };
    return `
    <div class="dsa-section-card">
      <div class="dsa-section-title">\u{1F4C5} Spaced Repetition Calendar</div>
      <div class="dsa-section-desc">Upcoming questions scheduled for revision by due date.</div>
      
      ${overdue.length > 0 ? renderGroup("\u26A0\uFE0F Overdue Revisions", overdue) : ""}
      ${dueToday.length > 0 ? renderGroup("\u23F0 Due Today", dueToday) : ""}
      ${next7Days.length > 0 ? renderGroup("\u{1F5D3}\uFE0F Next 7 Days", next7Days) : ""}
      ${later.length > 0 ? renderGroup("\u23F3 Later On", later) : ""}
      ${overdue.length === 0 && dueToday.length === 0 && next7Days.length === 0 && later.length === 0 ? '<div style="text-align: center; color: var(--dsa-text-muted); padding: 20px;">No scheduled revisions found. Start a revision session to schedule questions!</div>' : ""}
    </div>
  `;
  }
  function getHistoryViewHTML(history2 = []) {
    if (history2.length === 0) {
      return `
      <div class="dsa-section-card" style="text-align: center; padding: 30px 20px; color: var(--dsa-text-muted);">
        <div style="font-size: 28px; margin-bottom: 8px;">\u{1F4DC}</div>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">No Revision History Yet</div>
        <div style="font-size: 12px;">Completed revisions will be logged here with timestamps and feedback ratings.</div>
      </div>
    `;
    }
    const feedbackEmoji = { easy: "\u{1F7E2} Easy (+15d)", hint: "\u{1F7E1} Hint (+7d)", hard: "\u{1F534} Solution" };
    return `
    <div class="dsa-section-card">
      <div class="dsa-section-title">\u{1F4DC} Completed Revision Log</div>
      <div class="dsa-section-desc">Showing past revisions and spaced repetition feedback.</div>
      <div class="dsa-history-list" style="max-height: 420px; overflow-y: auto;">
        ${history2.map((h) => `
          <div class="dsa-history-row">
            <div>
              <div style="font-size: 13px; font-weight: 600; color: var(--dsa-text-main);">#${h.id} ${h.title || ""}</div>
              <div style="font-size: 11px; color: var(--dsa-text-muted);">Revised on ${h.date} \u2022 Next: ${h.nextRevisionDate}</div>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; padding: 4px 8px; border-radius: 6px; background: #F1F5F9; color: var(--dsa-text-main);">
              ${feedbackEmoji[h.feedback] || h.feedback}
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  }
  function getSettingsViewHTML(settings, syncMeta, toast = null) {
    const targetOptions = [1, 2, 3, 5, 6, 10];
    const isCustomTarget = !targetOptions.includes(settings.dailyTarget);
    const currentSource = settings.questionSource || "dsa_only";
    const customTopics = Array.isArray(settings.customTopics) ? settings.customTopics : CANONICAL_DSA_TOPICS;
    const toastHTML = toast ? `<div class="dsa-toast dsa-toast-${toast.type}">${toast.message}</div>` : "";
    return `
    ${toastHTML}

    <!-- 0. Revision Question Sources -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Revision Question Sources
      </div>
      <div class="dsa-section-desc">
        Choose which types of solved problems are eligible for your daily revision sessions.
      </div>
      
      <div class="dsa-source-selector">
        <label class="dsa-source-option ${currentSource === "dsa_only" ? "active" : ""}">
          <input type="radio" name="dsa-source-radio" value="dsa_only" class="dsa-source-radio" ${currentSource === "dsa_only" ? "checked" : ""}>
          <div class="dsa-source-info">
            <span class="dsa-source-title">DSA Only (Default)</span>
            <span class="dsa-source-desc">Excludes SQL, Database, Pandas, Shell, and other non-DSA problems. Questions needing review remain excluded unless manually enabled.</span>
          </div>
        </label>

        <label class="dsa-source-option ${currentSource === "all" ? "active" : ""}">
          <input type="radio" name="dsa-source-radio" value="all" class="dsa-source-radio" ${currentSource === "all" ? "checked" : ""}>
          <div class="dsa-source-info">
            <span class="dsa-source-title">All Solved Questions</span>
            <span class="dsa-source-desc">Includes every solved question in your library, regardless of category (unless individually excluded).</span>
          </div>
        </label>

        <label class="dsa-source-option ${currentSource === "custom" ? "active" : ""}">
          <input type="radio" name="dsa-source-radio" value="custom" class="dsa-source-radio" ${currentSource === "custom" ? "checked" : ""}>
          <div class="dsa-source-info">
            <span class="dsa-source-title">Custom Topics</span>
            <span class="dsa-source-desc">Select or deselect specific DSA topics to practice in your daily revision sessions.</span>
          </div>
        </label>
      </div>

      ${currentSource === "custom" ? `
        <div class="dsa-custom-topics-box">
          <div class="dsa-topics-header">
            <span style="font-size: 12px; font-weight: 700; color: var(--dsa-text-main);">
              Selected Topics (${customTopics.length} / ${CANONICAL_DSA_TOPICS.length})
            </span>
            <div style="display: flex; gap: 6px;">
              <button class="dsa-btn-secondary" id="dsa-btn-select-all-topics" style="font-size: 11px; padding: 3px 8px;">Select All</button>
              <button class="dsa-btn-secondary" id="dsa-btn-deselect-all-topics" style="font-size: 11px; padding: 3px 8px;">Deselect All</button>
            </div>
          </div>
          <div class="dsa-topics-grid">
            ${CANONICAL_DSA_TOPICS.map((topic) => {
      const isChecked = customTopics.includes(topic);
      return `
                <label class="dsa-topic-chip">
                  <input type="checkbox" class="dsa-custom-topic-check" data-topic="${topic}" ${isChecked ? "checked" : ""} />
                  <span>${topic}</span>
                </label>
              `;
    }).join("")}
          </div>
        </div>
      ` : ""}
    </div>

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
        Last synchronized: <strong>${syncMeta.lastSyncedAt ? new Date(syncMeta.lastSyncedAt).toLocaleString() : "Never"}</strong>
        ${syncMeta.username ? ` \u2022 Account: <strong>@${syncMeta.username}</strong>` : ""}
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
      <div class="dsa-section-title">\u{1F4C2} Import & Export Backup</div>
      <div class="dsa-section-desc">
        Import your solved questions manually via CSV or JSON, or download a full backup of your revision history.
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <input type="file" id="dsa-file-import" accept=".csv,.json" style="display: none;" />
        <button class="dsa-btn-secondary" id="dsa-btn-trigger-import">\u{1F4E5} Import CSV / JSON</button>
        <button class="dsa-btn-secondary" id="dsa-btn-download-csv-sample">\u{1F4C4} Sample CSV</button>
        <button class="dsa-btn-secondary" id="dsa-btn-export-csv">\u{1F4E4} Export CSV</button>
        <button class="dsa-btn-secondary" id="dsa-btn-export-json">\u{1F4BE} Backup JSON</button>
      </div>
    </div>

    <!-- 3. Daily Target Configuration -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">\u{1F3AF} Daily Target Goal</div>
      <div class="dsa-section-desc">Choose how many DSA questions you want to revise each day.</div>
      <div class="dsa-target-selector">
        ${targetOptions.map((num) => `
          <button class="dsa-target-pill ${settings.dailyTarget === num ? "active" : ""}" data-target="${num}">${num} / day</button>
        `).join("")}
        <button class="dsa-target-pill ${isCustomTarget ? "active" : ""}" data-target="custom">Custom</button>
      </div>
      ${isCustomTarget ? `
        <div style="margin-top: 10px; display: flex; gap: 8px; align-items: center;">
          <input type="number" id="dsa-custom-target-input" class="dsa-input" style="max-width: 100px;" value="${settings.dailyTarget}" min="1" max="50" />
          <button class="dsa-btn-secondary" id="dsa-btn-save-custom-target">Save</button>
        </div>
      ` : ""}
    </div>

    <!-- 4. Spaced Repetition Intervals -->
    <div class="dsa-section-card">
      <div class="dsa-section-title">\u23F1\uFE0F Spaced Repetition Intervals (Days)</div>
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
      <div class="dsa-section-title">\u{1F9EA} Testing Utilities</div>
      <div class="dsa-section-desc">Instantly test the daily reset or restore initial starter questions.</div>
      <div style="display: flex; gap: 8px;">
        <button class="dsa-btn-secondary" id="dsa-btn-reset-daily">Reset Today's Progress</button>
      </div>
    </div>
  `;
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
    showInvitation: true,
    questionSource: "dsa_only",
    customTopics: CANONICAL_DSA_TOPICS
  };
  function calculateNextRevision(feedback, currentRevisionCount = 0, options = {}) {
    const settings = options.settings || DEFAULT_SETTINGS;
    const todayStr = options.todayStr || getTodayDateString();
    let daysToAdd = 15;
    if (feedback === "easy") {
      daysToAdd = settings.intervals?.easy ?? 15;
    } else if (feedback === "hint") {
      daysToAdd = settings.intervals?.hint ?? 7;
    } else if (feedback === "hard") {
      daysToAdd = options.customIntervalDays ?? (settings.intervals?.hard ?? 4);
    }
    const nextRevisionDate = addDays(todayStr, daysToAdd);
    return {
      feedback,
      daysToAdd,
      nextRevisionDate,
      lastRevisionDate: todayStr,
      revisionCount: currentRevisionCount + 1
    };
  }
  function getDueQuestions(library = [], todayStr = getTodayDateString(), settings = DEFAULT_SETTINGS) {
    return library.filter((q) => {
      if (!q || !q.nextRevisionDate) return false;
      if (!isQuestionEligible(q, settings)) return false;
      return isDueOrOverdue(q.nextRevisionDate, todayStr);
    });
  }
  function selectNextQuestion(library = [], completedTodayIds = [], options = {}) {
    const allowRepeats = options.allowRepeatsToday || false;
    const todayStr = options.todayStr || getTodayDateString();
    const settings = options.settings || DEFAULT_SETTINGS;
    if (!Array.isArray(library) || library.length === 0) {
      return {
        question: null,
        reason: "library_empty",
        stats: { total: 0, dueCount: 0, remainingEligible: 0 }
      };
    }
    const eligibleQuestions = library.filter((q) => isQuestionEligible(q, settings));
    if (eligibleQuestions.length === 0) {
      return {
        question: null,
        reason: "no_eligible_questions",
        stats: { total: library.length, dueCount: 0, remainingEligible: 0 }
      };
    }
    let eligiblePool = eligibleQuestions.filter((q) => q && (q.status === "solved" || !q.status));
    if (eligiblePool.length === 0) {
      eligiblePool = [...eligibleQuestions];
    }
    const uncompletedPool = allowRepeats ? eligiblePool : eligiblePool.filter((q) => !completedTodayIds.includes(String(q.id)));
    const dueQuestions = uncompletedPool.filter((q) => q.nextRevisionDate && isDueOrOverdue(q.nextRevisionDate, todayStr));
    if (dueQuestions.length > 0) {
      dueQuestions.sort((a, b) => {
        if (a.nextRevisionDate !== b.nextRevisionDate) {
          return a.nextRevisionDate.localeCompare(b.nextRevisionDate);
        }
        const aLast = a.lastRevisionDate || "";
        const bLast = b.lastRevisionDate || "";
        if (aLast !== bLast) return aLast.localeCompare(bLast);
        return (a.revisionCount || 0) - (b.revisionCount || 0);
      });
      const isOverdue = getDaysDifference(dueQuestions[0].nextRevisionDate, todayStr) < 0;
      return {
        question: dueQuestions[0],
        reason: isOverdue ? "overdue" : "due",
        stats: {
          total: library.length,
          dueCount: dueQuestions.length,
          remainingEligible: uncompletedPool.length
        }
      };
    }
    if (uncompletedPool.length > 0) {
      const unrevisedQuestions = uncompletedPool.filter((q) => (!q.revisionCount || q.revisionCount === 0) && !q.lastRevisionDate && !q.nextRevisionDate);
      if (unrevisedQuestions.length > 0) {
        const randomIndex2 = Math.floor(Math.random() * unrevisedQuestions.length);
        return {
          question: unrevisedQuestions[randomIndex2],
          reason: "unrevised",
          stats: {
            total: library.length,
            dueCount: 0,
            remainingEligible: uncompletedPool.length
          }
        };
      }
      const randomIndex = Math.floor(Math.random() * uncompletedPool.length);
      return {
        question: uncompletedPool[randomIndex],
        reason: "fresh_practice",
        stats: {
          total: library.length,
          dueCount: 0,
          remainingEligible: uncompletedPool.length
        }
      };
    }
    return {
      question: null,
      reason: "all_completed_today",
      stats: {
        total: library.length,
        dueCount: 0,
        remainingEligible: 0
      }
    };
  }

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
      },
      questionSource: settings?.questionSource || DEFAULT_SETTINGS.questionSource || "dsa_only",
      customTopics: Array.isArray(settings?.customTopics) ? settings.customTopics : DEFAULT_SETTINGS.customTopics
    };
  }
  async function saveSettings(newSettings) {
    const current = await getSettings();
    const merged = {
      ...current,
      ...newSettings,
      intervals: {
        ...current.intervals,
        ...newSettings.intervals || {}
      },
      questionSource: newSettings.questionSource !== void 0 ? newSettings.questionSource : current.questionSource,
      customTopics: newSettings.customTopics !== void 0 ? newSettings.customTopics : current.customTopics
    };
    await storageSet(STORAGE_KEYS.SETTINGS, merged);
    return merged;
  }
  async function updateQuestionInclusion(questionId, manualInclusion) {
    const idStr = String(questionId);
    const library = await getLibrary();
    const idx = library.findIndex((q) => String(q.id) === idStr);
    if (idx !== -1) {
      if (manualInclusion === "auto" || !manualInclusion) {
        delete library[idx].manualInclusion;
        delete library[idx].isExcluded;
      } else if (manualInclusion === "excluded") {
        library[idx].manualInclusion = "excluded";
        library[idx].isExcluded = true;
      } else if (manualInclusion === "included") {
        library[idx].manualInclusion = "included";
        library[idx].isExcluded = false;
      }
      await saveLibrary(library);
    }
    return library;
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
  async function saveDailyProgress(progress) {
    await storageSet(STORAGE_KEYS.PROGRESS, progress);
  }
  async function getHistory() {
    const history2 = await storageGet(STORAGE_KEYS.HISTORY);
    return Array.isArray(history2) ? history2 : [];
  }
  async function appendHistory(entry) {
    const history2 = await getHistory();
    history2.unshift({
      timestamp: Date.now(),
      date: getTodayDateString(),
      ...entry
    });
    const trimmed = history2.slice(0, 500);
    await storageSet(STORAGE_KEYS.HISTORY, trimmed);
    return trimmed;
  }
  async function markQuestionCompleted(questionId, feedback, options = {}) {
    const idStr = String(questionId);
    const library = await getLibrary();
    const qIndex = library.findIndex((q) => String(q.id) === idStr);
    const settings = await getSettings();
    const progress = await getDailyProgress();
    const question = qIndex !== -1 ? library[qIndex] : null;
    const currentCount = question?.revisionCount || 0;
    const nextSchedule = calculateNextRevision(feedback, currentCount, {
      customIntervalDays: options.customIntervalDays,
      settings
    });
    const historyEntry = {
      date: nextSchedule.lastRevisionDate,
      feedback: nextSchedule.feedback,
      nextRevisionDate: nextSchedule.nextRevisionDate,
      timestamp: Date.now()
    };
    const updatedQuestion = question ? {
      ...question,
      revisionCount: nextSchedule.revisionCount,
      lastRevisionDate: nextSchedule.lastRevisionDate,
      previousFeedback: nextSchedule.feedback,
      nextRevisionDate: nextSchedule.nextRevisionDate,
      history: [historyEntry, ...question.history || []]
    } : {
      id: idStr,
      title: `Problem ${idStr}`,
      revisionCount: nextSchedule.revisionCount,
      lastRevisionDate: nextSchedule.lastRevisionDate,
      previousFeedback: nextSchedule.feedback,
      nextRevisionDate: nextSchedule.nextRevisionDate,
      history: [historyEntry]
    };
    if (qIndex !== -1) {
      library[qIndex] = updatedQuestion;
    } else {
      library.push(updatedQuestion);
    }
    await saveLibrary(library);
    if (!progress.completedQuestionIds.includes(idStr)) {
      progress.completedQuestionIds.push(idStr);
      progress.completedCount += 1;
      await saveDailyProgress(progress);
    }
    await appendHistory({
      id: idStr,
      title: updatedQuestion.title,
      difficulty: updatedQuestion.difficulty || "Medium",
      feedback: nextSchedule.feedback,
      nextRevisionDate: nextSchedule.nextRevisionDate,
      daysAdded: nextSchedule.daysToAdd
    });
    return {
      updatedQuestion,
      progress,
      nextSchedule
    };
  }
  async function getInvitationState() {
    const today = getTodayDateString();
    const raw = await storageGet(STORAGE_KEYS.INVITATION);
    if (!raw || isMidnightCrossed(raw.date, today)) {
      const fresh = { date: today, dismissed: false };
      await storageSet(STORAGE_KEYS.INVITATION, fresh);
      return fresh;
    }
    return raw;
  }
  async function dismissInvitationToday() {
    const today = getTodayDateString();
    await storageSet(STORAGE_KEYS.INVITATION, { date: today, dismissed: true });
  }
  async function shouldShowInvitationToday() {
    const settings = await getSettings();
    if (settings.showInvitation === false) return false;
    const invState = await getInvitationState();
    if (invState.dismissed) return false;
    const progress = await getDailyProgress();
    if (progress.completedCount >= progress.target) {
      return false;
    }
    return true;
  }
  async function getSyncMeta() {
    const meta = await storageGet(STORAGE_KEYS.SYNC_META);
    return meta || { lastSyncedAt: null, totalCount: 0, username: null };
  }
  async function updateSyncMeta(meta) {
    const current = await getSyncMeta();
    await storageSet(STORAGE_KEYS.SYNC_META, { ...current, ...meta });
  }
  async function resetDailyProgressForTesting() {
    const settings = await getSettings();
    const today = getTodayDateString();
    await saveDailyProgress({
      date: today,
      completedCount: 0,
      completedQuestionIds: [],
      target: settings.dailyTarget || 3
    });
    await storageSet(STORAGE_KEYS.INVITATION, { date: today, dismissed: false });
  }

  // src/services/importExport.js
  function slugifyTitle(title) {
    if (!title) return "";
    return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
  }
  function normalizeDifficulty(diff) {
    if (!diff) return "Medium";
    const lower = String(diff).toLowerCase().trim();
    if (lower.startsWith("e")) return "Easy";
    if (lower.startsWith("h")) return "Hard";
    return "Medium";
  }
  function normalizeTopics(topics) {
    if (Array.isArray(topics)) {
      return topics.map((t) => typeof t === "object" && t ? t.name || t.slug || "" : String(t)).filter(Boolean);
    }
    if (typeof topics === "string") {
      return topics.split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
    }
    return [];
  }
  function parseCSV(text) {
    const lines = [];
    let currentLine = [];
    let currentField = "";
    let insideQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentField += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        currentLine.push(currentField.trim());
        currentField = "";
      } else if ((char === "\r" || char === "\n") && !insideQuotes) {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        currentLine.push(currentField.trim());
        if (currentLine.some((field) => field.length > 0)) {
          lines.push(currentLine);
        }
        currentLine = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
    if (currentField.length > 0 || currentLine.length > 0) {
      currentLine.push(currentField.trim());
      if (currentLine.some((field) => field.length > 0)) {
        lines.push(currentLine);
      }
    }
    return lines;
  }
  function importFromCSV(csvString) {
    const errors = [];
    const questions = [];
    if (!csvString || typeof csvString !== "string" || !csvString.trim()) {
      errors.push("CSV content is empty.");
      return { questions, errors };
    }
    const rows = parseCSV(csvString);
    if (rows.length < 2) {
      errors.push("CSV must contain a header row and at least one data row.");
      return { questions, errors };
    }
    const headerRow = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
    const idIdx = headerRow.findIndex((h) => h === "id" || h === "problemid" || h === "number" || h === "frontendquestionid");
    const titleIdx = headerRow.findIndex((h) => h === "title" || h === "problemtitle" || h === "name");
    const urlIdx = headerRow.findIndex((h) => h === "url" || h === "link" || h === "problemlink");
    const diffIdx = headerRow.findIndex((h) => h === "difficulty" || h === "diff" || h === "level");
    const topicIdx = headerRow.findIndex((h) => h === "topic" || h === "topics" || h === "tag" || h === "tags");
    const statusIdx = headerRow.findIndex((h) => h === "status" || h === "state" || h === "solved");
    const nextRevIdx = headerRow.findIndex((h) => h === "nextrevisiondate" || h === "nextdue" || h === "duedate");
    const revCountIdx = headerRow.findIndex((h) => h === "revisioncount" || h === "revisions" || h === "count");
    if (idIdx === -1 && titleIdx === -1 && urlIdx === -1) {
      errors.push("Could not find Problem ID, Title, or URL column in CSV header.");
      return { questions, errors };
    }
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length === 0 || row.every((cell) => !cell)) continue;
      let rawId = idIdx !== -1 ? row[idIdx] : "";
      let rawTitle = titleIdx !== -1 ? row[titleIdx] : "";
      let rawUrl = urlIdx !== -1 ? row[urlIdx] : "";
      let rawDiff = diffIdx !== -1 ? row[diffIdx] : "Medium";
      let rawTopics = topicIdx !== -1 ? row[topicIdx] : "";
      let rawStatus = statusIdx !== -1 ? row[statusIdx] : "solved";
      let rawNextRev = nextRevIdx !== -1 ? row[nextRevIdx] : null;
      let rawRevCount = revCountIdx !== -1 ? parseInt(row[revCountIdx], 10) : 0;
      if (!rawId) {
        if (rawUrl) {
          const match = rawUrl.match(/problems\/([^/]+)/);
          if (match) rawId = match[1];
        }
        if (!rawId && rawTitle) {
          rawId = slugifyTitle(rawTitle);
        }
      }
      if (!rawId) {
        errors.push(`Row ${i + 1}: Skipped row due to missing problem ID or Title.`);
        continue;
      }
      if (!rawTitle) {
        rawTitle = `Problem ${rawId}`;
      }
      if (!rawUrl) {
        rawUrl = `https://leetcode.com/problems/${slugifyTitle(rawTitle)}/`;
      }
      questions.push({
        id: String(rawId).trim(),
        title: String(rawTitle).trim(),
        url: String(rawUrl).trim(),
        difficulty: normalizeDifficulty(rawDiff),
        topics: normalizeTopics(rawTopics),
        status: String(rawStatus).toLowerCase().includes("solv") || String(rawStatus).toLowerCase() === "ac" ? "solved" : "attempted",
        lastRevisionDate: null,
        revisionCount: isNaN(rawRevCount) ? 0 : rawRevCount,
        previousFeedback: null,
        nextRevisionDate: rawNextRev && /^\d{4}-\d{2}-\d{2}$/.test(rawNextRev) ? rawNextRev : null,
        history: []
      });
    }
    return { questions, errors };
  }
  function importFromJSON(jsonData) {
    const errors = [];
    const questions = [];
    let data;
    if (typeof jsonData === "string") {
      try {
        data = JSON.parse(jsonData);
      } catch (e) {
        errors.push(`Invalid JSON: ${e.message}`);
        return { questions, errors };
      }
    } else {
      data = jsonData;
    }
    const rawList = Array.isArray(data) ? data : data && Array.isArray(data.questions) ? data.questions : null;
    if (!rawList) {
      errors.push('Expected a JSON array of questions or an object with a "questions" array.');
      return { questions, errors };
    }
    for (let i = 0; i < rawList.length; i++) {
      const item = rawList[i];
      if (!item || typeof item !== "object") {
        errors.push(`Item ${i + 1}: Invalid item structure.`);
        continue;
      }
      const id = item.id || item.frontendQuestionId || item.questionFrontendId || (item.url ? item.url.match(/problems\/([^/]+)/)?.[1] : null);
      if (!id) {
        errors.push(`Item ${i + 1}: Missing problem ID.`);
        continue;
      }
      const title = item.title || item.problemTitle || `Problem ${id}`;
      const url = item.url || (item.titleSlug ? `https://leetcode.com/problems/${item.titleSlug}/` : `https://leetcode.com/problems/${slugifyTitle(title)}/`);
      const difficulty = normalizeDifficulty(item.difficulty);
      const topics = normalizeTopics(item.topics || item.topicTags);
      const status = item.status === "attempted" ? "attempted" : "solved";
      questions.push({
        id: String(id).trim(),
        title: String(title).trim(),
        url: String(url).trim(),
        difficulty,
        topics,
        status,
        lastRevisionDate: item.lastRevisionDate || null,
        revisionCount: typeof item.revisionCount === "number" ? item.revisionCount : 0,
        previousFeedback: item.previousFeedback || null,
        nextRevisionDate: item.nextRevisionDate || null,
        history: Array.isArray(item.history) ? item.history : []
      });
    }
    return { questions, errors };
  }
  function mergeLibrary(existingLibrary = [], newQuestions = []) {
    const libraryMap = /* @__PURE__ */ new Map();
    for (const q of existingLibrary) {
      if (q && q.id) {
        libraryMap.set(String(q.id), { ...q });
      }
    }
    let addedCount = 0;
    let updatedCount = 0;
    for (const incoming of newQuestions) {
      if (!incoming || !incoming.id) continue;
      const idKey = String(incoming.id);
      if (libraryMap.has(idKey)) {
        const existing = libraryMap.get(idKey);
        libraryMap.set(idKey, {
          ...existing,
          title: incoming.title || existing.title,
          url: incoming.url || existing.url,
          difficulty: incoming.difficulty || existing.difficulty,
          topics: incoming.topics?.length ? incoming.topics : existing.topics,
          status: incoming.status || existing.status,
          // Only override nextRevisionDate if incoming explicitly provided one and existing has none
          nextRevisionDate: existing.nextRevisionDate || incoming.nextRevisionDate || null,
          revisionCount: Math.max(existing.revisionCount || 0, incoming.revisionCount || 0),
          lastRevisionDate: existing.lastRevisionDate || incoming.lastRevisionDate || null,
          history: existing.history?.length ? existing.history : incoming.history || []
        });
        updatedCount++;
      } else {
        libraryMap.set(idKey, { ...incoming });
        addedCount++;
      }
    }
    return {
      mergedLibrary: Array.from(libraryMap.values()),
      addedCount,
      updatedCount
    };
  }
  function exportToCSV(library = []) {
    const headers = ["Problem ID", "Title", "URL", "Difficulty", "Topics", "Status", "Revision Count", "Last Revision Date", "Next Due Date"];
    const rows = [headers.join(",")];
    for (const q of library) {
      if (!q) continue;
      const escape = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;
      const row = [
        escape(q.id),
        escape(q.title),
        escape(q.url),
        escape(q.difficulty),
        escape(Array.isArray(q.topics) ? q.topics.join("; ") : q.topics),
        escape(q.status || "solved"),
        q.revisionCount || 0,
        escape(q.lastRevisionDate || ""),
        escape(q.nextRevisionDate || "")
      ];
      rows.push(row.join(","));
    }
    return rows.join("\r\n");
  }
  function exportToJSON(library = [], extraData = {}) {
    const exportPayload = {
      version: "1.0.0",
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      totalQuestions: library.length,
      questions: library,
      ...extraData
    };
    return JSON.stringify(exportPayload, null, 2);
  }
  function getSampleCSVTemplate() {
    return [
      "Problem ID,Title,URL,Difficulty,Topics,Status",
      "1,Two Sum,https://leetcode.com/problems/two-sum/,Easy,Array; Hash Table,solved",
      "206,Reverse Linked List,https://leetcode.com/problems/reverse-linked-list/,Easy,Linked List; Recursion,solved",
      "3,Longest Substring Without Repeating Characters,https://leetcode.com/problems/longest-substring-without-repeating-characters/,Medium,Hash Table; Sliding Window,solved",
      "42,Trapping Rain Water,https://leetcode.com/problems/trapping-rain-water/,Hard,Array; Two Pointers; Stack,solved"
    ].join("\r\n");
  }

  // src/services/leetcodeSync.js
  var LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";
  function getCsrfTokenFromCookie() {
    if (typeof document === "undefined" || !document.cookie) return null;
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
  }
  async function checkLeetCodeUserStatus(options = {}) {
    const fetchImpl = options.fetchFn || fetch;
    const csrf = options.csrfToken || getCsrfTokenFromCookie();
    const query = `
    query userStatus {
      userStatus {
        isSignedIn
        username
        realName
        avatar
      }
    }
  `;
    try {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };
      if (csrf) {
        headers["x-csrftoken"] = csrf;
      }
      const response = await fetchImpl(LEETCODE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ query })
      });
      if (!response.ok) {
        return {
          isSignedIn: false,
          username: null,
          error: `LeetCode responded with HTTP status ${response.status} (${response.statusText}).`
        };
      }
      const json = await response.json();
      const userStatus = json?.data?.userStatus;
      if (!userStatus) {
        return {
          isSignedIn: false,
          username: null,
          error: "Unable to parse user status from LeetCode response."
        };
      }
      return {
        isSignedIn: Boolean(userStatus.isSignedIn),
        username: userStatus.username || null,
        error: null
      };
    } catch (err) {
      return {
        isSignedIn: false,
        username: null,
        error: err.message || "Network error connecting to LeetCode."
      };
    }
  }
  async function fetchSolvedQuestionsBatch(skip = 0, limit = 50, options = {}) {
    const fetchImpl = options.fetchFn || fetch;
    const csrf = options.csrfToken || getCsrfTokenFromCookie();
    const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          frontendQuestionId: questionFrontendId
          title
          titleSlug
          difficulty
          topicTags {
            name
            slug
          }
          status
        }
      }
    }
  `;
    const variables = {
      categorySlug: "",
      skip,
      limit,
      filters: {
        status: "AC"
      }
    };
    try {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };
      if (csrf) {
        headers["x-csrftoken"] = csrf;
      }
      const response = await fetchImpl(LEETCODE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ query, variables })
      });
      if (!response.ok) {
        return {
          questions: [],
          total: 0,
          hasMore: false,
          error: `LeetCode API error: HTTP ${response.status}`
        };
      }
      const json = await response.json();
      if (json.errors && json.errors.length > 0) {
        return {
          questions: [],
          total: 0,
          hasMore: false,
          error: json.errors[0]?.message || "GraphQL error returned by LeetCode"
        };
      }
      const data = json?.data?.problemsetQuestionList;
      if (!data) {
        return {
          questions: [],
          total: 0,
          hasMore: false,
          error: "No question data in LeetCode response."
        };
      }
      const total = data.total || 0;
      const rawList = data.questions || [];
      const mapped = rawList.map((q) => {
        const id = q.frontendQuestionId || q.questionFrontendId || q.id || "";
        return {
          id: String(id).trim(),
          title: q.title || `Problem ${id}`,
          url: q.url || (q.titleSlug ? `https://leetcode.com/problems/${q.titleSlug}/` : `https://leetcode.com/problems/${id}/`),
          difficulty: normalizeDifficulty(q.difficulty),
          topics: normalizeTopics(q.topicTags),
          status: "solved",
          lastRevisionDate: null,
          revisionCount: 0,
          previousFeedback: null,
          nextRevisionDate: null,
          history: []
        };
      }).filter((q) => Boolean(q.id));
      return {
        questions: mapped,
        total,
        hasMore: skip + limit < total && rawList.length > 0,
        error: null
      };
    } catch (err) {
      return {
        questions: [],
        total: 0,
        hasMore: false,
        error: err.message || "Failed to fetch solved questions."
      };
    }
  }
  async function syncLeetCodeSolvedQuestions(options = {}) {
    const onProgress = options.onProgress || (() => {
    });
    const maxTotal = options.maxTotalQuestions || 1e3;
    onProgress({ phase: "auth_check", message: "Checking LeetCode login status..." });
    const status = await checkLeetCodeUserStatus(options);
    if (status.error) {
      return {
        success: false,
        questions: [],
        username: null,
        message: `Could not verify LeetCode session: ${status.error}. Please ensure you are logged into LeetCode or import via CSV/JSON.`
      };
    }
    if (!status.isSignedIn) {
      return {
        success: false,
        questions: [],
        username: null,
        message: "You are currently not signed in to LeetCode. Please log into your LeetCode account at leetcode.com, or use the CSV/JSON manual import fallback."
      };
    }
    onProgress({
      phase: "fetching",
      message: `Logged in as @${status.username}. Fetching solved problems...`,
      username: status.username
    });
    const allFetched = [];
    let skip = 0;
    const limit = 50;
    let hasMore = true;
    let batchCount = 0;
    while (hasMore && allFetched.length < maxTotal) {
      batchCount++;
      onProgress({
        phase: "fetching_batch",
        message: `Fetching problems ${skip + 1} - ${skip + limit}...`,
        count: allFetched.length
      });
      const batch = await fetchSolvedQuestionsBatch(skip, limit, options);
      if (batch.error) {
        if (allFetched.length > 0) {
          break;
        }
        return {
          success: false,
          questions: [],
          username: status.username,
          message: `LeetCode API error while syncing: ${batch.error}. Please try again later or use CSV import.`
        };
      }
      if (batch.questions.length === 0) {
        break;
      }
      allFetched.push(...batch.questions);
      skip += limit;
      hasMore = batch.hasMore;
      if (batchCount > 50) break;
    }
    return {
      success: true,
      questions: allFetched,
      username: status.username,
      message: `Successfully synchronized ${allFetched.length} solved questions from @${status.username}'s LeetCode account!`
    };
  }

  // src/app.js
  var RevisionApp = class {
    /**
     * @param {HTMLElement|ShadowRoot} rootElement 
     * @param {object} [options]
     * @param {boolean} [options.isPopup=false] 
     */
    constructor(rootElement, options = {}) {
      this.root = rootElement;
      this.isPopup = Boolean(options.isPopup);
      this.activeTab = "revision";
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
      this.libraryFilter = "all";
      this.librarySearch = "";
      this.manageFilter = "all";
      this.manageSearch = "";
      this.toast = null;
      this.isModalOpen = this.isPopup;
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
      const styleEl = document.createElement("style");
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
      let triggerContainer = this.root.querySelector("#dsa-trigger-wrap");
      if (!triggerContainer) {
        triggerContainer = document.createElement("div");
        triggerContainer.id = "dsa-trigger-wrap";
        this.root.appendChild(triggerContainer);
      }
      const dueCount = getDueQuestions(this.library, void 0, this.settings).length;
      const isCompleted = this.progress.completedCount >= this.progress.target;
      triggerContainer.innerHTML = getFloatingButtonHTML(dueCount, isCompleted);
      const btn = triggerContainer.querySelector("#dsa-floating-trigger");
      if (btn) {
        btn.addEventListener("click", () => this.toggleModal());
      }
      let modalWrap = this.root.querySelector("#dsa-modal-wrap");
      if (!modalWrap) {
        modalWrap = document.createElement("div");
        modalWrap.id = "dsa-modal-wrap";
        this.root.appendChild(modalWrap);
      }
    }
    /**
     * Check and show first-visit daily invitation toast
     */
    async checkAndShowInvitation() {
      const shouldShow = await shouldShowInvitationToday();
      if (!shouldShow) return;
      let toastWrap = this.root.querySelector("#dsa-invitation-wrap");
      if (!toastWrap) {
        toastWrap = document.createElement("div");
        toastWrap.id = "dsa-invitation-wrap";
        this.root.appendChild(toastWrap);
      }
      const dueCount = getDueQuestions(this.library, void 0, this.settings).length;
      toastWrap.innerHTML = getInvitationCardHTML(dueCount, this.progress.target);
      const startBtn = toastWrap.querySelector("#dsa-invitation-start");
      if (startBtn) {
        startBtn.addEventListener("click", async () => {
          await dismissInvitationToday();
          toastWrap.innerHTML = "";
          this.openModal();
          this.startRevisionSession();
        });
      }
      const laterBtn = toastWrap.querySelector("#dsa-invitation-later");
      if (laterBtn) {
        laterBtn.addEventListener("click", async () => {
          await dismissInvitationToday();
          toastWrap.innerHTML = "";
        });
      }
    }
    /**
     * Render in extension Popup mode (full panel view without floating button)
     */
    renderPopupMode() {
      let panelWrap = this.root.querySelector("#dsa-panel-wrap");
      if (!panelWrap) {
        panelWrap = document.createElement("div");
        panelWrap.id = "dsa-panel-wrap";
        panelWrap.className = "dsa-root";
        panelWrap.style.width = "100%";
        panelWrap.style.minWidth = "420px";
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
    openModal(tab = "revision") {
      this.isModalOpen = true;
      this.activeTab = tab;
      const modalWrap = this.root.querySelector("#dsa-modal-wrap");
      if (!modalWrap) return;
      modalWrap.innerHTML = `
      <div class="dsa-modal-backdrop" id="dsa-modal-backdrop">
        <div class="dsa-modal-panel dsa-root" id="dsa-modal-panel"></div>
      </div>
    `;
      const backdrop = modalWrap.querySelector("#dsa-modal-backdrop");
      if (backdrop) {
        backdrop.addEventListener("click", (e) => {
          if (e.target === backdrop) this.closeModal();
        });
      }
      const panel = modalWrap.querySelector("#dsa-modal-panel");
      this.renderModalContent(panel);
    }
    /**
     * Close the revision modal
     */
    closeModal() {
      this.isModalOpen = false;
      const modalWrap = this.root.querySelector("#dsa-modal-wrap");
      if (modalWrap) modalWrap.innerHTML = "";
      if (!this.isPopup) {
        this.renderInjectedMode();
      }
    }
    /**
     * Render the contents of the modal / popup panel
     * @param {HTMLElement} panel 
     */
    renderModalContent(panel = this.root.querySelector("#dsa-modal-panel") || this.root.querySelector("#dsa-panel-wrap")) {
      if (!panel) return;
      const dueCount = getDueQuestions(this.library, void 0, this.settings).length;
      let bodyHTML = "";
      if (this.activeTab === "revision") {
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
      } else if (this.activeTab === "library") {
        bodyHTML = getLibraryViewHTML(this.library, this.libraryFilter, this.librarySearch);
      } else if (this.activeTab === "manage") {
        bodyHTML = getManageQuestionsViewHTML(this.library, this.manageFilter, this.manageSearch, this.settings);
      } else if (this.activeTab === "schedule") {
        bodyHTML = getScheduleViewHTML(this.library);
      } else if (this.activeTab === "history") {
        bodyHTML = getHistoryViewHTML(this.history);
      } else if (this.activeTab === "settings") {
        bodyHTML = getSettingsViewHTML(this.settings, this.syncMeta, this.toast);
      }
      panel.innerHTML = `
      ${getModalHeaderHTML(this.activeTab)}
      <div class="dsa-modal-body" id="dsa-modal-body">
        ${bodyHTML}
      </div>
    `;
      this.attachEventListeners(panel);
      if (this.celebration || this.progress.completedCount >= this.progress.target && !this.currentQuestion && !this.feedbackStep) {
        const canvas = panel.querySelector("#dsa-confetti-canvas");
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
      const closeBtn = panel.querySelector("#dsa-modal-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          if (this.isPopup && typeof window !== "undefined" && window.close) {
            window.close();
          } else {
            this.closeModal();
          }
        });
      }
      const tabBtns = panel.querySelectorAll(".dsa-tab-btn");
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.activeTab = btn.getAttribute("data-tab");
          this.renderModalContent(panel);
        });
      });
      const startSessionBtn = panel.querySelector("#dsa-btn-start-session");
      if (startSessionBtn) {
        startSessionBtn.addEventListener("click", () => this.startRevisionSession());
      }
      const markDoneBtn = panel.querySelector("#dsa-btn-mark-done");
      if (markDoneBtn) {
        markDoneBtn.addEventListener("click", () => {
          this.feedbackStep = true;
          this.renderModalContent(panel);
        });
      }
      const feedbackBtns = panel.querySelectorAll(".dsa-feedback-btn");
      feedbackBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const feedback = btn.getAttribute("data-feedback");
          await this.handleFeedbackSubmit(feedback);
        });
      });
      const hardDayPills = panel.querySelectorAll("[data-set-hard-days]");
      hardDayPills.forEach((pill) => {
        pill.addEventListener("click", (e) => {
          e.stopPropagation();
          this.customHardDays = parseInt(pill.getAttribute("data-set-hard-days"), 10);
          this.renderModalContent(panel);
        });
      });
      const extraPracticeBtn = panel.querySelector("#dsa-btn-extra-practice");
      if (extraPracticeBtn) {
        extraPracticeBtn.addEventListener("click", () => {
          this.celebration = false;
          this.startRevisionSession(true);
        });
      }
      const jumpManageBtn = panel.querySelector("#dsa-btn-jump-manage");
      if (jumpManageBtn) {
        jumpManageBtn.addEventListener("click", () => {
          this.activeTab = "manage";
          this.renderModalContent(panel);
        });
      }
      const jumpSettingsBtn = panel.querySelector("#dsa-btn-jump-settings");
      if (jumpSettingsBtn) {
        jumpSettingsBtn.addEventListener("click", () => {
          this.activeTab = "settings";
          this.renderModalContent(panel);
        });
      }
      const manageSearchInput = panel.querySelector("#dsa-manage-search");
      if (manageSearchInput) {
        manageSearchInput.addEventListener("input", (e) => {
          this.manageSearch = e.target.value;
          this.renderModalContent(panel);
          const newSearch = panel.querySelector("#dsa-manage-search");
          if (newSearch) {
            newSearch.focus();
            newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
          }
        });
      }
      const manageFilterBtns = panel.querySelectorAll("[data-manage-filter]");
      manageFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.manageFilter = btn.getAttribute("data-manage-filter");
          this.renderModalContent(panel);
        });
      });
      const includeToggles = panel.querySelectorAll(".dsa-toggle-include");
      includeToggles.forEach((toggle) => {
        toggle.addEventListener("change", async () => {
          const qId = toggle.getAttribute("data-question-id");
          const isChecked = toggle.checked;
          await updateQuestionInclusion(qId, isChecked ? "included" : "excluded");
          await this.refreshState();
          this.showToast(`Question #${qId} ${isChecked ? "included in" : "excluded from"} revision.`, "info");
          this.renderModalContent(panel);
          if (!this.isPopup) this.renderInjectedMode();
        });
      });
      const searchInput = panel.querySelector("#dsa-library-search");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.librarySearch = e.target.value;
          const listContainer = panel.querySelector(".dsa-question-list");
          if (listContainer) {
            this.renderModalContent(panel);
            const newSearch = panel.querySelector("#dsa-library-search");
            if (newSearch) {
              newSearch.focus();
              newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
            }
          }
        });
      }
      const filterBtns = panel.querySelectorAll(".dsa-filter-btn");
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.libraryFilter = btn.getAttribute("data-filter");
          this.renderModalContent(panel);
        });
      });
      const reviseBtns = panel.querySelectorAll("[data-action-revise-id]");
      reviseBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const qId = btn.getAttribute("data-action-revise-id");
          this.reviseSpecificQuestion(qId);
        });
      });
      const syncBtn = panel.querySelector("#dsa-btn-sync-leetcode");
      if (syncBtn) {
        syncBtn.addEventListener("click", () => this.handleSyncLeetCode(syncBtn));
      }
      const triggerImportBtn = panel.querySelector("#dsa-btn-trigger-import");
      const fileInput = panel.querySelector("#dsa-file-import");
      if (triggerImportBtn && fileInput) {
        triggerImportBtn.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", (e) => this.handleFileImport(e));
      }
      const sampleCsvBtn = panel.querySelector("#dsa-btn-download-csv-sample");
      if (sampleCsvBtn) {
        sampleCsvBtn.addEventListener("click", () => this.downloadFile("sample-dsa-template.csv", getSampleCSVTemplate(), "text/csv"));
      }
      const exportCsvBtn = panel.querySelector("#dsa-btn-export-csv");
      if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", () => this.downloadFile("dsa-revision-library.csv", exportToCSV(this.library), "text/csv"));
      }
      const exportJsonBtn = panel.querySelector("#dsa-btn-export-json");
      if (exportJsonBtn) {
        exportJsonBtn.addEventListener("click", () => this.downloadFile("dsa-revision-backup.json", exportToJSON(this.library, { history: this.history, settings: this.settings }), "application/json"));
      }
      const sourceRadios = panel.querySelectorAll('input[name="dsa-source-radio"]');
      sourceRadios.forEach((radio) => {
        radio.addEventListener("change", async () => {
          if (radio.checked) {
            const newSource = radio.value;
            this.settings.questionSource = newSource;
            await saveSettings({ questionSource: newSource });
            await this.refreshState();
            const sourceLabels = {
              dsa_only: "DSA Only",
              all: "All Solved Questions",
              custom: "Custom Topics"
            };
            this.showToast(`Revision source set to ${sourceLabels[newSource] || newSource}!`, "success");
            this.renderModalContent(panel);
            if (!this.isPopup) this.renderInjectedMode();
          }
        });
      });
      const customTopicChecks = panel.querySelectorAll(".dsa-custom-topic-check");
      customTopicChecks.forEach((ch) => {
        ch.addEventListener("change", async () => {
          const topic = ch.getAttribute("data-topic");
          let activeTopics = Array.isArray(this.settings.customTopics) ? [...this.settings.customTopics] : [...CANONICAL_DSA_TOPICS];
          if (ch.checked) {
            if (!activeTopics.includes(topic)) activeTopics.push(topic);
          } else {
            activeTopics = activeTopics.filter((t) => t !== topic);
          }
          this.settings.customTopics = activeTopics;
          await saveSettings({ customTopics: activeTopics });
          await this.refreshState();
          this.renderModalContent(panel);
          if (!this.isPopup) this.renderInjectedMode();
        });
      });
      const selectAllTopicsBtn = panel.querySelector("#dsa-btn-select-all-topics");
      if (selectAllTopicsBtn) {
        selectAllTopicsBtn.addEventListener("click", async () => {
          this.settings.customTopics = [...CANONICAL_DSA_TOPICS];
          await saveSettings({ customTopics: this.settings.customTopics });
          await this.refreshState();
          this.renderModalContent(panel);
          if (!this.isPopup) this.renderInjectedMode();
        });
      }
      const deselectAllTopicsBtn = panel.querySelector("#dsa-btn-deselect-all-topics");
      if (deselectAllTopicsBtn) {
        deselectAllTopicsBtn.addEventListener("click", async () => {
          this.settings.customTopics = [];
          await saveSettings({ customTopics: [] });
          await this.refreshState();
          this.renderModalContent(panel);
          if (!this.isPopup) this.renderInjectedMode();
        });
      }
      const targetPills = panel.querySelectorAll(".dsa-target-pill");
      targetPills.forEach((pill) => {
        pill.addEventListener("click", async () => {
          const targetVal = pill.getAttribute("data-target");
          if (targetVal === "custom") {
            this.settings.dailyTarget = 5;
            await saveSettings({ dailyTarget: 5 });
          } else {
            const num = parseInt(targetVal, 10);
            this.settings.dailyTarget = num;
            await saveSettings({ dailyTarget: num });
            this.progress.target = num;
          }
          await this.refreshState();
          this.showToast("Daily target updated!", "success");
          this.renderModalContent(panel);
        });
      });
      const customTargetInput = panel.querySelector("#dsa-custom-target-input");
      const saveCustomTargetBtn = panel.querySelector("#dsa-btn-save-custom-target");
      if (saveCustomTargetBtn && customTargetInput) {
        saveCustomTargetBtn.addEventListener("click", async () => {
          const val = parseInt(customTargetInput.value, 10);
          if (val && val > 0 && val <= 50) {
            this.settings.dailyTarget = val;
            await saveSettings({ dailyTarget: val });
            this.progress.target = val;
            await this.refreshState();
            this.showToast(`Custom target set to ${val} questions/day!`, "success");
            this.renderModalContent(panel);
          }
        });
      }
      const saveIntervalsBtn = panel.querySelector("#dsa-btn-save-intervals");
      if (saveIntervalsBtn) {
        saveIntervalsBtn.addEventListener("click", async () => {
          const easyVal = parseInt(panel.querySelector("#dsa-interval-easy")?.value || 15, 10);
          const hintVal = parseInt(panel.querySelector("#dsa-interval-hint")?.value || 7, 10);
          const hardVal = parseInt(panel.querySelector("#dsa-interval-hard")?.value || 4, 10);
          await saveSettings({
            intervals: {
              easy: Math.max(1, easyVal),
              hint: Math.max(1, hintVal),
              hard: Math.max(1, hardVal)
            }
          });
          await this.refreshState();
          this.showToast("Spaced repetition intervals updated!", "success");
          this.renderModalContent(panel);
        });
      }
      const resetDailyBtn = panel.querySelector("#dsa-btn-reset-daily");
      if (resetDailyBtn) {
        resetDailyBtn.addEventListener("click", async () => {
          await resetDailyProgressForTesting();
          this.currentQuestion = null;
          this.feedbackStep = false;
          this.celebration = false;
          await this.refreshState();
          this.showToast("Today's progress reset for testing!", "info");
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
        if (selection.reason === "all_completed_today") {
          this.celebration = true;
        } else if (selection.reason === "no_eligible_questions") {
          this.selectionReason = "no_eligible_questions";
          this.activeTab = "revision";
        } else if (selection.reason === "library_empty") {
          this.showToast("Your library is empty. Please sync or import questions.", "error");
          this.activeTab = "settings";
        }
        this.renderModalContent();
        return;
      }
      this.currentQuestion = selection.question;
      this.selectionReason = selection.reason;
      this.feedbackStep = false;
      this.celebration = false;
      this.activeTab = "revision";
      this.renderModalContent();
    }
    /**
     * Revise a specific question directly from the library explorer
     * @param {string|number} questionId 
     */
    reviseSpecificQuestion(questionId) {
      const q = this.library.find((item) => String(item.id) === String(questionId));
      if (!q) return;
      this.currentQuestion = q;
      this.selectionReason = "manual_pick";
      this.feedbackStep = false;
      this.celebration = false;
      this.activeTab = "revision";
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
      if (this.progress.completedCount >= this.progress.target) {
        this.celebration = true;
      } else {
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
            this.showToast(p.message, "info");
            const toastEl = this.root.querySelector(".dsa-toast");
            if (toastEl) toastEl.textContent = p.message;
          }
        });
        if (result.success) {
          const { mergedLibrary, addedCount, updatedCount } = mergeLibrary(this.library, result.questions);
          await saveLibrary(mergedLibrary);
          await updateSyncMeta({
            lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString(),
            totalCount: mergedLibrary.length,
            username: result.username
          });
          await this.refreshState();
          this.showToast(`Sync successful! Added ${addedCount} new questions, updated ${updatedCount}.`, "success");
        } else {
          this.showToast(result.message, "error");
        }
      } catch (e) {
        this.showToast(`Sync failed: ${e.message}`, "error");
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
        if (typeof text !== "string") return;
        let imported = [];
        let errors = [];
        if (file.name.endsWith(".json") || text.trim().startsWith("{") || text.trim().startsWith("[")) {
          const jsonRes = importFromJSON(text);
          imported = jsonRes.questions;
          errors = jsonRes.errors;
        } else {
          const csvRes = importFromCSV(text);
          imported = csvRes.questions;
          errors = csvRes.errors;
        }
        if (imported.length === 0) {
          this.showToast(`Import failed: ${errors[0] || "No valid questions found in file."}`, "error");
          this.renderModalContent();
          return;
        }
        const { mergedLibrary, addedCount, updatedCount } = mergeLibrary(this.library, imported);
        await saveLibrary(mergedLibrary);
        await this.refreshState();
        this.showToast(`Successfully imported ${imported.length} questions! (+${addedCount} new, ${updatedCount} updated)`, "success");
        this.renderModalContent();
      };
      reader.readAsText(file);
      event.target.value = "";
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
      const link = document.createElement("a");
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
    showToast(message, type = "info") {
      this.toast = { message, type };
    }
  };

  // content/content.js
  var HOST_ELEMENT_ID = "dsa-revision-buddy-host";
  var appInstance = null;
  var shadowRoot = null;
  function initContentScript() {
    let hostEl = document.getElementById(HOST_ELEMENT_ID);
    if (hostEl && shadowRoot && appInstance) {
      return;
    }
    if (!hostEl) {
      hostEl = document.createElement("div");
      hostEl.id = HOST_ELEMENT_ID;
      hostEl.style.position = "fixed";
      hostEl.style.zIndex = "2147483647";
      hostEl.style.pointerEvents = "none";
      (document.body || document.documentElement).appendChild(hostEl);
    }
    if (!shadowRoot) {
      shadowRoot = hostEl.attachShadow({ mode: "open" });
    }
    let appRoot = shadowRoot.getElementById("dsa-shadow-app");
    if (!appRoot) {
      appRoot = document.createElement("div");
      appRoot.id = "dsa-shadow-app";
      appRoot.style.pointerEvents = "auto";
      shadowRoot.appendChild(appRoot);
    }
    appInstance = new RevisionApp(appRoot, { isPopup: false });
    appInstance.init().catch((err) => {
      console.error("[DSA Revision Buddy] Initialization error:", err);
    });
  }
  function setupSPANavigationObserver() {
    const checkMount = () => {
      if (!document.getElementById(HOST_ELEMENT_ID)) {
        initContentScript();
      }
    };
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      const result = originalPushState.apply(this, args);
      setTimeout(checkMount, 100);
      return result;
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      const result = originalReplaceState.apply(this, args);
      setTimeout(checkMount, 100);
      return result;
    };
    window.addEventListener("popstate", () => {
      setTimeout(checkMount, 100);
    });
    const observer = new MutationObserver(() => {
      if (!document.getElementById(HOST_ELEMENT_ID)) {
        initContentScript();
      }
    });
    if (document.body) {
      observer.observe(document.body, { childList: true });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initContentScript();
      setupSPANavigationObserver();
    });
  } else {
    initContentScript();
    setupSPANavigationObserver();
  }
})();
//# sourceMappingURL=content.bundle.js.map
