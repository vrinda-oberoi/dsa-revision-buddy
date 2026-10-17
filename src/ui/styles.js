/**
 * Premium UI Styles for DSA Revision Buddy
 * Designed with warm white/light background, purple/violet and coral accents,
 * smooth glassmorphism, micro-animations, and responsive layout.
 */

export const UI_STYLES = `
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
`;
