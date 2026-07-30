"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectBlueprintSchema, type ProjectBlueprint } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectType, Platform, AuthProvider, Theme, PrimaryColor, DesignStyle, AnimationLevel, ResponsiveMode, Frontend, Backend, Database, Styling, StateManagement, PaymentProvider, EmailProvider, NotificationType, FileUploadType, AdminLevel, AnalyticsProvider, Language, SecurityFeature, Deployment, TestType, DocType, GitFeature, OptionalFeature, type ProjectBlueprint as BP } from "@/types";

const projectTypes: { value: ProjectType; label: string; emoji: string }[] = [
  { value: "todo", label: "Todo App", emoji: "✅" },
  { value: "inventory", label: "Inventory System", emoji: "📦" },
  { value: "ecommerce", label: "E-Commerce", emoji: "🛒" },
  { value: "chat", label: "Chat App", emoji: "💬" },
  { value: "blog", label: "Blog", emoji: "📝" },
  { value: "portfolio", label: "Portfolio", emoji: "🎨" },
  { value: "crm", label: "CRM", emoji: "👥" },
  { value: "lms", label: "LMS", emoji: "🎓" },
  { value: "hospital", label: "Hospital", emoji: "🏥" },
  { value: "restaurant", label: "Restaurant", emoji: "🍽️" },
  { value: "ai-saas", label: "AI SaaS", emoji: "🤖" },
  { value: "social-media", label: "Social Media", emoji: "📱" },
  { value: "finance", label: "Finance", emoji: "💰" },
  { value: "other", label: "Other", emoji: "🔧" },
];

const platforms: { value: Platform; label: string; desc: string }[] = [
  { value: "website", label: "Website", desc: "Traditional browser-based app" },
  { value: "mobile", label: "Mobile App", desc: "Native iOS/Android application" },
  { value: "desktop", label: "Desktop App", desc: "Windows, macOS, Linux" },
  { value: "pwa", label: "PWA", desc: "Progressive Web App" },
  { value: "website-mobile", label: "Website + Mobile", desc: "Both web and native mobile" },
];

const authOptions: { value: AuthProvider; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No authentication required" },
  { value: "email", label: "Email", desc: "Email + password authentication" },
  { value: "google", label: "Google", desc: "OAuth with Google" },
  { value: "github", label: "GitHub", desc: "OAuth with GitHub" },
  { value: "multiple", label: "Multiple Providers", desc: "Google + GitHub + Email" },
];

const themes: { value: Theme; label: string; desc: string }[] = [
  { value: "light", label: "Light", desc: "Light color scheme" },
  { value: "dark", label: "Dark", desc: "Dark color scheme" },
  { value: "light-dark", label: "Light + Dark", desc: "Both with toggle" },
  { value: "system", label: "System Theme", desc: "Follows OS preference" },
];

const primaryColors: { value: PrimaryColor; label: string; className: string }[] = [
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "purple", label: "Purple", className: "bg-purple-500" },
  { value: "green", label: "Green", className: "bg-green-500" },
  { value: "orange", label: "Orange", className: "bg-orange-500" },
  { value: "red", label: "Red", className: "bg-red-500" },
  { value: "ai", label: "AI Choose", className: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" },
];

const designStyles: { value: DesignStyle; label: string; desc: string }[] = [
  { value: "apple", label: "Apple", desc: "Clean, minimalist, iOS-inspired" },
  { value: "material", label: "Material Design", desc: "Google's design system" },
  { value: "modern-saas", label: "Modern SaaS", desc: "Clean and professional" },
  { value: "glassmorphism", label: "Glassmorphism", desc: "Frosted glass effects" },
  { value: "minimal", label: "Minimal", desc: "Sparse, content-focused" },
  { value: "brutalist", label: "Brutalist", desc: "Raw, bold, intentional" },
];

const animations: { value: AnimationLevel; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No animations" },
  { value: "minimal", label: "Minimal", desc: "Subtle transitions" },
  { value: "smooth", label: "Smooth", desc: "Polished motion design" },
  { value: "fancy", label: "Fancy", desc: "Rich animations & effects" },
];

const responsiveModes: { value: ResponsiveMode; label: string; desc: string }[] = [
  { value: "desktop", label: "Desktop Only", desc: "Desktop screen sizes" },
  { value: "mobile", label: "Mobile Only", desc: "Mobile-first design" },
  { value: "both", label: "Both", desc: "Responsive for all screens" },
];

const frontends: { value: Frontend; label: string; desc: string }[] = [
  { value: "react", label: "React", desc: "Library for UIs" },
  { value: "nextjs", label: "Next.js", desc: "Full-stack React framework" },
  { value: "vue", label: "Vue", desc: "Progressive JS framework" },
  { value: "svelte", label: "Svelte", desc: "Compiler-based framework" },
  { value: "angular", label: "Angular", desc: "Enterprise JS framework" },
  { value: "astro", label: "Astro", desc: "Content-focused framework" },
];

const backends: { value: Backend; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No backend needed" },
  { value: "express", label: "Express", desc: "Node.js framework" },
  { value: "fastapi", label: "FastAPI", desc: "Python async framework" },
  { value: "django", label: "Django", desc: "Python framework" },
  { value: "laravel", label: "Laravel", desc: "PHP framework" },
  { value: "aspnet", label: "ASP.NET", desc: "C# framework" },
];

const databases: { value: Database; label: string; desc: string }[] = [
  { value: "sqlite", label: "SQLite", desc: "File-based database" },
  { value: "postgresql", label: "PostgreSQL", desc: "Advanced SQL database" },
  { value: "mysql", label: "MySQL", desc: "Popular SQL database" },
  { value: "mongodb", label: "MongoDB", desc: "Document database" },
  { value: "firebase", label: "Firebase", desc: "Google BaaS" },
  { value: "supabase", label: "Supabase", desc: "Open-source Firebase" },
];

const stylings: { value: Styling; label: string; desc: string }[] = [
  { value: "tailwind", label: "Tailwind CSS", desc: "Utility-first CSS" },
  { value: "shadcn", label: "shadcn/ui", desc: "Component library" },
  { value: "mui", label: "Material UI", desc: "React component library" },
  { value: "bootstrap", label: "Bootstrap", desc: "Classic CSS framework" },
  { value: "plaincss", label: "Plain CSS", desc: "Custom styles" },
];

const stateManagements: { value: StateManagement; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No state management" },
  { value: "zustand", label: "Zustand", desc: "Lightweight state" },
  { value: "redux", label: "Redux", desc: "Predictable state container" },
  { value: "context", label: "Context API", desc: "Built-in React context" },
  { value: "pinia", label: "Pinia", desc: "Vue state management" },
];

const payments: { value: PaymentProvider; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No payments" },
  { value: "stripe", label: "Stripe", desc: "Payment processing" },
  { value: "paypal", label: "PayPal", desc: "Online payments" },
  { value: "lemonsqueezy", label: "LemonSqueezy", desc: "Digital storefront" },
];

const emailProviders: { value: EmailProvider; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No email service" },
  { value: "resend", label: "Resend", desc: "Modern email API" },
  { value: "sendgrid", label: "SendGrid", desc: "Email delivery platform" },
  { value: "smtp", label: "SMTP", desc: "Traditional SMTP" },
];

const notifications = ["email", "push", "sms"] as NotificationType[];

const fileUploads: { value: FileUploadType; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No file uploads" },
  { value: "images", label: "Images", desc: "Image files only" },
  { value: "pdfs", label: "PDFs", desc: "PDF documents" },
  { value: "videos", label: "Videos", desc: "Video uploads" },
  { value: "any", label: "Any File", desc: "All file types" },
];

const adminLevels: { value: AdminLevel; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No admin panel" },
  { value: "basic", label: "Basic", desc: "Simple admin dashboard" },
  { value: "full", label: "Full Dashboard", desc: "Comprehensive admin interface" },
];

