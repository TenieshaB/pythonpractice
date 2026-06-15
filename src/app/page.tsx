"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, Plus, Search, Copy, ChevronDown, Eye, Bookmark,
  ArrowUpDown, Pen, CheckCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { sendToScript, type HookEntry } from "@/lib/hookStore";

// ─── data ────────────────────────────────────────────────────────────────────

const HOOKS: HookEntry[] = [
  {
    id: 1,
    transcription: "Instagram just killed organic reach forever — and most creators don't even know it yet.",
    template: "[PLATFORM] just killed [X] — and most [PEOPLE] don't even know it yet.",
    templateName: "[X] just killed [Y]",
    hookType: "Contrast",
    niche: ["Creator Economy", "Social Media"],
    creator: { handle: "@thesocialshift", platform: "IG Reels", avatar: "SS" },
    views: 4200000, viewsDisplay: "4.2M", saves: 31400, heat: 97,
  },
  {
    id: 2,
    transcription: "Stop posting every day. It's the reason your account isn't growing.",
    template: "Stop [doing X]. It's the reason your [outcome] isn't [improving].",
    templateName: "Stop doing [X]",
    hookType: "Accusation",
    niche: ["Creator Economy", "Social Media"],
    creator: { handle: "@creatoriq", platform: "TikTok", avatar: "CI" },
    views: 6800000, viewsDisplay: "6.8M", saves: 54200, heat: 99,
  },
  {
    id: 3,
    transcription: "7 things I wish I knew before I started my business — I would have saved 3 years.",
    template: "[NUMBER] things I wish I knew before [starting X] — I would have saved [time/money].",
    templateName: "[NUMBER] things I wish I knew",
    hookType: "List",
    niche: ["Business", "Entrepreneurship"],
    creator: { handle: "@alexhormozi", platform: "YouTube Shorts", avatar: "AH" },
    views: 9100000, viewsDisplay: "9.1M", saves: 88000, heat: 99,
  },
  {
    id: 4,
    transcription: "Nobody tells you that going viral doesn't make you money. Here's what actually does.",
    template: "Nobody tells you that [common belief] doesn't [work]. Here's what actually does.",
    templateName: "Nobody tells you [X]",
    hookType: "Curiosity",
    niche: ["Creator Economy", "Business"],
    creator: { handle: "@garyvee", platform: "IG Reels", avatar: "GV" },
    views: 3700000, viewsDisplay: "3.7M", saves: 28900, heat: 96,
  },
  {
    id: 5,
    transcription: "I lost $80,000 trying to go viral on TikTok. Here's the one mistake that cost me everything.",
    template: "I lost $[AMOUNT] trying to [achieve X]. Here's the one mistake that cost me everything.",
    templateName: "I lost [X] doing [Y]",
    hookType: "Story",
    niche: ["Business", "Finance"],
    creator: { handle: "@thefinanceguy", platform: "TikTok", avatar: "FG" },
    views: 5500000, viewsDisplay: "5.5M", saves: 47100, heat: 98,
  },
  {
    id: 6,
    transcription: "This one DM changed my entire business model and got me to $30k a month.",
    template: "This one [X] changed my entire [area] and got me to [result].",
    templateName: "This one [X] changed my [Y]",
    hookType: "Story",
    niche: ["Business", "Creator Economy"],
    creator: { handle: "@codiemko", platform: "IG Reels", avatar: "CS" },
    views: 2800000, viewsDisplay: "2.8M", saves: 19700, heat: 93,
  },
  {
    id: 7,
    transcription: "Stop buying courses. The only thing that actually builds a business is this.",
    template: "Stop buying [X]. The only thing that actually [builds Y] is this.",
    templateName: "Stop doing [X]",
    hookType: "Accusation",
    niche: ["Business", "Entrepreneurship"],
    creator: { handle: "@justinwelsh", platform: "LinkedIn", avatar: "JW" },
    views: 1900000, viewsDisplay: "1.9M", saves: 14400, heat: 91,
  },
  {
    id: 8,
    transcription: "5 things every creator does wrong in their first year — number 3 still makes me cringe.",
    template: "[NUMBER] things every [person] does wrong in their [timeframe] — number [N] still makes me cringe.",
    templateName: "[NUMBER] things I wish I knew",
    hookType: "List",
    niche: ["Creator Economy"],
    creator: { handle: "@mkbhd", platform: "YouTube Shorts", avatar: "MK" },
    views: 7200000, viewsDisplay: "7.2M", saves: 63000, heat: 99,
  },
  {
    id: 9,
    transcription: "ChatGPT just killed the $50/hr copywriter. Here's what to do if that's you.",
    template: "[AI/TOOL] just killed the [JOB/ROLE]. Here's what to do if that's you.",
    templateName: "[X] just killed [Y]",
    hookType: "Contrast",
    niche: ["AI", "Business"],
    creator: { handle: "@levelsio", platform: "TikTok", avatar: "LV" },
    views: 8400000, viewsDisplay: "8.4M", saves: 71000, heat: 99,
  },
  {
    id: 10,
    transcription: "Nobody tells you that the algorithm doesn't suppress small accounts. You just don't understand hooks.",
    template: "Nobody tells you that [popular belief] isn't true. You just [don't understand X].",
    templateName: "Nobody tells you [X]",
    hookType: "Curiosity",
    niche: ["Creator Economy", "Social Media"],
    creator: { handle: "@hankgreen", platform: "TikTok", avatar: "HG" },
    views: 4600000, viewsDisplay: "4.6M", saves: 38000, heat: 97,
  },
  {
    id: 11,
    transcription: "Stop spending money on ads before you fix this one thing in your content.",
    template: "Stop spending money on [X] before you fix this one thing in your [Y].",
    templateName: "Stop doing [X]",
    hookType: "Accusation",
    niche: ["Marketing", "Business"],
    creator: { handle: "@rorysuther", platform: "IG Reels", avatar: "RS" },
    views: 3100000, viewsDisplay: "3.1M", saves: 24500, heat: 95,
  },
  {
    id: 12,
    transcription: "10 productivity hacks I wish I knew at 22. You can implement number 1 in the next 5 minutes.",
    template: "[NUMBER] [topic] hacks I wish I knew at [age]. You can implement number 1 in the next [timeframe].",
    templateName: "[NUMBER] things I wish I knew",
    hookType: "List",
    niche: ["Productivity", "Mindset"],
    creator: { handle: "@aliabdaal", platform: "YouTube Shorts", avatar: "AA" },
    views: 11200000, viewsDisplay: "11.2M", saves: 94000, heat: 99,
  },
  {
    id: 13,
    transcription: "I lost my first 10,000 followers overnight — here's what I did to get them back in 48 hours.",
    template: "I lost my [achievement] overnight — here's what I did to get [it] back in [timeframe].",
    templateName: "I lost [X] doing [Y]",
    hookType: "Story",
    niche: ["Creator Economy", "Social Media"],
    creator: { handle: "@natalia.petrzela", platform: "IG Reels", avatar: "NP" },
    views: 2300000, viewsDisplay: "2.3M", saves: 18200, heat: 90,
  },
  {
    id: 14,
    transcription: "The email that made me $47,000 in 24 hours — I'll break it down line by line.",
    template: "The [thing] that made me $[AMOUNT] in [timeframe] — I'll break it down [how].",
    templateName: "This one [X] changed my [Y]",
    hookType: "Story",
    niche: ["Marketing", "Business"],
    creator: { handle: "@eddiescherrill", platform: "TikTok", avatar: "ES" },
    views: 6300000, viewsDisplay: "6.3M", saves: 52000, heat: 98,
  },
  {
    id: 15,
    transcription: "3 things top creators do differently that nobody talks about — I've interviewed over 200 of them.",
    template: "[NUMBER] things [top performers] do differently that nobody talks about — I've [done X to verify].",
    templateName: "[NUMBER] things I wish I knew",
    hookType: "Research",
    niche: ["Creator Economy", "Mindset"],
    creator: { handle: "@joerogan", platform: "YouTube Shorts", avatar: "JR" },
    views: 15000000, viewsDisplay: "15M", saves: 127000, heat: 99,
  },
  {
    id: 16,
    transcription: "Your pricing is wrong and it's costing you clients every single day.",
    template: "Your [X] is wrong and it's costing you [Y] every single day.",
    templateName: "Stop doing [X]",
    hookType: "Accusation",
    niche: ["Business", "Finance"],
    creator: { handle: "@alexhormozi", platform: "IG Reels", avatar: "AH" },
    views: 8900000, viewsDisplay: "8.9M", saves: 76000, heat: 99,
  },
];

