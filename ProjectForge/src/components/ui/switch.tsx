"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <div
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            checked && "bg-primary",
            className
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
              checked ? "translate-x-6" : "translate-x-1"
            )}
          />
        </div>
        {label && <span className="text-sm">{label}</span>}
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          className="sr-only"
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
