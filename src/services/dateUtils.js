/**
 * Date utility with pluggable DateProvider for testing & midnight rollover detection.
 * All calendar dates are formatted as local 'YYYY-MM-DD' to prevent UTC shift issues.
 */

class DateProviderClass {
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
    this._simulatedDate = typeof date === 'string' ? new Date(date) : new Date(date.getTime());
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
    return this._simulatedDate ? new Date(this._simulatedDate.getTime()) : new Date();
  }
}

export const DateProvider = new DateProviderClass();

/**
 * Format a Date object to local YYYY-MM-DD
 * @param {Date} [d]
 * @returns {string} e.g. "2026-10-17"
 */
export function formatLocalDate(d = DateProvider.now()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's local date string
 * @returns {string}
 */
export function getTodayDateString() {
  return formatLocalDate(DateProvider.now());
}

/**
 * Parse YYYY-MM-DD into a local midnight Date object
 * @param {string} dateStr 
 * @returns {Date}
 */
export function parseLocalDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return new Date();
  const parts = dateStr.split('-');
  if (parts.length !== 3) return new Date();
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 0, 0, 0, 0);
}

/**
 * Add days to a YYYY-MM-DD date string
 * @param {string} dateStr 
 * @param {number} days 
 * @returns {string}
 */
export function addDays(dateStr, days) {
  const d = parseLocalDate(dateStr);
  d.setDate(d.getDate() + Number(days));
  return formatLocalDate(d);
}

/**
 * Get difference in days: targetDate - baseDate
 * Positive if targetDate is in future, negative if in past.
 * @param {string} targetDateStr 
 * @param {string} [baseDateStr] 
 * @returns {number}
 */
export function getDaysDifference(targetDateStr, baseDateStr = getTodayDateString()) {
  if (!targetDateStr) return 0;
  const target = parseLocalDate(targetDateStr);
  const base = parseLocalDate(baseDateStr);
  const diffMs = target.getTime() - base.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Check if a scheduled date is due or overdue relative to today
 * @param {string} dateStr 
 * @param {string} [todayStr] 
 * @returns {boolean}
 */
export function isDueOrOverdue(dateStr, todayStr = getTodayDateString()) {
  if (!dateStr) return false;
  return dateStr <= todayStr;
}

/**
 * Check if midnight has crossed between lastActiveDate and current local date
 * @param {string} lastActiveDateStr 
 * @param {string} [currentTodayStr] 
 * @returns {boolean}
 */
export function isMidnightCrossed(lastActiveDateStr, currentTodayStr = getTodayDateString()) {
  if (!lastActiveDateStr) return true;
  return currentTodayStr > lastActiveDateStr;
}

/**
 * Human friendly relative date formatting
 * @param {string} dateStr 
 * @param {string} [todayStr] 
 * @returns {string} e.g. "Today", "Tomorrow", "Yesterday", "In 3 days", "3 days overdue"
 */
export function formatFriendlyDate(dateStr, todayStr = getTodayDateString()) {
  if (!dateStr) return 'Not scheduled';
  const diff = getDaysDifference(dateStr, todayStr);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff > 1 && diff <= 30) return `In ${diff} days`;
  if (diff < -1) return `${Math.abs(diff)} days overdue`;
  
  // Format as readable date e.g. "Nov 15, 2026"
  const d = parseLocalDate(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
