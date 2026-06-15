"use client";
import { useState } from "react";
import { Calendar, Send, Sparkles, Clock, CheckCircle2, Upload } from "lucide-react";

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.81 1.55V6.79a4.85 4.85 0 0 1-1.04-.1z"/>
    </svg>
  );
}

const platforms = [
  { id: "ig", label: "Instagram", icon: IgIcon, color: "#e1306c" },
  { id: "tiktok", label: "TikTok", icon: TikTokIcon, color: "#69c9d0" },
  { id: "yt", label: "YouTube Shorts", icon: YtIcon, color: "#ff0000" },
];

const queue = [
  {
    id: 1,
    title: "Why most creators plateau at 10k followers",
    platforms: ["ig", "tiktok"],
    scheduledFor: "Today · 6:00 PM",
    status: "scheduled",
    caption: "Most creators hit a wall at 10k and never break through. Here's the invisible ceiling stopping your growth... 🧱\n\n#creatortips #socialmedia #contentcreator",
  },
  {
    id: 2,
    title: "Morning routine walkthrough (real system)",
    platforms: ["ig", "yt"],
    scheduledFor: "Tomorrow · 8:00 AM",
    status: "scheduled",
    caption: "This is the actual morning routine that doubled my content output. No fluff, no filters. 🌅\n\n#morningroutine #productivity #contentcreator",
  },
  {
    id: 3,
    title: "The $0 growth strategy that got me 50K",
    platforms: ["ig", "tiktok", "yt"],
    scheduledFor: "Jun 17 · 12:00 PM",
    status: "draft",
    caption: "",
  },
];

const platformMap: Record<string, { label: string; color: string }> = {
  ig: { label: "Instagram", color: "#e1306c" },
  tiktok: { label: "TikTok", color: "#69c9d0" },
  yt: { label: "YouTube", color: "#ff0000" },
};

export default function SchedulerPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["ig"]);
  const [caption, setCaption] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function togglePlatform(id: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function generateCaption() {
    setGenerating(true);
    setTimeout(() => {
      setCaption(
        "Most people think going viral is luck. It's not — it's a system. Here's the exact framework I used to grow from 0 to 50K without spending a single dollar on ads. 🎯\n\nSave this for later and share with a creator who needs it.\n\n#creatortips #viralcontent #contentstrategy #growyouraudience"
      );
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-[#c0622a]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#f0ebe5]">Scheduler</h1>
          <p className="text-xs text-[#888]">One-click multi-platform scheduling</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Composer */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload area */}
              <div className="border-2 border-dashed border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#c0622a]/40 transition-colors cursor-pointer group">
                <div className="h-10 w-10 rounded-full bg-[#1e1e1e] group-hover:bg-[#c0622a]/10 flex items-center justify-center transition-colors">
                  <Upload className="h-5 w-5 text-[#555] group-hover:text-[#c0622a]" />
                </div>
                <p className="text-sm text-[#555]">Drop your video here or click to upload</p>
                <Badge variant="muted" className="text-[10px]">MP4, MOV · max 500MB</Badge>
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#888]">Caption</label>
                  <Button variant="ghost" size="sm" onClick={generateCaption} disabled={generating}>
                    <Sparkles className="h-3.5 w-3.5 text-[#c0622a]" />
                    {generating ? "Generating..." : generated ? "Regenerate" : "AI Generate"}
                  </Button>
                </div>
                <textarea
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-sm text-[#f0ebe5] placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#c0622a] resize-none transition-all"
                  rows={6}
                  placeholder="Write your caption or use AI to generate one..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <p className="text-right text-xs text-[#555] mt-1">{caption.length} chars</p>
              </div>

              {/* Platforms */}
              <div>
                <label className="text-xs text-[#888] mb-2 block">Post to</label>
                <div className="flex gap-2 flex-wrap">
                  {platforms.map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => togglePlatform(id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                        selectedPlatforms.includes(id)
                          ? "border-[#c0622a] bg-[#c0622a]/10 text-[#f0ebe5]"
                          : "border-[#2a2a2a] text-[#555] hover:border-[#444]"
                      }`}
                    >
                      <Icon />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule time */}
              <div>
                <label className="text-xs text-[#888] mb-2 block">Schedule for</label>
                <div className="flex gap-2">
                  <Input type="date" className="flex-1" defaultValue="2026-06-16" />
                  <Input type="time" className="w-36" defaultValue="18:00" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="terracotta" className="flex-1">
                  <Send className="h-4 w-4" />
                  Schedule Post
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Queue</CardTitle>
                <Badge variant="terracotta">{queue.length} posts</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.map((post) => (
                <div key={post.id} className="bg-[#141414] rounded-xl p-3 border border-[#222] hover:border-[#333] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm text-[#f0ebe5] font-medium leading-snug line-clamp-2">{post.title}</p>
                    {post.status === "scheduled" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Badge variant="muted" className="text-[10px] shrink-0">Draft</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="h-3 w-3 text-[#555]" />
                    <span className="text-xs text-[#555]">{post.scheduledFor}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {post.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{ background: `${platformMap[p].color}20`, color: platformMap[p].color }}
                      >
                        {platformMap[p].label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
