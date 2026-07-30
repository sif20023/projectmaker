"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StepNavigatorProps {
  currentStep: number;
  steps: string[];
  onStepClick: (step: number) => void;
}

export function StepNavigator({ currentStep, steps, onStepClick }: StepNavigatorProps) {
  return (
    <Card className="rounded-xl h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Steps</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-1 p-4">
            {steps.map((title, i) => {
              const step = i + 1;
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;
              return (
                <button
                  key={step}
                  onClick={() => onStepClick(step)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    isActive && "bg-primary/10 text-primary font-medium",
                    !isActive && "hover:bg-accent",
                    isCompleted && "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium shrink-0",
                      isActive && "bg-primary text-primary-foreground",
                      isCompleted && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? "✓" : step}
                  </span>
                  <span className="truncate">{title}</span>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}