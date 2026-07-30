export type ProjectType =
  | "todo"
  | "inventory"
  | "ecommerce"
  | "chat"
  | "blog"
  | "portfolio"
  | "crm"
  | "lms"
  | "hospital"
  | "restaurant"
  | "ai-saas"
  | "social-media"
  | "finance"
  | "other";

export type Platform =
  | "website"
  | "mobile"
  | "desktop"
  | "pwa"
  | "website-mobile";

export type AuthProvider =
  | "none"
  | "email"
  | "google"
  | "github"
  | "multiple";

export type Theme = "light" | "dark" | "light-dark" | "system";

export type PrimaryColor = "blue" | "purple" | "green" | "orange" | "red" | "ai";

export type DesignStyle =
  | "apple"
  | "material"
  | "modern-saas"
  | "glassmorphism"
  | "minimal"
  | "brutalist";

export type AnimationLevel = "none" | "minimal" | "smooth" | "fancy";

export type ResponsiveMode = "desktop" | "mobile" | "both";

export type Frontend = "react" | "nextjs" | "vue" | "svelte" | "angular" | "astro";

export type Backend = "none" | "express" | "fastapi" | "django" | "laravel" | "aspnet";

export type Database = "sqlite" | "postgresql" | "mysql" | "mongodb" | "firebase" | "supabase";

export type Styling = "tailwind" | "shadcn" | "mui" | "bootstrap" | "plaincss";

export type StateManagement = "none" | "zustand" | "redux" | "context" | "pinia";

export type PaymentProvider = "none" | "stripe" | "paypal" | "lemonsqueezy";

export type EmailProvider = "none" | "resend" | "sendgrid" | "smtp";

export type NotificationType = "email" | "push" | "sms";

export type FileUploadType = "none" | "images" | "pdfs" | "videos" | "any";

export type AdminLevel = "none" | "basic" | "full";

export type AnalyticsProvider = "none" | "google" | "plausible" | "umami";

export type Language = "english" | "french" | "arabic" | "spanish";

export type SecurityFeature = "rate-limiting" | "email-verification" | "captcha" | "csrf" | "2fa";

export type Deployment = "vercel" | "netlify" | "railway" | "render" | "docker" | "vps";

export type TestType = "unit" | "integration" | "e2e";

export type DocType = "readme" | "api-docs" | "architecture-diagram" | "database-diagram" | "user-guide";

export type GitFeature = "git" | "github-actions" | "cicd" | "issue-templates";

export type OptionalFeature =
  | "search"
  | "filters"
  | "tags"
  | "export-csv"
  | "export-pdf"
  | "drag-drop"
  | "offline"
  | "autosave"
  | "undo-redo"
  | "infinite-scroll"
  | "pagination"
  | "calendar"
  | "kanban"
  | "charts"
  | "markdown"
  | "rich-text"
  | "comments"
  | "likes"
  | "bookmarks"
  | "profiles"
  | "qr-codes"
  | "share-links"
  | "audit-logs"
  | "version-history"
  | "websockets"
  | "realtime"
  | "presence"
  | "api"
  | "webhooks";

export interface ProjectBlueprint {
  id: string;
  name: string;
  projectType: ProjectType;
  platform: Platform;
  auth: AuthProvider;
  theme: Theme;
  primaryColor: PrimaryColor;
  designStyle: DesignStyle;
  animations: AnimationLevel;
  responsive: ResponsiveMode;
  frontend: Frontend;
  backend: Backend;
  database: Database;
  styling: Styling;
  stateManagement: StateManagement;
  payments: PaymentProvider;
  emailProvider: EmailProvider;
  notifications: NotificationType[];
  fileUpload: FileUploadType;
  admin: AdminLevel;
  analytics: AnalyticsProvider;
  languages: Language[];
  security: SecurityFeature[];
  deployment: Deployment;
  tests: TestType[];
  docs: DocType[];
  gitFeatures: GitFeature[];
  optionalFeatures: OptionalFeature[];
  currentStep: number;
  lastUpdated: number;
}

export interface ProjectStep {
  number: number;
  title: string;
  description: string;
}

export interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  connected: boolean;
}