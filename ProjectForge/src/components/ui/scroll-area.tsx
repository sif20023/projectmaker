"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "scroll" | "auto";
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, type = "scroll", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <div className={cn("h-full w-full overflow-y-auto", type === "auto" && "overflow-x-hidden")}>
          {children}
        </div>
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
