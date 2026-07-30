"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Copy, Check, FileJson, BookOpen, Code, GitBranch, Shield, Clock, Rocket, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { generateBlueprint } from "@/lib/generator";

export default function GeneratePage() {
  const { getActiveProject } = useAppStore();
  const project = getActiveProject();
  const [generated, setGenerated] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("summary");
  const { addToast } = useToast();

  React.useEffect(() => {
    if (project) {
      setGenerated(generateBlueprint(project));
    }
  }, [project?.id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground mb-4">No project selected.</p>
        <Button asChild><Link href="/dashboard">Go to Dashboard</Link></Button>
      </div>
    );
  }

  const handleCopy = () => {
    if (generated) {
      navigator.clipboard.writeText(generated);
      addToast("Copied", "Blueprint copied to clipboard.");
    }
  };

  const handleDownload = () => {
    if (generated) {
      const blob = new Blob([generated], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.name.replace(/\s+/g, "-")}-blueprint.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast("Downloaded", "Blueprint downloaded.");
    }
  };

  if (!generated) {
    return <div className="py-20 text-center text-muted-foreground">Generating blueprint...</div>;
  }

  const parsed = JSON.parse(generated);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blueprint Generated</h1>
          <p className="text-muted-foreground mt-1">
            {project.name} — Complete architecture and implementation plan.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Rocket, label: "Frontend", value: parsed.frontend, color: "blue" },
          { icon: Code, label: "Backend", value: parsed.backend, color: "green" },
          { icon: Database, label: "Database", value: parsed.database, color: "purple" },
          { icon: Shield, label: "Security", value: parsed.security.length, color: "orange" },
          { icon: GitBranch, label: "Deploy", value: parsed.deployment, color: "cyan" },
          { icon: Clock, label: "Testing", value: `${parsed.tests.length} types`, color: "pink" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="font-semibold capitalize">{String(stat.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>Project Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>Project:</strong> {parsed.name}</p>
              <p><strong>Type:</strong> {parsed.projectType}</p>
              <p><strong>Platform:</strong> {parsed.platform}</p>
              <p><strong>Theme:</strong> {parsed.theme}</p>
              <p><strong>Design:</strong> {parsed.designStyle}</p>
              <p><strong>Difficulty:</strong> {estimateDifficulty(parsed)}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>Folder Structure & Schema</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <pre className="text-sm whitespace-pre-wrap bg-muted/50 rounded-lg p-4">
                  {generateFolderStructure(parsed)}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>Development Roadmap</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {generateRoadmap(parsed).map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Badge variant="outline" className="shrink-0 mt-0.5">Week {item.week}</Badge>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="mt-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>AI Prompt Pack</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <pre className="text-sm whitespace-pre-wrap bg-muted/50 rounded-lg p-4">
                  {generatePrompts(parsed)}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function estimateDifficulty(p: any) {
  const score = [
    p.auth !== "none" ? 1 : 0, p.backend !== "none" ? 1 : 0,
    p.database !== "none" && p.database !== "sqlite" ? 1 : 0,
    p.payments !== "none" ? 1 : 0, p.admin !== "none" ? 1 : 0,
    p.optionalFeatures.length > 5 ? 1 : 0, p.tests.length > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  if (score <= 2) return "Easy";
  if (score <= 4) return "Medium";
  return "Hard";
}

function generateFolderStructure(p: any) {
  const lines = [
    `📁 ${p.name.replace(/\s+/g, "-")}/`,
    `├── 📄 README.md`,
    `├── 📄 package.json`,
    `├── 📄 .env.example`,
    `├── 📄 .github/`,
    `│   └── workflows/`,
    `│       └── ci.yml`,
    `├── 📁 apps/`,
    `│   ├── 📁 web/`,
    `│   │   ├── src/`,
    `│   │   │   ├── app/`,
    `│   │   │   ├── components/`,
    `│   │   │   ├── lib/`,
    `│   │   │   └── styles/`,
    `│   │   ├── public/`,
    `│   │   └── next.config.ts`,
    `│   └── 📁 api/ (if ${p.backend !== "none"})/`,
    `│       └── src/`,
    `│           ├── routes/`,
    `│           ├── models/`,
    `│           └── middleware/`,
    `├── 📁 packages/`,
    `│   ├── 📁 ui/ (shadcn components)`,
    `│   └── 📁 config/`,
    `├── 📄 docker-compose.yml`,
    `├── 📄 Dockerfile`,
    `└── 📄 .env`,
  ];
  return lines.join("\n");
}

function generateRoadmap(p: any) {
  const roadmap: Array<{ week: number; title: string; desc: string }> = [];
  let week = 1;
  roadmap.push({ week: week++, title: "Project Setup", desc: "Initialize repo, configure tooling, set up Tailwind/shadcn, create base layout." });
  if (p.frontend === "nextjs" || p.frontend === "react") {
    roadmap.push({ week: week++, title: "Frontend Scaffold", desc: `Set up ${p.frontend} project with routing, layouts, and global styles.` });
  }
  if (p.backend !== "none") {
    roadmap.push({ week: week++, title: "Backend API", desc: `Create ${p.backend} API with routes, middleware, and error handling.` });
  }
  if (p.database !== "none") {
    roadmap.push({ week: week++, title: "Database Setup", desc: `Configure ${p.database}, create schema/migrations, seed initial data.` });
  }
  if (p.auth !== "none") {
    roadmap.push({ week: week++, title: "Authentication", desc: `Implement ${p.auth} auth with proper session management.` });
  }
  if (p.optionalFeatures.length > 0) {
    roadmap.push({ week: week++, title: "Core Features", desc: `Implement key features: ${p.optionalFeatures.slice(0, 5).join(", ")}.` });
  }
  if (p.admin !== "none") {
    roadmap.push({ week: week++, title: "Admin Dashboard", desc: "Build admin interface for managing users, content, and settings." });
  }
  if (p.tests.length > 0) {
    roadmap.push({ week: week++, title: "Testing", desc: `Write ${p.tests.join(", ")} tests for critical paths.` });
  }
  if (p.docs.includes("readme")) {
    roadmap.push({ week: week++, title: "Documentation", desc: "Write README, API docs, architecture diagrams, and user guides." });
  }
  roadmap.push({ week: week++, title: "Deployment", desc: `Deploy to ${p.deployment} with CI/CD pipeline.` });
  return roadmap;
}

function generatePrompts(p: any) {
  return `# AI Prompt Pack for ${p.name}

## System Prompt
You are an expert full-stack software engineer. Build the following project based on these specifications:
- Project Type: ${p.projectType}
- Platform: ${p.platform}
- Frontend: ${p.frontend}
- Backend: ${p.backend}
- Database: ${p.database}
- Styling: ${p.styling}
- Theme: ${p.theme}
- Auth: ${p.auth}
- Deployment: ${p.deployment}

## Code Generation Instructions
1. Follow best practices for ${p.frontend} and ${p.backend}.
2. Use ${p.styling} for consistent styling.
3. Implement ${p.theme} mode support.
4. Include proper error handling and loading states.
5. Write clean, well-documented code.
6. Use TypeScript where applicable.

## Database Schema
${JSON.stringify(p, null, 2)}

## Additional Context
${p.optionalFeatures.length > 0 ? `Features: ${p.optionalFeatures.join(", ")}` : "No special features."}
${p.security.length > 0 ? `Security: ${p.security.join(", ")}` : ""}
${p.notifications.length > 0 ? `Notifications: ${p.notifications.join(", ")}` : ""}
`;
}