# 🚀 DSA Revision Buddy — LeetCode Spaced Repetition Chrome Extension

**DSA Revision Buddy** is a fully functional, visually polished Manifest V3 Chrome Extension that integrates directly with [LeetCode](https://leetcode.com). It helps software engineers master Data Structures & Algorithms (DSA) through an automated spaced repetition revision workflow directly inside their problem-solving workspace.

---

## ✨ Features & Capabilities

### 1. Seamless LeetCode Injected UI
- **Right-Side Floating Trigger**: A non-intrusive floating button docked on the right side of `leetcode.com` labeled **DSA Revision**, with a live counter badge (e.g. `3 Due` or `✓ Done`).
- **Shadow DOM Isolation**: The entire injected UI runs inside an isolated Shadow DOM (`#dsa-revision-buddy-host`), preventing LeetCode's Tailwind/CSS styles and resets from interfering with the extension and ensuring the code editor is never obstructed.
- **SPA Navigation Resilient**: Automatically tracks Next.js client-side page transitions (`pushState`, `replaceState`, `popstate`), ensuring the revision button remains docked across problem pages without requiring full page reloads.
- **Daily Revision Invitation**: Displays a non-intrusive greeting card on the first eligible visit of the day: *"Hey! Ready for today's DSA revision?"* with **Start Now** and **Later** buttons. Clicking *Later* dismisses the prompt for the remainder of the day while keeping the floating button accessible.

### 2. Spaced Repetition Scheduling Engine
- After completing a question, the user rates their difficulty:
  - 🟢 **Easy — Solved independently**: Schedules next revision **15 days later** (customizable).
  - 🟡 **Needed a Hint**: Schedules next revision **7 days later** (customizable).
  - 🔴 **Needed Full Solution / Video**: Schedules next revision **4 days later** by default, with a manual quick-toggle for **3 days** or **4 days** (customizable).
- Automatic calculation of future due dates with local date preservation (no UTC time-shift bugs).
- Overdue questions automatically prioritized at the top of the revision queue.
- Unrevised starter questions prioritized next, followed by fresh practice questions.
- Configurable interval settings via the **Sync & Settings** tab.

### 3. Daily Limit, Midnight Rollover & Celebration
- **Configurable Daily Target**: Default is 3 questions, with quick presets (1, 2, 3, 5, 6, 10) or a custom number.
- **Live Progress Tracking**: Displays a vibrant gradient progress bar and counter (`X / Y Completed`, remaining count).
- **Celebration & Confetti**: Upon reaching the daily target, triggers a canvas particle confetti burst and congratulatory badge (*"Today's Revision Completed! 🎉"*).
- **Extra Practice Mode**: After completing the daily quota, the user can continue revising with an explicit *Extra Practice* option.
- **Deterministic Midnight Rollover**: Automatically resets daily progress and invitation state at local midnight using `isMidnightCrossed()`, while permanently preserving all question histories, revision counts, and future schedules.

### 4. Question Library & LeetCode Session Synchronization
- **Pre-Loaded Curated Starter Library**: Includes 30+ top LeetCode classics (Two Sum, Reverse Linked List, 3Sum, Trapping Rain Water, Course Schedule, Binary Search, etc.) so revision can start immediately on install.
- **In-Session LeetCode GraphQL Sync**: Fetches solved questions directly from `https://leetcode.com/graphql` using active session cookies (`status: "AC"`). Requires zero API keys or passwords.
- **Deduplication Engine**: Merges newly imported questions against existing records by LeetCode problem ID, updating problem metadata while strictly preserving user revision history, counts, and due dates.
- **Manual CSV & JSON Fallback**:
  - Import CSV (with automatic header recognition and quote handling) or JSON backups.
  - Download a ready-to-use sample CSV template (`sample-dsa-template.csv`).
  - Export full library to CSV.
  - Full backup/restore via JSON export.
- Displays last successful synchronization timestamp and synced username.

### 5. Multi-View Revision Dashboard
- Available both in the LeetCode injected modal and in the Chrome toolbar popup (`popup.html`):
  - **⚡ Revise**: Daily progress bar, active question card, "Open Problem ↗", "Mark as Done", difficulty feedback selector, and celebration state.
  - **📚 Library**: Searchable problem list by title, ID, or tag; filters for All, Due, Easy, Medium, Hard, and Solved; direct "Revise" button to practice any problem on demand.
  - **📅 Schedule**: Timeline view categorizing questions into *Overdue*, *Due Today*, *Next 7 Days*, and *Later*.
  - **⏳ History**: Chronological log of completed revisions with timestamps, feedback badges, and next scheduled intervals.
  - **⚙️ Sync & Settings**: LeetCode sync status, CSV/JSON import/export, daily target selector, and interval customization.

---

## 📦 Project Structure

```
daily-dsa-revision/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── package.json               # Dependencies and scripts (type: module)
├── build.js                   # esbuild bundling script
├── serve.js                   # Local preview server
├── generate-icons.js          # Generator for extension PNG icons
├── assets/                    # Extension icons (16px, 32px, 48px, 128px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── background/                # Service worker for periodic alarms
│   ├── background.js          # Source background script
│   └── background.bundle.js   # Bundled background worker
├── content/                   # Content scripts injected into leetcode.com
│   ├── content.js             # Source content script (Shadow DOM host)
│   ├── content.css            # Base host element styling
│   └── content.bundle.js      # Bundled content script
├── popup/                     # Chrome toolbar popup
│   ├── popup.html             # Popup HTML layout
│   ├── popup.css              # Popup styling
│   ├── popup.js               # Popup entry point
│   └── popup.bundle.js        # Bundled popup script
├── src/                       # Modular application source code
│   ├── app.js                 # Unified RevisionApp controller
│   ├── storage/
│   │   └── storage.js         # chrome.storage.local abstraction with midnight rollover
│   ├── services/
│   │   ├── dateUtils.js       # Local calendar date helpers & DateProvider
│   │   ├── scheduler.js       # Spaced repetition algorithms & question selection
│   │   ├── leetcodeSync.js    # LeetCode GraphQL session sync service
│   │   └── importExport.js    # CSV/JSON parser, validator, deduplication
│   ├── ui/
│   │   ├── components.js      # UI templates & canvas confetti animation
│   │   └── styles.js          # Glassmorphic CSS design system
│   └── data/
│       └── starterQuestions.js # Curated Blind 75 starter library
└── test/                      # Automated unit test suite & visual harness
    ├── test-scheduler.test.js # Spaced repetition & priority selection tests
    ├── test-date-reset.test.js# Daily limit & midnight rollover tests
    ├── test-import-export.test.js # CSV/JSON parsing & deduplication tests
    ├── test-sync.test.js      # LeetCode GraphQL mock & auth tests
    ├── harness.html           # Interactive visual test harness
    └── harness.js             # Test harness simulation scripts
```

---

## 🛠️ Installation & Setup (Load Unpacked)

To load and run this Chrome extension on your local Chrome browser:

1. Open Google Chrome.
2. Navigate to `chrome://extensions` in the address bar.
3. Toggle on **Developer mode** in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the project root folder:
   `c:\Users\vrind\OneDrive\Desktop\Projects\daily-dsa-revision`
6. The extension **DSA Revision Buddy - LeetCode Spaced Repetition** will now appear in your extensions list!
7. Pin the extension to your Chrome toolbar for quick access.
8. Navigate to any problem on [LeetCode](https://leetcode.com/problems/two-sum/) — you will see the floating **DSA Revision** button and the daily invitation!

---

## 🧪 Testing the Extension

### Running Automated Unit Tests
The project includes automated tests for all business logic:
```bash
npm test
```
**Test Coverage Includes:**
- Spaced repetition calculations (Easy +15d, Hint +7d, Hard +4d, custom 3d/4d).
- Question priority algorithm (overdue > due today > unrevised > fresh).
- Daily progress tracking and rollover reset on midnight simulation.
- CSV parsing (quotes, delimiters, missing fields) and JSON export.
- Library merging and deduplication without wiping past revision logs.
- LeetCode GraphQL synchronization authentication check and pagination.

### Visual & Interactive Test Harness
You can test the entire extension visually without having to visit LeetCode:
1. Start the local test server:
   ```bash
   node serve.js
   ```
2. Open `http://localhost:3000/test/harness.html` in your browser.
3. Use the simulation bar buttons:
   - 🌙 **Simulate Midnight Reset**: Advances the calendar by 1 day to verify that the daily counter resets to 0 while keeping schedules intact.
   - ⚡ **Open DSA Revision Panel**: Launches the modal panel.
   - 💌 **Trigger Daily Invitation**: Resets invitation status to test the first-visit prompt.
   - 🔄 **Clear All & Reset Demo Data**: Restores fresh starter questions.

---

## ⚠️ LeetCode Integration Details & Limitations

1. **Session-Based Synchronization**:
   - The extension uses your active browser session (`credentials: 'include'`) to query LeetCode's GraphQL API (`problemsetQuestionList` with `filters: { status: "AC" }`).
   - You must be logged into LeetCode in your browser for automatic synchronization to retrieve your solved questions.
   - If not signed in or if LeetCode changes its GraphQL schema or rate-limits requests, the extension gracefully reports the issue and provides the **Manual CSV / JSON Import** fallback.
2. **Security & Privacy**:
   - Zero passwords, tokens, or cookies are stored or transmitted to external servers.
   - All revision logs, question libraries, and settings are stored locally on your device via `chrome.storage.local`.
3. **SPA Navigation**:
   - LeetCode uses a Next.js single-page application router. The extension uses both history state monkey-patching and DOM MutationObservers to keep the floating revision button docked seamlessly as you navigate between problems.
