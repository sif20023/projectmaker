"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FolderOpen, Copy, Trash2, Download, Clock, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import type { ProjectBlueprint } from "@/types";

function DifficultyBadge({ project }: { project: ProjectBlueprint }) {
  const scores = [
    project.auth !== "none" ? 1 : 0,
    project.backend !== "none" ? 1 : 0,
    project.database !== "none" && project.database !== "sqlite" ? 1 : 0,
    project.payments !== "none" ? 1 : 0,
    project.admin !== "none" ? 1 : 0,
    project.optionalFeatures.length > 5 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  if (scores <= 2) return <Badge variant="success">Easy</Badge>;
  if (scores <= 4) return <Badge variant="secondary">Medium</Badge>;
  return <Badge variant="destructive">Hard</Badge>;
}

function CostEstimate({ project }: { project: ProjectBlueprint }) {
  let cost = 0;
  if (project.payments !== "none") cost += 25;
  if (project.database === "supabase" || project.database === "firebase") cost += 0;
  if (project.database === "postgresql" || project.database === "mysql") cost += 7;
  if (project.admin !== "none") cost += 10;
  if (project.emailProvider !== "none") cost += 0;
  if (project.analytics !== "none") cost += 0;
  if (project.docs.includes("architecture-diagram") || project.docs.includes("database-diagram")) cost += 0;
  if (cost === 0) cost = 5;
  if (cost <= 10) return <span className="text-green-600 dark:text-green-400 font-medium">Low</span>;
  if (cost <= 25) return <span className="text-yellow-600 dark:text-yellow-400 font-medium">Medium</span>;
  return <span className="text-red-600 dark:text-red-400 font-medium">High</span>;
}

function TimelineEstimate({ project }: { project: ProjectBlueprint }) {
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
  if (project.payments !== "none") weeks += 1;
  if (project.emailProvider !== "none") weeks += 0.5;
  return <span className="font-medium">{weeks} Week{weeks !== 1 ? "s" : ""}</span>;
}

export default function DashboardPage() {
  const { projects, setActiveProject, deleteProject, duplicateProject, exportBlueprint, createProject } = useAppStore();
  const { addToast } = useToast();
  const [showNewProject, setShowNewProject] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleCreate = () => {
    const name = newName.trim() || undefined;
    const project = createProject(name);
    setShowNewProject(false);
    setNewName("");
    addToast("Project created", `Started a new project: ${project.name}`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteProject(id);
    addToast("Project deleted", `${name} has been removed.`);
  };

  const handleExport = (id: string) => {
    const json = exportBlueprint(id);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blueprint.json";
    a.click();
    URL.revokeObjectURL(url);
    addToast("Exported", "Blueprint downloaded as JSON.");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your projects and continue building.</p>
        </div>
        <Button onClick={() => setShowNewProject(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {showNewProject && (
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Project name..."
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
              <Button onClick={handleCreate}>Create</Button>
              <Button variant="outline" onClick={() => setShowNewProject(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {projects.length === 0 ? (
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center mb-4">Create your first project to get started.</p>
            <Button onClick={() => setShowNewProject(true)}>Create Your First Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="mt-1 capitalize">
                        {project.projectType.replace("-", " ")}
                      </CardDescription>
                    </div>
                    <DifficultyBadge project={project} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-3 w-3" />
                      <span className="capitalize">{project.frontend}</span>
                      <span className="text-muted-foreground/50">+</span>
                      <span className="capitalize">{project.backend}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <TimelineEstimate project={project} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <CostEstimate project={project} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link
                        href="/builder"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project.id);
                        }}
                      >
                        Continue
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleExport(project.id);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        duplicateProject(project.id);
                        addToast("Duplicated", `${project.name} duplicated.`);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete “{project.name}”? This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(project.id, project.name)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}