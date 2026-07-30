"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastContextValue {
  toasts: Array<{ id: string; title: string; description: string; type: "success" | "error" | "info" }>;
  addToast: (toast: { title: string; description: string; type?: "success" | "error" | "info" }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<{ id: string; title: string; description: string; type: "success" | "error" | "info" }>>([]);

  const addToast = React.useCallback(
    (toast: { title: string; description: string; type?: "success" | "error" | "info" }) => {
      const id = Math.random().toString(36).substring(2);
      setToasts((prev) => [...prev, { ...toast, type: toast.type ?? "info", id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full",
              toast.type === "success" && "border-green-500 bg-green-50 dark:bg-green-950",
              toast.type === "error" && "border-red-500 bg-red-50 dark:bg-red-950",
              toast.type === "info" && "border-blue-500 bg-blue-50 dark:bg-blue-950"
            )}
          >
            <p className="font-medium text-sm">{toast.title}</p>
            <p className="text-sm text-muted-foreground">{toast.description}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="mt-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}