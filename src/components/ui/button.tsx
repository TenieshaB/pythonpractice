"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "terracotta" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "default" && "bg-[#2a2a2a] text-[#f0ebe5] hover:bg-[#333]",
          variant === "terracotta" && "bg-[#c0622a] text-white hover:bg-[#e07848]",
          variant === "ghost" && "text-[#888] hover:text-[#f0ebe5] hover:bg-[#1e1e1e]",
          variant === "outline" && "border border-[#2a2a2a] text-[#f0ebe5] hover:bg-[#1e1e1e]",
          size === "sm" && "text-xs px-2.5 py-1.5",
          size === "md" && "text-sm px-4 py-2",
          size === "lg" && "text-base px-6 py-3",
          size === "icon" && "h-8 w-8 p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
