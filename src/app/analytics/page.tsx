"use client";
import { BarChart2, Eye, Heart, UserPlus, Bookmark, TrendingUp, Flame, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", views: 42000, saves: 1200, follows: 380 },
  { day: "Tue", views: 58000, saves: 1800, follows: 520 },
  { day: "Wed", views: 91000, saves: 3100, follows: 890 },
  { day: "Thu", views: 67000, saves: 2200, follows: 610 },
  { day: "Fri", views: 130000, saves: 5400, follows: 1800 },
  { day: "Sat", views: 210000, saves: 8900, follows: 2400 },
  { day: "Sun", views: 175000, saves: 7200, follows: 1950 },
];

const heaters = [
  { rank: 1, title: "Why most creators plateau at 10k followers", views: "2.4M", saves: "18.6K", change: +42 },
  { rank: 2, title: "Morning routine that doubled my output", views: "1.9M", saves: "12.1K", change: +28 },
  { rank: 3, title: "I spent $0 on ads and got 50K followers", views: "1.2M", saves: "9.8K", change: +15 },
  { rank: 4, title: "Content calendar walkthrough (real system)", views: "890K", saves: "7.4K", change: -8 },
  { rank: 5, title: "The DM that changed my business", views: "670K", saves: "5.1K", change: +6 },
];

const statCards = [
  { label: "Total Views", value: "773K", sub: "this week", delta: +23, icon: Eye, color: "#c0622a" },
  { label: "Saves", value: "29.8K", sub: "this week", delta: +18, icon: Bookmark, color: "#7c3aed" },
  { label: "New Followers", value: "8.5K", sub: "this week", delta: +31, icon: UserPlus, color: "#0ea5e9" },
  { label: "Avg. Reach", value: "110K", sub: "per post", delta: +12, icon: TrendingUp, color: "#10b981" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-xs shadow-xl">
        <p className="text-[#888] mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-[#f0ebe5]">
            {p.dataKey}: <span className="text-[#c0622a] font-bold">{p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
          <BarChart2 className="h-5 w-5 text-[#c0622a]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#f0ebe5]">Analytics</h1>
          <p className="text-xs text-[#888]">Instagram performance — week of Jun 9–15</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, sub, delta, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${delta > 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  {delta > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(delta)}%
                </span>
              </div>
              <div className="text-2xl font-bold text-[#f0ebe5]">{value}</div>
              <div className="text-xs text-[#555] mt-0.5">{label} · {sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Views this week</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="views">
              <TabsList className="mb-4">
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="saves">Saves</TabsTrigger>
                <TabsTrigger value="follows">Follows</TabsTrigger>
              </TabsList>
              <TabsContent value="views">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c0622a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c0622a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="views" stroke="#c0622a" strokeWidth={2} fill="url(#viewsGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="saves">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="saves" fill="#c0622a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="follows">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="followsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="follows" stroke="#7c3aed" strokeWidth={2} fill="url(#followsGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best posting times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: "Fri 6–8 PM", score: 99, label: "Peak" },
                { time: "Sat 10–12 AM", score: 94, label: "High" },
                { time: "Sun 7–9 PM", score: 91, label: "High" },
                { time: "Wed 12–2 PM", score: 85, label: "Good" },
                { time: "Tue 8–10 AM", score: 78, label: "Good" },
              ].map(({ time, score, label }) => (
                <div key={time} className="flex items-center gap-3">
                  <div className="text-xs text-[#888] w-28 shrink-0">{time}</div>
                  <div className="flex-1 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#c0622a] to-[#e07848]"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <Badge variant={score >= 95 ? "terracotta" : "muted"} className="w-12 justify-center">
                    {label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top heaters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#c0622a]" />
            <CardTitle>Top Heaters This Week</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {heaters.map(({ rank, title, views, saves, change }) => (
              <div key={rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#222] transition-colors">
                <span className={`text-lg font-black w-6 text-center ${rank === 1 ? "text-[#c0622a]" : "text-[#444]"}`}>
                  {rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#f0ebe5] font-medium truncate">{title}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-[#555]">{views} views</span>
                    <span className="text-xs text-[#555]">{saves} saves</span>
                  </div>
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium shrink-0 ${change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(change)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
