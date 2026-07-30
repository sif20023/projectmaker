"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(open ?? false);
    const isOpen = open !== undefined ? open : internalOpen;
    return (
      <AlertDialogContext.Provider value={{ open: isOpen, onOpenChange: onOpenChange ?? setInternalOpen }}>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" ref={ref} {...props}>
            <div className="fixed inset-0 bg-black/50" />
            <div className="relative z-50 w-full max-w-md rounded-2xl border bg-background shadow-lg p-6">
              {children}
            </div>
          </div>
        )}
      </AlertDialogContext.Provider>
    );
  }
);
AlertDialog.displayName = "AlertDialog";

interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("", className)} {...props} />
  )
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
);
AlertDialogContent.displayName = "AlertDialogContent";

interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
  )
);
AlertDialogHeader.displayName = "AlertDialogHeader";

interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-end gap-2", className)} {...props} />
  )
);
AlertDialogFooter.displayName = "AlertDialogFooter";

interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", className)} {...props} />
  )
);
AlertDialogAction.displayName = "AlertDialogAction";

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("rounded-lg border border-input px-4 py-2 text-sm font-medium", className)} {...props} />
  )
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel };
