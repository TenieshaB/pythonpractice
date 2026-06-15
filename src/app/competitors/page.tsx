"use client";
import { Users, RefreshCw, Eye, Heart, Play, TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const competitors = [
  {
    handle: "@garyvee",
    name: "Gary Vaynerchuk",
    followers: "10.2M",
    niche: "Entrepreneurship",
    avatar: "GV",
    color: "#1a1a2e",
    reels: [
      { title: "Stop waiting for the right moment", views: "4.2M", likes: "280K", hook: "Pattern Interrupt", heat: 97 },
      { title: "Why most people will never be rich", views: "2.8M", likes: "190K", hook: "Accusation", heat: 92 },
      { title: "The truth about social media in 2026", views: "1.9M", likes: "140K", hook: "Curiosity", heat: 87 },
    ],
  },
  {
    handle: "@alexhormozi",
    name: "Alex Hormozi",
    followers: "8.7M",
    niche: "Business",
    avatar: "AH",
    color: "#1a2e1a",
    reels: [
      { title: "How I closed $100M in deals with one script", views: "6.1M", likes: "410K", hook: "Research", heat: 99 },
      { title: "Your pricing is the problem (not your offer)", views: "3.4M", likes: "230K", hook: "Accusation", heat: 94 },
      { title: "I lost everything at 25 — then this happened", views: "2.7M", likes: "175K", hook: "Story", heat: 89 },
    ],
  },
  {
    handle: "@codiemko",
    name: "Codie Sanchez",
    followers: "5.3M",
    niche: "Investing",
    avatar: "CS",
    color: "#2e1a1a",
    reels: [
      { title: "Buy this boring business, not crypto", views: "3.8M", likes: "260K", hook: "Curiosity", heat: 96 },
      { title: "How I went from $0 to $10M in 3 years", views: "2.1M", likes: "150K", hook: "Story", heat: 90 },
      { title: "The passive income lie nobody talks about", views: "1.6M", likes: "110K", hook: "Pattern Interrupt", heat: 84 },
    ],
  },
];

const heatColor = (heat: number) => {
  if (heat >= 95) return "text-[#c0622a]";
  if (heat >= 85) return "text-amber-400";
  return "text-[#888]";
};

export default function CompetitorTrackerPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-[#c0622a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f0ebe5]">Competitor Tracker</h1>
            <p className="text-xs text-[#888]">Top reels from creators you track · scraped weekly</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="space-y-6">
        {competitors.map((creator) => (
          <Card key={creator.handle}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-[#f0ebe5]"
                    style={{ background: creator.color, border: "2px solid #2a2a2a" }}
                  >
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{creator.handle}</CardTitle>
                      <Badge variant="muted">{creator.niche}</Badge>
                    </div>
                    <p className="text-xs text-[#555] mt-0.5">{creator.name} · {creator.followers} followers</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {creator.reels.map((reel, i) => (
                  <div
                    key={i}
                    className="bg-[#141414] rounded-xl p-4 border border-[#222] hover:border-[#c0622a]/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="muted" className="text-[10px]">{reel.hook}</Badge>
                      <span className={`text-xs font-bold ${heatColor(reel.heat)}`}>
                        {reel.heat}🔥
                      </span>
                    </div>
                    <p className="text-sm text-[#f0ebe5] font-medium leading-snug mb-3 line-clamp-2">
                      {reel.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#555]">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {reel.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {reel.likes}
                      </span>
                    </div>
                    <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#c0622a]/10 text-[#c0622a] text-xs font-medium hover:bg-[#c0622a]/20 transition-colors opacity-0 group-hover:opacity-100">
                      <Play className="h-3 w-3" />
                      Use this angle
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-dashed border-[#333] bg-transparent">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
          <TrendingUp className="h-8 w-8 text-[#333]" />
          <p className="text-sm text-[#555]">Track a new creator</p>
          <Button variant="outline" size="sm" className="mt-1">
            <Users className="h-4 w-4" />
            Add Creator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
