"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { livePreviewItems } from "@/lib/preview-items";

export function LivePreview({ project }: { project: any }) {
  const getDifficulty = () => {
    const score = [
      project.auth !== "none" ? 1 : 0,
      project.backend !== "none" ? 1 : 0,
      project.database !== "none" && project.database !== "sqlite" ? 1 : 0,
      project.payments !== "none" ? 1 : 0,
      project.admin !== "none" ? 1 : 0,
      project.optionalFeatures.length > 5 ? 1 : 0,
      project.tests.length > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
    if (score <= 2) return { label: "Easy", variant: "success" as const };
    if (score <= 4) return { label: "Medium", variant: "secondary" as const };
    return { label: "Hard", variant: "destructive" as const };
  };

  const getCost = () => {
    let cost = 0;
    if (project.payments !== "none") cost += 25;
    if (project.database === "postgresql" || project.database === "mysql") cost += 7;
    if (project.admin !== "none") cost += 10;
    if (cost === 0) cost = 5;
    if (cost <= 10) return { label: "Low", color: "text-green-600 dark:text-green-400" };
    if (cost <= 25) return { label: "Medium", color: "text-yellow-600 dark:text-yellow-400" };
    return { label: "High", color: "text-red-600 dark:text-red-400" };
  };

  const getTimeline = () => {
    let weeks = 1;
    if (project.backend !== "none") weeks += 1;
    if (project.database !== "none" && project.database !== "sqlite") weeks += 1;
    if (project.payments !== "none") weeks += 1;
    if (project.admin !== "none") weeks += 1;
    if (project.analytics !== "none") weeks += 0.5;
    if (project.optionalFeatures.length > 5) weeks += 1;
    if (project.tests.length > 0) weeks += 1;
    if (project.languages.length > 1) weeks += 0.5;
    if (project.security.length > 0) weeks += 0.5;
    return `${weeks} week${weeks !== 1 ? "s" : ""}`;
  };

  return (
    <Card className="rounded-xl sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Brain className="h-4 w-4 text-primary" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {livePreviewItems.map((item) => {
          const value = item.source(project);
          if (value === undefined || value === null || value === "") return null;
          return (
            <div key={item.key} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <Badge variant="outline" className="capitalize">
                {String(value).replace(/-/g, " ")}
              </Badge>
            </div>
          );
        })}

        <div className="border-t pt-3 mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Difficulty</span>
            <Badge variant={getDifficulty().variant}>{getDifficulty().label}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Build Time</span>
            <span className="font-medium">{getTimeline()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Est. Cost</span>
            <span className={cn("font-medium", getCost().color)}>{getCost().label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}