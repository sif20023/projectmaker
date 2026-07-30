"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useAppStore } from "@/lib/store";

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  const { isDarkMode } = useAppStore();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}