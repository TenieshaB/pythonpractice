"use client";
import { useState } from "react";
import { TrendingUp, Zap, BookmarkPlus, RefreshCw, ExternalLink, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sources = [
  "TechCrunch", "The Verge", "Wired", "MIT Tech Review", "AI News",
  "Creator Economy", "Morning Brew", "The Information", "Axios", "Fast Company",
  "Forbes", "Bloomberg Tech",
];

const stories = [
  {
    id: 1,
    title: "OpenAI launches GPT-5 with real-time video understanding — creators react",
    source: "The Verge",
    time: "2h ago",
    hookScore: 97,
    tags: ["AI Tools", "Hook Potential", "Trending"],
    hookIdea: "I tested GPT-5 for 7 days so you don't have to — here's what actually matters",
    category: "AI Tools",
  },
  {
    id: 2,
    title: "Instagram quietly kills chronological feed again, pushing Reels harder",
    source: "TechCrunch",
    time: "3h ago",
    hookScore: 94,
    tags: ["Platform Changes", "Hook Potential"],
    hookIdea: "Instagram just changed the algorithm again — here's what creators need to do NOW",
    category: "Platform News",
  },
  {
    id: 3,
    title: "Creator economy hits $480B — but 96% of creators make under $50K/year",
    source: "Forbes",
    time: "5h ago",
    hookScore: 99,
    tags: ["Creator Economy", "Hook Potential", "Trending", "Data"],
    hookIdea: "96% of creators make less than $50K. I'm in the other 4% — here's the difference",
    category: "Creator Economy",
  },
  {
    id: 4,
    title: "TikTok tests 30-minute long-form videos to compete with YouTube",
    source: "Morning Brew",
    time: "6h ago",
    hookScore: 88,
    tags: ["Platform Changes", "TikTok"],
    hookIdea: "TikTok is becoming YouTube — and this changes everything for creators",
    category: "Platform News",
  },
  {
    id: 5,
    title: "New study: Saves predict virality 3x better than likes",
    source: "Creator Economy",
    time: "8h ago",
    hookScore: 96,
    tags: ["Data", "Hook Potential", "Strategy"],
    hookIdea: "Forget likes. Saves are the only metric that actually predicts virality (new study)",
    category: "Strategy",
  },
  {
    id: 6,
    title: "Meta announces AI-generated captions that match creator voice",
    source: "AI News",
    time: "9h ago",
    hookScore: 85,
    tags: ["AI Tools", "Meta"],
    hookIdea: "Meta's new AI writes captions in YOUR voice — I tried it so you don't have to",
    category: "AI Tools",
  },
  {
    id: 7,
    title: "YouTube Shorts monetization overtakes TikTok LIVE for most creators",
    source: "Wired",
    time: "11h ago",
    hookScore: 91,
    tags: ["Monetization", "Platform News"],
    hookIdea: "I made more from YouTube Shorts this month than TikTok — here's the breakdown",
    category: "Monetization",
  },
  {
    id: 8,
    title: "Anthropic's Claude adds code execution — AI agents can now build apps",
    source: "MIT Tech Review",
    time: "12h ago",
    hookScore: 82,
    tags: ["AI Tools"],
    hookIdea: "AI can now build entire apps from a voice note — the game just changed",
    category: "AI Tools",
  },
];

const allCategories = ["All", "AI Tools", "Platform News", "Creator Economy", "Strategy", "Monetization", "Data"];

const scoreColor = (score: number) => {
  if (score >= 95) return "text-[#c0622a]";
  if (score >= 88) return "text-amber-400";
  return "text-[#888]";
};

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = stories.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  function toggleSave(id: number) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-[#c0622a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f0ebe5]">What&apos;s Trending</h1>
            <p className="text-xs text-[#888]">AI news from 12 sources, tagged for hook potential</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4" />
          Refresh Feed
        </Button>
      </div>

      {/* Sources bar */}
      <div className="mb-5 flex gap-2 flex-wrap">
        {sources.map((s) => (
          <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#555]">
            {s}
          </span>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {allCategories.map((cat) => (
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

      {/* Stories grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((story) => (
          <Card key={story.id} className="group hover:border-[#c0622a]/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-medium text-[#555]">{story.source}</span>
                  <span className="text-[10px] text-[#444]">·</span>
                  <span className="text-[10px] text-[#444]">{story.time}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Zap className="h-3.5 w-3.5 text-[#c0622a]" />
                  <span className={`text-xs font-bold ${scoreColor(story.hookScore)}`}>
                    {story.hookScore}
                  </span>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#f0ebe5] mb-3 leading-snug">{story.title}</p>

              <div className="flex gap-1.5 flex-wrap mb-4">
                {story.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tag === "Hook Potential" ? "terracotta" : tag === "Trending" ? "default" : "muted"}
                    className="text-[10px]"
                  >
                    {tag === "Hook Potential" && <Flame className="h-2.5 w-2.5 mr-0.5" />}
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Hook idea */}
              <div className="bg-[#c0622a]/5 border border-[#c0622a]/20 rounded-lg p-3 mb-3">
                <p className="text-[10px] text-[#c0622a] font-semibold uppercase tracking-wide mb-1">Hook Idea</p>
                <p className="text-xs text-[#f0ebe5]/80 italic leading-relaxed">&ldquo;{story.hookIdea}&rdquo;</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleSave(story.id)}
                >
                  <BookmarkPlus className={`h-3.5 w-3.5 ${saved.includes(story.id) ? "text-[#c0622a]" : ""}`} />
                  {saved.includes(story.id) ? "Saved to Vault" : "Save to Vault"}
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Read
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
