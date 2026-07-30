"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/layout/progress-bar";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { projectBlueprintSchema } from "@/lib/schema";
import { livePreviewItems } from "@/lib/preview-items";
import { StepNavigator } from "@/components/builder/step-navigator";
import { renderStep } from "@/components/builder/render-step";
import { LivePreview } from "@/components/preview/live-preview";
import type { ProjectBlueprint } from "@/types";

const STEP_TITLES = [
  "Project Type", "Platform", "Authentication", "Theme", "Primary Color",
  "Design Style", "Animations", "Responsive", "Frontend", "Backend",
  "Database", "Styling", "State Management", "Payments", "Email Provider",
  "Notifications", "File Upload", "Admin Dashboard", "Analytics", "Languages",
  "Security", "Deployment", "Testing", "Documentation", "Git Features",
  "Optional Features",
];

export default function BuilderPage() {
  const { projects, activeProjectId, updateProject, getActiveProject } = useAppStore();
  const project = getActiveProject();
  const [currentStep, setCurrentStep] = React.useState(1);

  React.useEffect(() => {
    if (project) {
      setCurrentStep(project.currentStep || 1);
    }
  }, [project?.id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No project selected</h2>
        <p className="text-muted-foreground mb-6">Create or select a project from the dashboard to start building.</p>
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const handleUpdate = (data: Partial<ProjectBlueprint>) => {
    updateProject(project.id, { ...data, currentStep });
  };

  const handleNext = () => {
    if (currentStep < 26) {
      setCurrentStep(currentStep + 1);
      updateProject(project.id, { currentStep: currentStep + 1 });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      updateProject(project.id, { currentStep: currentStep - 1 });
    }
  };

  const handleReset = () => {
    const defaultBlueprint = {
      id: project.id,
      name: project.name,
      projectType: "todo" as const,
      platform: "website" as const,
      auth: "none" as const,
      theme: "light" as const,
      primaryColor: "blue" as const,
      designStyle: "modern-saas" as const,
      animations: "smooth" as const,
      responsive: "both" as const,
      frontend: "nextjs" as const,
      backend: "none" as const,
      database: "postgresql" as const,
      styling: "tailwind" as const,
      stateManagement: "zustand" as const,
      payments: "none" as const,
      emailProvider: "none" as const,
      notifications: [] as string[],
      fileUpload: "none" as const,
      admin: "none" as const,
      analytics: "none" as const,
      languages: ["english"] as string[],
      security: [] as string[],
      deployment: "vercel" as const,
      tests: [] as string[],
      docs: ["readme"] as string[],
      gitFeatures: ["git"] as string[],
      optionalFeatures: [] as string[],
      currentStep: 1,
      lastUpdated: Date.now(),
    };
    updateProject(project.id, defaultBlueprint);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Builder</h1>
          <p className="text-muted-foreground mt-1">
            Step {currentStep} of 26 — {STEP_TITLES[currentStep - 1]}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button asChild size="sm">
            <Link href="/settings">AI Settings</Link>
          </Button>
        </div>
      </div>

      <ProgressBar currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>{STEP_TITLES[currentStep - 1]}</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep(currentStep, project, handleUpdate)}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < 26 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button asChild>
                <Link href="/generate">Generate Project</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <LivePreview project={project} />
        </div>
      </div>
    </div>
  );
}