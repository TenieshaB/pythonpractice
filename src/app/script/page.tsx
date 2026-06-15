"use client";
import { useEffect, useState, useRef } from "react";
import {
  Pen, Flame, X, Copy, CheckCheck, RefreshCw, ChevronDown,
  Eye, Bookmark, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { readFromScript, clearScript, type HookEntry } from "@/lib/hookStore";

// ─── word count ───────────────────────────────────────────────────────────────

function wordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

// ─── section component ────────────────────────────────────────────────────────

function ScriptSection({
  label, sublabel, placeholder, value, onChange, accent, rows = 4,
}: {
  label: string;
  sublabel: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  accent?: boolean;
  rows?: number;
}) {
  return (
    <div className={cn("rounded-xl border p-4", accent ? "border-[#c0622a]/40 bg-[#c0622a]/5" : "border-[#2a2a2a] bg-[#1a1a1a]")}>
      <div className="flex items-baseline justify-between mb-1">
        <span className={cn("text-xs font-semibold uppercase tracking-widest", accent ? "text-[#c0622a]" : "text-[#555]")}>
          {label}
        </span>
        <span className="text-[10px] text-[#444]">{sublabel}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-transparent text-sm text-[#f0ebe5] placeholder:text-[#333] resize-none focus:outline-none leading-relaxed pt-2"
      />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ffffff08]">
        <span className="text-[10px] text-[#333]">{wordCount(value)} words</span>
      </div>
    </div>
  );
}

// ─── hook chip ────────────────────────────────────────────────────────────────

function HookChip({ hook, onClear }: { hook: HookEntry; onClear: () => void }) {
  return (
    <div className="rounded-xl border border-[#c0622a]/50 bg-[#c0622a]/8 p-3 flex items-start gap-3">
      <Flame className="h-4 w-4 text-[#c0622a] shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-[#c0622a]/70">{hook.templateName}</span>
          <Badge variant="muted" className="text-[9px]">{hook.hookType}</Badge>
          <span className="text-[10px] text-[#444]">from {hook.creator.handle}</span>
        </div>
        <p className="text-xs text-[#f0ebe5] leading-snug line-clamp-2">&ldquo;{hook.transcription}&rdquo;</p>
      </div>
      <button onClick={onClear} className="text-[#444] hover:text-[#888] cursor-pointer shrink-0">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── copy-all button ─────────────────────────────────────────────────────────

function buildFullScript(hook: string | null, sections: Record<string, string>) {
  const parts = [];
  if (hook) parts.push(`[HOOK]\n${hook}`);
  if (sections.body) parts.push(`[BODY]\n${sections.body}`);
  if (sections.reveal) parts.push(`[REVEAL]\n${sections.reveal}`);
  if (sections.cta) parts.push(`[CTA]\n${sections.cta}`);
  return parts.join("\n\n");
}

// ─── page ────────────────────────────────────────────────────────────────────

const TONE_OPTIONS = ["Conversational", "Authoritative", "Vulnerable", "Hype", "Educational"];

export default function ScriptPage() {
  const [loadedHook, setLoadedHook] = useState<HookEntry | null>(null);
  const [hookText, setHookText] = useState("");
  const [sections, setSections] = useState({ body: "", reveal: "", cta: "" });
  const [tone, setTone] = useState("Conversational");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hookRef = useRef<HTMLTextAreaElement>(null);

  // Read hook from vault on mount
  useEffect(() => {
    setMounted(true);
    const h = readFromScript();
    if (h) {
      setLoadedHook(h);
      setHookText(h.transcription);
      setTimeout(() => hookRef.current?.focus(), 100);
    }
  }, []);

  function clearHook() {
    clearScript();
    setLoadedHook(null);
    setHookText("");
  }

  function updateSection(key: string, val: string) {
    setSections((prev) => ({ ...prev, [key]: val }));
  }

  function copyAll() {
    const script = buildFullScript(hookText || null, sections);
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setHookText("");
    setSections({ body: "", reveal: "", cta: "" });
    clearHook();
  }

  const totalWords = wordCount(hookText) + wordCount(sections.body) + wordCount(sections.reveal) + wordCount(sections.cta);
  const estimatedSecs = Math.round(totalWords / 2.5); // ~150wpm spoken

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#f0ebe5] transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Vault
          </Link>
          <span className="text-[#333]">/</span>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
              <Pen className="h-5 w-5 text-[#c0622a]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#f0ebe5]">Script</h1>
              <p className="text-xs text-[#888]">
                {totalWords} words · ~{estimatedSecs}s spoken
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tone selector */}
          <div className="relative">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="appearance-none bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-[#c0622a] cursor-pointer"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#555] pointer-events-none" />
          </div>

          <Button variant="ghost" size="sm" onClick={reset}>
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>

          <Button variant="terracotta" size="sm" onClick={copyAll}>
            {copied ? (
              <><CheckCheck className="h-3.5 w-3.5" /> Copied!</>
            ) : (
              <><Copy className="h-3.5 w-3.5" /> Copy script</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Script editor — left 2/3 */}
        <div className="lg:col-span-2 space-y-3">

          {/* Hook section — accent */}
          <div className="rounded-xl border border-[#c0622a]/40 bg-[#c0622a]/5 p-4">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c0622a] flex items-center gap-1.5">
                <Flame className="h-3 w-3" /> Hook
              </span>
              <span className="text-[10px] text-[#444]">first 3 seconds</span>
            </div>

            {/* Loaded hook chip */}
            {loadedHook && (
              <div className="mb-3 mt-2">
                <HookChip hook={loadedHook} onClear={clearHook} />
              </div>
            )}

            <textarea
              ref={hookRef}
              value={hookText}
              onChange={(e) => setHookText(e.target.value)}
              placeholder={loadedHook ? "Edit the hook above or write your own version..." : "Paste your hook here, or go to Hook Vault →"}
              rows={3}
              className="w-full bg-transparent text-sm text-[#f0ebe5] placeholder:text-[#333] resize-none focus:outline-none leading-relaxed pt-2"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ffffff08]">
              <span className="text-[10px] text-[#333]">{wordCount(hookText)} words</span>
              {!loadedHook && (
                <Link href="/" className="text-[10px] text-[#c0622a] hover:underline">
                  ← Browse Hook Vault
                </Link>
              )}
            </div>
          </div>

          <ScriptSection
            label="Body"
            sublabel="15–45 seconds"
            placeholder="Expand on the hook. Tell the story, share the insight, or lay out the framework..."
            value={sections.body}
            onChange={(v) => updateSection("body", v)}
            rows={6}
          />

          <ScriptSection
            label="Reveal / Payoff"
            sublabel="the aha moment"
            placeholder="The satisfying answer, the transformation, the surprising truth..."
            value={sections.reveal}
            onChange={(v) => updateSection("reveal", v)}
            rows={4}
          />

          <ScriptSection
            label="CTA"
            sublabel="last 2 seconds"
            placeholder="Follow for more. Save this. Comment [KEYWORD] if you want the template..."
            value={sections.cta}
            onChange={(v) => updateSection("cta", v)}
            rows={2}
          />
        </div>

        {/* Sidebar — right 1/3 */}
        <div className="space-y-4">

          {/* Script stats */}
          <Card>
            <CardHeader>
              <CardTitle>Script stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Total words", value: totalWords },
                { label: "Est. duration", value: `~${estimatedSecs}s` },
                { label: "Tone", value: tone },
                { label: "Hook words", value: wordCount(hookText) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">{label}</span>
                  <span className="text-xs font-semibold text-[#f0ebe5]">{value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#222]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#555]">Sections filled</span>
                  <span className="text-xs font-semibold text-[#f0ebe5]">
                    {[hookText, sections.body, sections.reveal, sections.cta].filter(Boolean).length}/4
                  </span>
                </div>
                <div className="flex gap-1">
                  {[hookText, sections.body, sections.reveal, sections.cta].map((s, i) => (
                    <div
                      key={i}
                      className={cn("flex-1 h-1 rounded-full", s ? "bg-[#c0622a]" : "bg-[#2a2a2a]")}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hook source (if loaded) */}
          {loadedHook && (
            <Card className="border-[#c0622a]/20">
              <CardHeader>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#555]" />
                  <CardTitle>Hook source</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">Creator</span>
                  <span className="text-xs font-semibold text-[#f0ebe5]">{loadedHook.creator.handle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">Platform</span>
                  <span className="text-xs text-[#f0ebe5]">{loadedHook.creator.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">Views</span>
                  <span className="text-xs text-[#f0ebe5]">{loadedHook.viewsDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">Heat score</span>
                  <span className="text-xs font-black text-[#c0622a]">{loadedHook.heat}</span>
                </div>
                <div className="pt-2 border-t border-[#222]">
                  <p className="text-[10px] text-[#555] font-mono leading-relaxed">{loadedHook.template}</p>
                </div>
                <Link href="/" className="block mt-1">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    <Bookmark className="h-3.5 w-3.5" />
                    Back to Hook Vault
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Hook formula tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { pattern: "[X] just killed [Y]", tip: "Lead with the disruption. Name who gets hurt." },
                { pattern: "Stop doing [X]", tip: "Follow with 'because...' not 'it's bad'. Show cost." },
                { pattern: "[N] things I wish...", tip: "Tease #1 in the hook. Make it the best one." },
                { pattern: "Nobody tells you...", tip: "The reveal must be genuinely surprising or specific." },
              ].map(({ pattern, tip }) => (
                <div key={pattern} className="space-y-0.5">
                  <p className="text-[10px] font-mono text-[#c0622a]/80">{pattern}</p>
                  <p className="text-[11px] text-[#555] leading-snug">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
