"use client";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Flame, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events: Record<number, { title: string; type: "hook" | "angle" | "reel" | "empty"; platform?: string }[]> = {
  2: [{ title: "Hook: The truth nobody tells you...", type: "hook", platform: "IG" }],
  4: [{ title: "Angle: Morning routine breakdown", type: "angle", platform: "TikTok" }],
  5: [{ title: "Reel: $0 growth strategy", type: "reel", platform: "Multi" }],
  9: [{ title: "Hook: I asked 100 creators...", type: "hook", platform: "IG" }],
  11: [{ title: "Angle: Why saves > followers", type: "angle", platform: "YouTube" }],
  12: [{ title: "Reel: DM script walkthrough", type: "reel", platform: "Multi" }],
  15: [{ title: "Hook: Stop doing this...", type: "hook", platform: "TikTok" }],
  16: [{ title: "Angle: Content batching system", type: "angle", platform: "IG" }],
  18: [{ title: "Reel: Competitor breakdown", type: "reel", platform: "Multi" }],
  19: [{ title: "Hook: Nobody warned me about...", type: "hook", platform: "IG" }],
  22: [{ title: "Reel: Behind the scenes", type: "reel", platform: "Multi" }],
  23: [{ title: "Angle: Pricing psychology", type: "angle", platform: "TikTok" }],
  25: [{ title: "Hook: The creator who changed...", type: "hook", platform: "IG" }],
  26: [{ title: "Reel: 30-day growth recap", type: "reel", platform: "Multi" }],
  30: [{ title: "Angle: Month-end review", type: "angle", platform: "YouTube" }],
};

const typeStyles = {
  hook: { bg: "bg-[#c0622a]/20", text: "text-[#e07848]", dot: "bg-[#c0622a]" },
  angle: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-500" },
  reel: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
  empty: { bg: "", text: "", dot: "" },
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function ContentCalendarPage() {
  const [month, setMonth] = useState(5); // June (0-indexed)
  const [year] = useState(2026);
  const [selected, setSelected] = useState<number | null>(15);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const selectedEvents = selected ? events[selected] ?? [] : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#c0622a]/20 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-[#c0622a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#f0ebe5]">Content Calendar</h1>
            <p className="text-xs text-[#888]">Auto-filled with hooks and angles from /script</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setMonth((m) => Math.max(0, m - 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold text-[#f0ebe5] w-32 text-center">
            {months[month]} {year}
          </span>
          <Button variant="ghost" size="icon" onClick={() => setMonth((m) => Math.min(11, m + 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="terracotta" size="sm">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-[#555] py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;
                  const dayEvents = events[day] ?? [];
                  const isToday = day === 15 && month === 5;
                  const isSelected = day === selected;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelected(day)}
                      className={cn(
                        "relative min-h-16 p-1.5 rounded-lg text-left transition-all cursor-pointer border",
                        isSelected
                          ? "border-[#c0622a] bg-[#c0622a]/5"
                          : isToday
                          ? "border-[#333] bg-[#1e1e1e]"
                          : "border-transparent hover:border-[#2a2a2a] hover:bg-[#1a1a1a]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-medium flex h-5 w-5 items-center justify-center rounded-full",
                          isToday ? "bg-[#c0622a] text-white text-[10px]" : "text-[#888]"
                        )}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.map((ev, j) => (
                          <div
                            key={j}
                            className={cn(
                              "flex items-center gap-1 rounded px-1 py-0.5",
                              typeStyles[ev.type].bg
                            )}
                          >
                            <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", typeStyles[ev.type].dot)} />
                            <span className={cn("text-[9px] font-medium truncate leading-tight", typeStyles[ev.type].text)}>
                              {ev.platform}
                            </span>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex gap-4 mt-3 px-1">
            {[
              { type: "hook" as const, label: "Hook" },
              { type: "angle" as const, label: "Angle" },
              { type: "reel" as const, label: "Reel" },
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-1.5 text-xs text-[#555]">
                <span className={cn("h-2 w-2 rounded-full", typeStyles[type].dot)} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Day detail panel */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {selected ? `${months[month]} ${selected}` : "Select a day"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <CalendarDays className="h-8 w-8 text-[#333]" />
                  <p className="text-sm text-[#555]">No content scheduled</p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                    Add Content
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((ev, i) => (
                    <div key={i} className={cn("rounded-xl p-3 border border-[#222]", typeStyles[ev.type].bg)}>
                      <div className="flex items-center gap-2 mb-1">
                        {ev.type === "hook" && <Flame className="h-3.5 w-3.5 text-[#c0622a]" />}
                        {ev.type === "angle" && <FileText className="h-3.5 w-3.5 text-purple-400" />}
                        {ev.type === "reel" && <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                        <Badge variant="muted" className="text-[10px] capitalize">{ev.type}</Badge>
                        {ev.platform && (
                          <span className="text-[10px] text-[#555] ml-auto">{ev.platform}</span>
                        )}
                      </div>
                      <p className={cn("text-sm font-medium leading-snug", typeStyles[ev.type].text)}>
                        {ev.title}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Plus className="h-4 w-4" />
                    Add more
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
