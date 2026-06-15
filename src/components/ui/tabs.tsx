"use client";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

const TabsContext = createContext<{ active: string; setActive: (v: string) => void }>({
  active: "",
  setActive: () => {},
});

export function Tabs({
  defaultValue,
  className,
  children,
}: {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-lg bg-[#1a1a1a] p-1", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        "px-3 py-1.5 text-sm rounded-md transition-all cursor-pointer",
        active === value
          ? "bg-[#c0622a] text-white font-medium"
          : "text-[#888] hover:text-[#f0ebe5]"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div>{children}</div>;
}