const analyticsOptions: { value: AnalyticsProvider; label: string; desc: string }[] = [
  { value: "none", label: "None", desc: "No analytics" },
  { value: "google", label: "Google Analytics", desc: "Standard web analytics" },
  { value: "plausible", label: "Plausible", desc: "Privacy-focused analytics" },
  { value: "umami", label: "Umami", desc: "Simple, open analytics" },
];

const languages: { value: Language; label: string }[] = [
  { value: "english", label: "English" },
  { value: "french", label: "French" },
  { value: "arabic", label: "Arabic" },
  { value: "spanish", label: "Spanish" },
];

const securityFeatures: { value: SecurityFeature; label: string; desc: string }[] = [
  { value: "rate-limiting", label: "Rate Limiting", desc: "Prevent abuse" },
  { value: "email-verification", label: "Email Verification", desc: "Verify user emails" },
  { value: "captcha", label: "CAPTCHA", desc: "Bot protection" },
  { value: "csrf", label: "CSRF Protection", desc: "Cross-site request forgery" },
  { value: "2fa", label: "Two-Factor Auth", desc: "Extra security layer" },
];

const deployments: { value: Deployment; label: string; desc: string }[] = [
  { value: "vercel", label: "Vercel", desc: "Frontend hosting" },
  { value: "netlify", label: "Netlify", desc: "Static site hosting" },
  { value: "railway", label: "Railway", desc: "Full-stack hosting" },
  { value: "render", label: "Render", desc: "Cloud hosting" },
  { value: "docker", label: "Docker", desc: "Containerized deployment" },
  { value: "vps", label: "VPS", desc: "Virtual private server" },
];

const testTypes: { value: TestType; label: string; desc: string }[] = [
  { value: "unit", label: "Unit Tests", desc: "Test individual functions" },
  { value: "integration", label: "Integration Tests", desc: "Test component interactions" },
  { value: "e2e", label: "E2E Tests", desc: "End-to-end user flows" },
];

const docTypes: { value: DocType; label: string; desc: string }[] = [
  { value: "readme", label: "README", desc: "Project overview" },
  { value: "api-docs", label: "API Docs", desc: "API endpoint documentation" },
  { value: "architecture-diagram", label: "Architecture Diagram", desc: "System architecture" },
  { value: "database-diagram", label: "Database Diagram", desc: "Data model visualization" },
  { value: "user-guide", label: "User Guide", desc: "End-user documentation" },
];

const gitFeatures: { value: GitFeature; label: string; desc: string }[] = [
  { value: "git", label: "Git Repository", desc: "Version control" },
  { value: "github-actions", label: "GitHub Actions", desc: "CI/CD automation" },
  { value: "cicd", label: "CI/CD", desc: "Continuous integration/deployment" },
  { value: "issue-templates", label: "Issue Templates", desc: "Standardized issues" },
];

