export interface HookEntry {
  id: number;
  transcription: string;
  template: string;
  templateName: string;
  hookType: string;
  niche: string[];
  creator: { handle: string; platform: string; avatar: string };
  views: number;
  viewsDisplay: string;
  saves: number;
  heat: number;
}

const STORE_KEY = "hookvault_selected";

export function sendToScript(hook: HookEntry) {
  localStorage.setItem(STORE_KEY, JSON.stringify(hook));
}

export function readFromScript(): HookEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearScript() {
  localStorage.removeItem(STORE_KEY);
}
