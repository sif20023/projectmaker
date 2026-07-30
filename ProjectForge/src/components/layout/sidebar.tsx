"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutGrid, Settings, Plus, FolderOpen, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, projects, activeProjectId, setActiveProject } = useAppStore();

  if (!isSidebarOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={toggleSidebar} />
      <aside className="fixed left-0 top-16 bottom-0 w-64 border-r bg-background z-40 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:block md:top-0 md:border-r">
        <div className="flex items-center gap-2 p-4 border-b">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Projects</span>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <button
            onClick={() => setActiveProject(null)}
            className={cn(
              "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors",
              activeProjectId === null && "bg-accent text-accent-foreground"
            )}
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors truncate",
                activeProjectId === project.id && "bg-accent text-accent-foreground"
              )}
            >
              <FolderOpen className="h-4 w-4 shrink-0" />
              {project.name}
            </button>
          ))}
        </div>
        <div className="p-4 border-t">
          <Link href="/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
            AI Settings
          </Link>
        </div>
      </aside>
    </>
  );
}