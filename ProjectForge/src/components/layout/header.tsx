"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, SunMoon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function Header() {
  const { isDarkMode, toggleDarkMode, toggleSidebar, isAuthenticated } = useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">ProjectForge</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Landing
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          )}
          <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
            AI Settings
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            <SunMoon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}