import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-[#f0ebe5] placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#c0622a] transition-all",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
