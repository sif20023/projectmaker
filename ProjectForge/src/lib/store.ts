import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProjectBlueprint, AIConfig } from "@/types";
import { projectBlueprintSchema, aiConfigSchema } from "@/lib/schema";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function createDefaultBlueprint(): ProjectBlueprint {
  return {
    id: generateId(),
    name: "My Project",
    projectType: "todo",
    platform: "website",
    auth: "none",
    theme: "light",
    primaryColor: "blue",
    designStyle: "modern-saas",
    animations: "smooth",
    responsive: "both",
    frontend: "nextjs",
    backend: "none",
    database: "postgresql",
    styling: "tailwind",
    stateManagement: "zustand",
    payments: "none",
    emailProvider: "none",
    notifications: [],
    fileUpload: "none",
    admin: "none",
    analytics: "none",
    languages: ["english"],
    security: [],
    deployment: "vercel",
    tests: [],
    docs: ["readme"],
    gitFeatures: ["git"],
    optionalFeatures: [],
    currentStep: 1,
    lastUpdated: Date.now(),
  };
}

interface AppState {
  projects: ProjectBlueprint[];
  activeProjectId: string | null;
  aiConfig: AIConfig;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isAuthenticated: boolean;
  userEmail: string | null;
  isGuest: boolean;

  createProject: (name?: string) => ProjectBlueprint;
  updateProject: (id: string, data: Partial<ProjectBlueprint>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => ProjectBlueprint | undefined;
  updateAIConfig: (config: Partial<AIConfig>) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setAuthenticated: (email: string | null, isGuest: boolean) => void;
  exportBlueprint: (id: string) => string;
  reorderProjects: (ids: string[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      aiConfig: {
        apiKey: "",
        model: "openai/gpt-5.5",
        temperature: 0.7,
        maxTokens: 4096,
        connected: false,
      },
      isDarkMode: false,
      isSidebarOpen: false,
      isAuthenticated: false,
      userEmail: null,
      isGuest: false,

      createProject: (name) => {
        const blueprint = {
          ...createDefaultBlueprint(),
          id: generateId(),
          name: name || `Project ${get().projects.length + 1}`,
          lastUpdated: Date.now(),
        };
        set((state) => ({
          projects: [blueprint, ...state.projects],
          activeProjectId: blueprint.id,
        }));
        return blueprint;
      },

      updateProject: (id, data) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...data, lastUpdated: Date.now() } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId:
            state.activeProjectId === id ? null : state.activeProjectId,
        }));
      },

      duplicateProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) return;
        const duplicate = {
          ...project,
          id: generateId(),
          name: `${project.name} (Copy)`,
          lastUpdated: Date.now(),
        };
        set((state) => ({
          projects: [duplicate, ...state.projects],
        }));
      },

      setActiveProject: (id) => {
        set({ activeProjectId: id });
      },

      getActiveProject: () => {
        const state = get();
        return state.projects.find((p) => p.id === state.activeProjectId);
      },

      updateAIConfig: (config) => {
        set((state) => ({
          aiConfig: { ...state.aiConfig, ...config },
        }));
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      setAuthenticated: (email, isGuest) => {
        set({
          isAuthenticated: !!email || isGuest,
          userEmail: email,
          isGuest,
        });
      },

      exportBlueprint: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) return "";
        return JSON.stringify(projectBlueprintSchema.parse(project), null, 2);
      },

      reorderProjects: (ids) => {
        set((state) => ({
          projects: ids
            .map((id) => state.projects.find((p) => p.id === id))
            .filter(Boolean) as ProjectBlueprint[],
        }));
      },
    }),
    {
      name: "projectforge-storage",
      partialize: (state) => ({
        projects: state.projects,
        activeProjectId: state.activeProjectId,
        aiConfig: state.aiConfig,
        isDarkMode: state.isDarkMode,
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
        isGuest: state.isGuest,
      }),
    }
  )
);