const optionalFeatures: { value: OptionalFeature; label: string; desc: string }[] = [
  { value: "search", label: "Search", desc: "Full-text search" },
  { value: "filters", label: "Filters", desc: "Filter and sort data" },
  { value: "tags", label: "Tags", desc: "Tag-based categorization" },
  { value: "export-csv", label: "Export CSV", desc: "CSV data export" },
  { value: "export-pdf", label: "Export PDF", desc: "PDF document export" },
  { value: "drag-drop", label: "Drag & Drop", desc: "Drag and drop interface" },
  { value: "offline", label: "Offline Mode", desc: "Works without internet" },
  { value: "autosave", label: "Autosave", desc: "Auto-save progress" },
  { value: "undo-redo", label: "Undo / Redo", desc: "Action history" },
  { value: "infinite-scroll", label: "Infinite Scroll", desc: "Load more on scroll" },
  { value: "pagination", label: "Pagination", desc: "Paginated data" },
  { value: "calendar", label: "Calendar View", desc: "Calendar interface" },
  { value: "kanban", label: "Kanban View", desc: "Kanban board" },
  { value: "charts", label: "Charts", desc: "Data visualization" },
  { value: "markdown", label: "Markdown Support", desc: "Markdown editing" },
  { value: "rich-text", label: "Rich Text Editor", desc: "WYSIWYG editor" },
  { value: "comments", label: "Comments", desc: "User comments" },
  { value: "likes", label: "Likes", desc: "Like/favorite items" },
  { value: "bookmarks", label: "Bookmarks", desc: "Save items" },
  { value: "profiles", label: "Public Profiles", desc: "User profile pages" },
  { value: "qr-codes", label: "QR Codes", desc: "Generate QR codes" },
  { value: "share-links", label: "Share Links", desc: "Share by link" },
  { value: "audit-logs", label: "Audit Logs", desc: "Activity tracking" },
  { value: "version-history", label: "Version History", desc: "Track changes" },
  { value: "websockets", label: "WebSockets", desc: "Real-time connections" },
  { value: "realtime", label: "Real-Time Collaboration", desc: "Multi-user editing" },
  { value: "presence", label: "Presence Indicators", desc: "Show online users" },
  { value: "api", label: "API Access", desc: "Public API endpoints" },
  { value: "webhooks", label: "Webhooks", desc: "Event callbacks" },
];

interface StepRendererProps {
  step: number;
  project: BP;
  onUpdate: (data: Partial<BP>) => void;
}

export function renderStep(step: number, project: BP, onUpdate: (data: Partial<BP>) => void) {
  switch (step) {
    case 1: return <StepProjectType project={project} onUpdate={onUpdate} />;
    case 2: return <StepPlatform project={project} onUpdate={onUpdate} />;
    case 3: return <StepAuth project={project} onUpdate={onUpdate} />;
    case 4: return <StepTheme project={project} onUpdate={onUpdate} />;
    case 5: return <StepPrimaryColor project={project} onUpdate={onUpdate} />;
    case 6: return <StepDesignStyle project={project} onUpdate={onUpdate} />;
    case 7: return <StepAnimations project={project} onUpdate={onUpdate} />;
    case 8: return <StepResponsive project={project} onUpdate={onUpdate} />;
    case 9: return <StepFrontend project={project} onUpdate={onUpdate} />;
    case 10: return <StepBackend project={project} onUpdate={onUpdate} />;
    case 11: return <StepDatabase project={project} onUpdate={onUpdate} />;
    case 12: return <StepStyling project={project} onUpdate={onUpdate} />;
    case 13: return <StepStateManagement project={project} onUpdate={onUpdate} />;
    case 14: return <StepPayments project={project} onUpdate={onUpdate} />;
    case 15: return <StepEmailProvider project={project} onUpdate={onUpdate} />;
    case 16: return <StepNotifications project={project} onUpdate={onUpdate} />;
    case 17: return <StepFileUpload project={project} onUpdate={onUpdate} />;
    case 18: return <StepAdmin project={project} onUpdate={onUpdate} />;
    case 19: return <StepAnalytics project={project} onUpdate={onUpdate} />;
    case 20: return <StepLanguages project={project} onUpdate={onUpdate} />;
    case 21: return <StepSecurity project={project} onUpdate={onUpdate} />;
    case 22: return <StepDeployment project={project} onUpdate={onUpdate} />;
    case 23: return <StepTesting project={project} onUpdate={onUpdate} />;
    case 24: return <StepDocs project={project} onUpdate={onUpdate} />;
    case 25: return <StepGitFeatures project={project} onUpdate={onUpdate} />;
    case 26: return <StepOptionalFeatures project={project} onUpdate={onUpdate} />;
    default: return <div>Unknown step</div>;
  }
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  renderOption,
}: {
  options: { value: T; label: string; desc?: string; extra?: React.ReactNode }[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  renderOption: (opt: { value: T; label: string; desc?: string; extra?: React.ReactNode }) => React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((opt) => (
        <div key={opt.value} className="w-full">
          {renderOption(opt)}
        </div>
      ))}
    </div>
  );
}

