"use client";
import { useState } from "react";
import { Flame, Plus, Search, Copy, Bookmark, Filter, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const hooks = [
  {
    id: 1,
    text: "I lost $40k in one month — here's what it taught me about money",
    template: "I [negative outcome] in [timeframe] — here's what it taught me about [topic]",
    category: "Story",
    platform: "IG Reels",
    views: "2.4M",
    saves: 12800,
    heat: 98,
  },
  {
    id: 2,
    text: "Nobody tells you this about building a business at 25",
    template: "Nobody tells you this about [doing X] at [age/stage]",
    category: "Curiosity",
    platform: "TikTok",
    views: "1.8M",
    saves: 9200,
    heat: 94,
  },
  {
    id: 3,
    text: "Stop scrolling. This is the only content advice you actually need.",
    template: "Stop scrolling. This is the only [topic] advice you actually need.",
    category: "Pattern Interrupt",
    platform: "IG Reels",
    views: "980K",
    saves: 7400,
    heat: 88,
  },
  {
    id: 4,
    text: "I asked 100 creators what made them go viral. Same answer every time.",
    template: "I asked [N] [people] what made them [succeed at X]. Same answer every time.",
    category: "Research",
    platform: "YouTube Shorts",
    views: "3.1M",
    saves: 18600,
    heat: 99,
  },
  {
    id: 5,
    text: "Your morning routine is costing you 3 hours of productivity every day.",
    template: "Your [habit] is costing you [number] [units] of [desired outcome] every day.",
    category: "Accusation",
    platform: "TikTok",
    views: "670K",
    saves: 5100,
    heat: 82,
  },
  {
    id: 6,
    text: "The content creator who taught me to charge 10x more",
    template: "The [person/thing] who taught me to [achieve X result] more",
    category: "Mentor Story",
    platform: "IG Reels",
    views: "1.2M",
    saves: 8900,
    heat: 91,
  },
];

const categories = ["All", "Story", "Curiosity", "Pattern Interrupt", "Research", "Accusation", "Mentor Story"];

function HeatBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#c0622a] to-[#e07848]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-[#888] w-7">{value}</span>
    </div>
  );
}

export default function HookVaultPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState<number | null>(null);

  const filtered = hooks.filter((h) => {
    const matchCat = activeCategory === "All" || h.category === activeCategory;
    const matchQuery =
      !query ||
      h.text.toLowerCase().includes(query.toLowerCase()) ||
      h.template.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  function copy(text: string, id: number) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
            <Flame className="h-5 w-5 text-[#c0622a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f0ebe5]">Hook Vault</h1>
            <p className="text-xs text-[#888]">{hooks.length} hooks saved &amp; templatized</p>
          </div>
        </div>
        <Button variant="terracotta" size="sm">
          <Plus className="h-4 w-4" />
          Add Hook
        </Button>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
          <Input
            placeholder="Search hooks or templates..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="md">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#c0622a] text-white"
                : "bg-[#1a1a1a] text-[#888] hover:text-[#f0ebe5] border border-[#2a2a2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((h) => (
          <Card key={h.id} className="group hover:border-[#c0622a]/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="muted">{h.category}</Badge>
                  <Badge variant="outline">{h.platform}</Badge>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Zap className="h-3.5 w-3.5 text-[#c0622a]" />
                  <span className="text-xs font-bold text-[#c0622a]">{h.heat}</span>
                </div>
              </div>

              <Tabs defaultValue="hook">
                <TabsList className="mb-3 bg-[#141414]">
                  <TabsTrigger value="hook">Hook</TabsTrigger>
                  <TabsTrigger value="template">Template</TabsTrigger>
                </TabsList>
                <TabsContent value="hook">
                  <p className="text-sm text-[#f0ebe5] leading-relaxed font-medium min-h-[3rem]">&ldquo;{h.text}&rdquo;</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => copy(h.text, h.id)}>
                      {copied === h.id ? "Copied!" : <><Copy className="h-3.5 w-3.5" /> Copy Hook</>}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Bookmark className="h-3.5 w-3.5" /> Save
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="template">
                  <p className="text-sm text-[#c0622a]/90 leading-relaxed font-mono min-h-[3rem]">{h.template}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => copy(h.template, h.id)}>
                      {copied === h.id ? "Copied!" : <><Copy className="h-3.5 w-3.5" /> Copy Template</>}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Bookmark className="h-3.5 w-3.5" /> Save
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-3 space-y-2 border-t border-[#222] pt-3">
                <div className="flex items-center justify-between text-xs text-[#555]">
                  <span>{h.views} views</span>
                  <span>{h.saves.toLocaleString()} saves</span>
                </div>
                <HeatBar value={h.heat} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