// ─── filters ──────────────────────────────────────────────────────────────────

const HOOK_TYPES = ["All Types", "Accusation", "List", "Curiosity", "Story", "Contrast", "Research"];
const NICHES = ["All Niches", "Creator Economy", "Business", "Social Media", "Marketing", "Finance", "Productivity", "Mindset", "Entrepreneurship", "AI"];
const VIEW_RANGES = [
  { label: "Any views", min: 0 },
  { label: "500K+", min: 500000 },
  { label: "1M+", min: 1000000 },
  { label: "5M+", min: 5000000 },
  { label: "10M+", min: 10000000 },
];
const SORT_OPTIONS = [
  { label: "Most viewed", key: "views" },
  { label: "Most saves", key: "saves" },
  { label: "Highest heat", key: "heat" },
];
const TEMPLATE_NAMES = ["All Templates", "[X] just killed [Y]", "Stop doing [X]", "[NUMBER] things I wish I knew", "Nobody tells you [X]", "I lost [X] doing [Y]", "This one [X] changed my [Y]"];

// ─── sub-components ──────────────────────────────────────────────────────────

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
      style={{ background: color }}
    >
      {initials}
    </span>
  );
}

const AVATAR_COLORS: Record<string, string> = {
  SS: "#1d4ed8", CI: "#7c3aed", AH: "#b45309", GV: "#0f766e", FG: "#be123c",
  CS: "#c0622a", JW: "#0284c7", MK: "#dc2626", LV: "#4f46e5", HG: "#059669",
  RS: "#7e22ce", AA: "#0369a1", NP: "#db2777", ES: "#92400e", JR: "#374151",
};

function HeatBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#c0622a] to-[#e07848] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] text-[#888] w-6 text-right">{value}</span>
    </div>
  );
}

function Pill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap",
        active
          ? "bg-[#c0622a] text-white"
          : "bg-[#1a1a1a] text-[#666] hover:text-[#f0ebe5] border border-[#2a2a2a]"
      )}
    >
      {label}
    </button>
  );
}

function Select({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-[#c0622a] cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#555] pointer-events-none" />
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function HookVaultPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hookType, setHookType] = useState("All Types");
  const [niche, setNiche] = useState("All Niches");
  const [templateName, setTemplateName] = useState("All Templates");
  const [viewMin, setViewMin] = useState(0);
  const [sortKey, setSortKey] = useState("views");
  const [copied, setCopied] = useState<number | null>(null);
  const [sent, setSent] = useState<number | null>(null);
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = useMemo(() => {
    let list = HOOKS.filter((h) => {
      if (hookType !== "All Types" && h.hookType !== hookType) return false;
      if (niche !== "All Niches" && !h.niche.includes(niche)) return false;
      if (templateName !== "All Templates" && h.templateName !== templateName) return false;
      if (h.views < viewMin) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !h.transcription.toLowerCase().includes(q) &&
          !h.template.toLowerCase().includes(q) &&
          !h.creator.handle.toLowerCase().includes(q) &&
          !h.niche.some((n) => n.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sortKey === "views") return b.views - a.views;
      if (sortKey === "saves") return b.saves - a.saves;
      return b.heat - a.heat;
    });
    return list;
  }, [query, hookType, niche, templateName, viewMin, sortKey]);

  function copy(text: string, id: number) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1600);
  }

  function useInScript(hook: HookEntry) {
    sendToScript(hook);
    setSent(hook.id);
    setTimeout(() => {
      router.push("/script");
    }, 600);
  }

  function toggleSave(id: number) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const activeFilterCount = [
    hookType !== "All Types",
    niche !== "All Niches",
    templateName !== "All Templates",
    viewMin > 0,
  ].filter(Boolean).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
            <Flame className="h-5 w-5 text-[#c0622a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f0ebe5]">Hook Vault</h1>
            <p className="text-xs text-[#888]">
              {HOOKS.length} hooks saved · {filtered.length} shown
            </p>
          </div>
        </div>
        <Button variant="terracotta" size="sm">
          <Plus className="h-4 w-4" />
          Save Hook
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
        <Input
          placeholder="Search transcription, template, creator, niche..."
          className="pl-9 h-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#f0ebe5] cursor-pointer text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <span className="text-xs text-[#555] shrink-0">Hook type:</span>
        {HOOK_TYPES.map((t) => (
          <Pill key={t} label={t} active={hookType === t} onClick={() => setHookType(t)} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="text-xs text-[#555] shrink-0">Niche:</span>
        {NICHES.map((n) => (
          <Pill key={n} label={n} active={niche === n} onClick={() => setNiche(n)} />
        ))}
      </div>

      {/* Second filter row: template + views + sort */}
      <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-[#555]">Template:</span>
          <Select
            value={templateName}
            onChange={setTemplateName}
            options={TEMPLATE_NAMES}
          />
          <span className="text-xs text-[#555] ml-1">Min views:</span>
          <Select
            value={VIEW_RANGES.find((r) => r.min === viewMin)?.label ?? "Any views"}
            onChange={(v) => setViewMin(VIEW_RANGES.find((r) => r.label === v)?.min ?? 0)}
            options={VIEW_RANGES.map((r) => r.label)}
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-[#555]" />
          <Select
            value={SORT_OPTIONS.find((s) => s.key === sortKey)?.label ?? "Most viewed"}
            onChange={(v) => setSortKey(SORT_OPTIONS.find((s) => s.label === v)?.key ?? "views")}
            options={SORT_OPTIONS.map((s) => s.label)}
          />
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setHookType("All Types");
                setNiche("All Niches");
                setTemplateName("All Templates");
                setViewMin(0);
              }}
              className="text-[10px] text-[#c0622a] hover:underline cursor-pointer ml-1"
            >
              Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#444]">
          <Flame className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No hooks match these filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((h) => (
            <HookCard
              key={h.id}
              hook={h}
              copied={copied}
              sent={sent}
              saved={saved.includes(h.id)}
              onCopy={copy}
              onUse={useInScript}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── hook card ────────────────────────────────────────────────────────────────

function HookCard({
  hook, copied, sent, saved, onCopy, onUse, onSave,
}: {
  hook: HookEntry;
  copied: number | null;
  sent: number | null;
  saved: boolean;
  onCopy: (text: string, id: number) => void;
  onUse: (hook: HookEntry) => void;
  onSave: (id: number) => void;
}) {
  const isCopied = copied === hook.id;
  const isSent = sent === hook.id;

  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:border-[#c0622a]/40",
        isSent && "border-[#c0622a]/60 bg-[#c0622a]/5"
      )}
    >
      <CardContent className="p-4">

        {/* Top row: template name + heat */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#c0622a]/15 text-[#e07848] text-[10px] font-mono font-semibold">
              {hook.templateName}
            </span>
            <Badge variant="muted" className="text-[10px]">{hook.hookType}</Badge>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Flame className="h-3 w-3 text-[#c0622a]" />
            <span className="text-xs font-black text-[#c0622a]">{hook.heat}</span>
          </div>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar initials={hook.creator.avatar} color={AVATAR_COLORS[hook.creator.avatar] ?? "#c0622a"} />
          <span className="text-xs font-semibold text-[#f0ebe5]">{hook.creator.handle}</span>
          <span className="text-[10px] text-[#444]">·</span>
          <span className="text-[10px] text-[#555]">{hook.creator.platform}</span>
          <div className="ml-auto flex gap-1">
            {hook.niche.map((n) => (
              <span key={n} className="text-[9px] px-1.5 py-0.5 rounded bg-[#222] text-[#555]">{n}</span>
            ))}
          </div>
        </div>

        {/* Content tabs */}
        <Tabs defaultValue="transcription">
          <TabsList className="mb-3 bg-[#0f0f0f]">
            <TabsTrigger value="transcription">Transcription</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
          </TabsList>

          <TabsContent value="transcription">
            <p className="text-sm text-[#f0ebe5] leading-relaxed font-medium min-h-[2.5rem]">
              &ldquo;{hook.transcription}&rdquo;
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onCopy(hook.transcription, hook.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#1e1e1e] text-[#888] text-xs hover:text-[#f0ebe5] hover:bg-[#252525] transition-all cursor-pointer"
              >
                {isCopied ? <><CheckCheck className="h-3 w-3 text-emerald-400" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="template">
            <p className="text-sm font-mono text-[#c0622a]/90 leading-relaxed min-h-[2.5rem] bg-[#0f0f0f] rounded-lg px-3 py-2 border border-[#1e1e1e]">
              {hook.template}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onCopy(hook.template, hook.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#1e1e1e] text-[#888] text-xs hover:text-[#f0ebe5] hover:bg-[#252525] transition-all cursor-pointer"
              >
                {isCopied ? <><CheckCheck className="h-3 w-3 text-emerald-400" /> Copied</> : <><Copy className="h-3 w-3" /> Copy template</>}
              </button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats row */}
        <div className="mt-4 pt-3 border-t border-[#1e1e1e] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-[#555]">
              <Eye className="h-3 w-3" />
              {hook.viewsDisplay} views
            </span>
            <span className="text-[#444]">{hook.saves.toLocaleString()} saves</span>
          </div>
          <HeatBar value={hook.heat} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onSave(hook.id)}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-lg transition-all cursor-pointer shrink-0",
              saved
                ? "bg-[#c0622a]/20 text-[#c0622a]"
                : "bg-[#1e1e1e] text-[#555] hover:text-[#888]"
            )}
          >
            <Bookmark className="h-3.5 w-3.5" fill={saved ? "currentColor" : "none"} />
          </button>

          <Button
            variant="terracotta"
            size="sm"
            className="flex-1"
            onClick={() => onUse(hook)}
            disabled={isSent}
          >
            {isSent ? (
              <><CheckCheck className="h-3.5 w-3.5" /> Opening /script...</>
            ) : (
              <><Pen className="h-3.5 w-3.5" /> Use this →</>
            )}
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
