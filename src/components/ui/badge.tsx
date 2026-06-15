import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "terracotta" | "muted" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-[#2a2a2a] text-[#f0ebe5]",
        variant === "terracotta" && "bg-[#c0622a] text-white",
        variant === "muted" && "bg-[#1e1e1e] text-[#888]",
        variant === "outline" && "border border-[#2a2a2a] text-[#888]",
        className
      )}
      {...props}
    />
  );
}
