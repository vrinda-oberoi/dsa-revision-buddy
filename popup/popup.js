/**
 * Extension Toolbar Popup Entry Point
 */

import { RevisionApp } from '../src/app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('popup-app-container');
  if (container) {
    const app = new RevisionApp(container, { isPopup: true });
    await app.init();
  }
});
