"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ className, open, onOpenChange, side = "right", children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(open ?? false);
    const isOpen = open !== undefined ? open : internalOpen;

    return (
      <SheetContext.Provider value={{ open: isOpen, onOpenChange: onOpenChange ?? setInternalOpen }}>
        {isOpen && (
          <div className="fixed inset-0 z-50" ref={ref} {...props}>
            <div className="fixed inset-0 bg-black/50" onClick={() => {}} />
            <div
              className={cn(
                "fixed top-0 z-50 h-full w-full max-w-sm bg-background shadow-xl transition-transform duration-300",
                side === "right" && "right-0",
                side === "left" && "left-0",
                side === "top" && "top-0",
                side === "bottom" && "bottom-0",
                className
              )}
            >
              <button
                onClick={() => {}}
                className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-6">{children}</div>
            </div>
          </div>
        )}
      </SheetContext.Provider>
    );
  }
);
Sheet.displayName = "Sheet";

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 pb-4", className)} {...props} />
  )
);
SheetHeader.displayName = "SheetHeader";

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
SheetTitle.displayName = "SheetTitle";

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
SheetDescription.displayName = "SheetDescription";

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetContent };
