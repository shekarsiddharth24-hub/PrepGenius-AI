/**
 * Tiny localStorage helper for autosaving interview answer drafts.
 * Every call is wrapped in try/catch because storage can be unavailable
 * (private mode, blocked cookies, quota exceeded).
 */

export interface AnswerDraft {
  answer: string;
  language?: string;
}

const PREFIX = "prepgenius:draft:";

// Small deterministic hash so the key stays short for long questions.
function hash(text: string): string {
  let h = 5381;

  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  }

  return (h >>> 0).toString(36);
}

export function draftKey(question: string): string {
  return PREFIX + hash(question);
}

export function loadDraft(key: string): AnswerDraft | null {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (typeof parsed?.answer !== "string") return null;

    return parsed as AnswerDraft;
  } catch {
    return null;
  }
}
 
export function saveDraft(key: string, draft: AnswerDraft): void {
  try {
    localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // Ignore: autosave is a convenience, not a requirement.
  }
}

export function clearDraft(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}
