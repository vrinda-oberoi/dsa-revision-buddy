/**
 * DSA Revision Buddy - Content Script
 * Injected on https://leetcode.com/*
 * 
 * Uses Shadow DOM for total style isolation from LeetCode's DOM and Tailwind styles.
 * Handles SPA navigation to keep the floating revision button persistent.
 */

import { RevisionApp } from '../src/app.js';

const HOST_ELEMENT_ID = 'dsa-revision-buddy-host';
let appInstance = null;
let shadowRoot = null;

/**
 * Initialize and mount the extension inside Shadow DOM
 */
function initContentScript() {
  // Check if host already exists
  let hostEl = document.getElementById(HOST_ELEMENT_ID);
  if (hostEl && shadowRoot && appInstance) {
    return;
  }

  if (!hostEl) {
    hostEl = document.createElement('div');
    hostEl.id = HOST_ELEMENT_ID;
    // Ensure host itself has zero layout footprint in LeetCode's flow
    hostEl.style.position = 'fixed';
    hostEl.style.zIndex = '2147483647';
    hostEl.style.pointerEvents = 'none'; // Child buttons enable pointerEvents: auto
    (document.body || document.documentElement).appendChild(hostEl);
  }

  if (!shadowRoot) {
    shadowRoot = hostEl.attachShadow({ mode: 'open' });
  }

  // Create container inside shadow root with pointer events enabled
  let appRoot = shadowRoot.getElementById('dsa-shadow-app');
  if (!appRoot) {
    appRoot = document.createElement('div');
    appRoot.id = 'dsa-shadow-app';
    appRoot.style.pointerEvents = 'auto';
    shadowRoot.appendChild(appRoot);
  }

  appInstance = new RevisionApp(appRoot, { isPopup: false });
  appInstance.init().catch(err => {
    console.error('[DSA Revision Buddy] Initialization error:', err);
  });
}

/**
 * Ensure the extension host survives LeetCode's Next.js SPA transitions
 */
function setupSPANavigationObserver() {
  const checkMount = () => {
    if (!document.getElementById(HOST_ELEMENT_ID)) {
      initContentScript();
    }
  };

  // Intercept history.pushState and replaceState
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    setTimeout(checkMount, 100);
    return result;
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    setTimeout(checkMount, 100);
    return result;
  };

  window.addEventListener('popstate', () => {
    setTimeout(checkMount, 100);
  });

  // MutationObserver to detect if document.body was replaced or wiped
  const observer = new MutationObserver(() => {
    if (!document.getElementById(HOST_ELEMENT_ID)) {
      initContentScript();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true });
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initContentScript();
    setupSPANavigationObserver();
  });
} else {
  initContentScript();
  setupSPANavigationObserver();
}
