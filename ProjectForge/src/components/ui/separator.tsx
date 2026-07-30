"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHrElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLHrElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "shrink-0 border-border",
        orientation === "horizontal" ? "h-px w-full" : "",
        orientation === "vertical" ? "h-full w-px" : "",
        className
      )}
      role={decorative ? "presentation" : undefined}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
