import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 mt-auto">
      <div className="container flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>ProjectForge — Build smarter, ship faster.</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Docs
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}