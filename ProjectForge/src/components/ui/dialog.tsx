"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(open ?? false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    React.useEffect(() => {
      if (isControlled && open !== undefined) {
        setInternalOpen(open);
      }
    }, [open, isControlled]);

    return (
      <DialogContext.Provider value={{ open: isOpen, onOpenChange: onOpenChange ?? setInternalOpen }}>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" ref={ref} {...props}>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => {}} />
            <div className="relative z-50 w-full max-w-lg rounded-2xl border bg-background shadow-lg">
              {children}
            </div>
          </div>
        )}
      </DialogContext.Provider>
    );
  }
);
Dialog.displayName = "Dialog";

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)} {...props} />
  )
);
DialogHeader.displayName = "DialogHeader";

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative p-6", className)} {...props}>
      {children}
    </div>
  )
);
DialogContent.displayName = "DialogContent";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-end gap-2 p-6 pt-0", className)} {...props} />
  )
);
DialogFooter.displayName = "DialogFooter";

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter };
