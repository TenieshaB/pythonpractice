"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  BarChart2,
  Users,
  Calendar,
  CalendarDays,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Hook Vault", icon: Flame },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/competitors", label: "Competitor Tracker", icon: Users },
  { href: "/scheduler", label: "Scheduler", icon: Calendar },
  { href: "/calendar", label: "Content Calendar", icon: CalendarDays },
  { href: "/trending", label: "What's Trending", icon: TrendingUp },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col bg-[#141414] border-r border-[#222] z-40">
      {/* Brand header */}
      <div className="px-4 py-5 border-b border-[#222]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#c0622a] flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#f0ebe5] leading-tight">@tenfoldmarc</div>
            <div className="text-[10px] text-[#888] leading-tight">Creator Dashboard</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                active
                  ? "bg-[#c0622a]/15 text-[#e07848] font-medium"
                  : "text-[#888] hover:text-[#f0ebe5] hover:bg-[#1e1e1e]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-[#c0622a]" : "text-[#555] group-hover:text-[#888]"
                )}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c0622a]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#222]">
        <div className="text-[10px] text-[#444] text-center">tenfold studio © 2026</div>
      </div>
    </aside>
  );
}
