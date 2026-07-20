// ============================================================
// localDb.js
// ------------------------------------------------------------
// Several modules (Announcements, Documents, OKRs, Wellness,
// Calendar, Settings) have no backend table yet. Rather than leave
// their buttons doing nothing, this gives them a small real,
// working data layer backed by localStorage, shared by every role
// in this browser — so when Admin posts an announcement, HR
// approves a document, or an Employee checks in their mood, every
// dashboard that reads that table sees the change immediately
// (via a custom DOM event, no reload needed).
//
// This is a deliberate, honest substitute for a backend table: it
// works fully across roles in one browser, but — being
// localStorage — will not sync across two different computers.
// Wiring these to a real backend later just means swapping the
// body of each function below for an API call; every component
// that calls readTable/writeTable stays the same.
// ============================================================

const EVENT_NAME = "workzen:localdb:change";

export function readTable(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeTable(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { key } }));
}

/** React hook: subscribes a table to live updates from any role/tab. */
export function subscribeTable(key, onChange) {
  const handler = (e) => {
    if (!e.detail || e.detail.key === key) onChange();
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}

export function nextId(rows) {
  return rows.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
}

export function nowIso() {
  return new Date().toISOString();
}