function StepProjectType({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  const { register } = useForm({
    defaultValues: { name: project.name },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Project Name</Label>
        <Input
          placeholder="My Awesome Project"
          defaultValue={project.name}
          {...register("name")}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
      </div>
      <div>
        <Label className="mb-3 block">What are you building?</Label>
        <OptionGrid
          options={projectTypes}
          value={project.projectType}
          onChange={(v) => onUpdate({ projectType: v })}
          renderOption={(opt) => (
            <button
              onClick={() => onUpdate({ projectType: opt.value })}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
                project.projectType === opt.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-input hover:border-primary/50"
              )}
            >
              <span className="text-2xl block mb-2">{opt.emoji}</span>
              <p className="font-medium text-sm">{opt.label}</p>
            </button>
          )}
        />
      </div>
    </div>
  );
}

function StepPlatform({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Target Platform</Label>
      <OptionGrid
        options={platforms}
        value={project.platform}
        onChange={(v) => onUpdate({ platform: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ platform: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.platform === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepAuth({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Authentication</Label>
      <OptionGrid
        options={authOptions}
        value={project.auth}
        onChange={(v) => onUpdate({ auth: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ auth: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.auth === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepTheme({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Theme</Label>
      <OptionGrid
        options={themes}
        value={project.theme}
        onChange={(v) => onUpdate({ theme: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ theme: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.theme === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepPrimaryColor({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Primary Color</Label>
      <OptionGrid
        options={primaryColors}
        value={project.primaryColor}
        onChange={(v) => onUpdate({ primaryColor: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ primaryColor: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md flex items-center gap-3",
              project.primaryColor === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <span className={cn("h-6 w-6 rounded-full shrink-0", opt.className)} />
            <span className="font-medium text-sm">{opt.label}</span>
          </button>
        )}
      />
    </div>
  );
}

function StepDesignStyle({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Design Style</Label>
      <OptionGrid
        options={designStyles}
        value={project.designStyle}
        onChange={(v) => onUpdate({ designStyle: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ designStyle: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.designStyle === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepAnimations({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Animations</Label>
      <OptionGrid
        options={animations}
        value={project.animations}
        onChange={(v) => onUpdate({ animations: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ animations: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.animations === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepResponsive({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Responsive Design</Label>
      <OptionGrid
        options={responsiveModes}
        value={project.responsive}
        onChange={(v) => onUpdate({ responsive: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ responsive: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.responsive === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepFrontend({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Frontend Framework</Label>
      <OptionGrid
        options={frontends}
        value={project.frontend}
        onChange={(v) => onUpdate({ frontend: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ frontend: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.frontend === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepBackend({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Backend Framework</Label>
      <OptionGrid
        options={backends}
        value={project.backend}
        onChange={(v) => onUpdate({ backend: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ backend: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.backend === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepDatabase({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Database</Label>
      <OptionGrid
        options={databases}
        value={project.database}
        onChange={(v) => onUpdate({ database: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ database: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.database === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepStyling({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Styling</Label>
      <OptionGrid
        options={stylings}
        value={project.styling}
        onChange={(v) => onUpdate({ styling: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ styling: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.styling === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepStateManagement({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>State Management</Label>
      <OptionGrid
        options={stateManagements}
        value={project.stateManagement}
        onChange={(v) => onUpdate({ stateManagement: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ stateManagement: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.stateManagement === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepPayments({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Payments</Label>
      <OptionGrid
        options={payments}
        value={project.payments}
        onChange={(v) => onUpdate({ payments: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ payments: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.payments === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepEmailProvider({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Email Provider</Label>
      <OptionGrid
        options={emailProviders}
        value={project.emailProvider}
        onChange={(v) => onUpdate({ emailProvider: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ emailProvider: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.emailProvider === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepNotifications({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Notifications</Label>
      <div className="space-y-3">
        {notifications.map((n) => (
          <label key={n} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.notifications.includes(n)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.notifications, n]
                  : project.notifications.filter((x) => x !== n);
                onUpdate({ notifications: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-sm font-medium capitalize">{n}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepFileUpload({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>File Upload</Label>
      <OptionGrid
        options={fileUploads}
        value={project.fileUpload}
        onChange={(v) => onUpdate({ fileUpload: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ fileUpload: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.fileUpload === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepAdmin({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Admin Dashboard</Label>
      <OptionGrid
        options={adminLevels}
        value={project.admin}
        onChange={(v) => onUpdate({ admin: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ admin: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.admin === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepAnalytics({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Analytics</Label>
      <OptionGrid
        options={analyticsOptions}
        value={project.analytics}
        onChange={(v) => onUpdate({ analytics: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ analytics: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.analytics === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepLanguages({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Languages</Label>
      <div className="space-y-3">
        {languages.map((l) => (
          <label key={l.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.languages.includes(l.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.languages, l.value]
                  : project.languages.filter((x) => x !== l.value);
                onUpdate({ languages: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-sm font-medium capitalize">{l.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepSecurity({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Security</Label>
      <div className="space-y-3">
        {securityFeatures.map((s) => (
          <label key={s.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.security.includes(s.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.security, s.value]
                  : project.security.filter((x) => x !== s.value);
                onUpdate({ security: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <div>
              <span className="text-sm font-medium">{s.label}</span>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepDeployment({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Deployment</Label>
      <OptionGrid
        options={deployments}
        value={project.deployment}
        onChange={(v) => onUpdate({ deployment: v })}
        renderOption={(opt) => (
          <button
            onClick={() => onUpdate({ deployment: opt.value })}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all hover:shadow-md",
              project.deployment === opt.value
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-input hover:border-primary/50"
            )}
          >
            <p className="font-medium text-sm">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        )}
      />
    </div>
  );
}

function StepTesting({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Testing</Label>
      <div className="space-y-3">
        {testTypes.map((t) => (
          <label key={t.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.tests.includes(t.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.tests, t.value]
                  : project.tests.filter((x) => x !== t.value);
                onUpdate({ tests: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <div>
              <span className="text-sm font-medium">{t.label}</span>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepDocs({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Documentation</Label>
      <div className="space-y-3">
        {docTypes.map((d) => (
          <label key={d.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.docs.includes(d.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.docs, d.value]
                  : project.docs.filter((x) => x !== d.value);
                onUpdate({ docs: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <div>
              <span className="text-sm font-medium">{d.label}</span>
              <p className="text-xs text-muted-foreground">{d.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepGitFeatures({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  return (
    <div className="space-y-4">
      <Label>Git Features</Label>
      <div className="space-y-3">
        {gitFeatures.map((g) => (
          <label key={g.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={project.gitFeatures.includes(g.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.gitFeatures, g.value]
                  : project.gitFeatures.filter((x) => x !== g.value);
                onUpdate({ gitFeatures: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            <div>
              <span className="text-sm font-medium">{g.label}</span>
              <p className="text-xs text-muted-foreground">{g.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepOptionalFeatures({ project, onUpdate }: { project: BP; onUpdate: (d: Partial<BP>) => void }) {
  const [search, setSearch] = React.useState("");
  const filtered = optionalFeatures.filter((f) =>
    f.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Label>Optional Features</Label>
      <Input
        placeholder="Search features..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filtered.map((f) => (
          <label key={f.value} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={project.optionalFeatures.includes(f.value)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...project.optionalFeatures, f.value]
                  : project.optionalFeatures.filter((x) => x !== f.value);
                onUpdate({ optionalFeatures: updated });
              }}
              className="h-4 w-4 rounded border-input"
            />
            {f.label}
          </label>
        ))}
      </div>
    </div>
  );
}