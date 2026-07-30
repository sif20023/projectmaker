"use client";

import * as React from "react";
import { useAppStore } from "@/lib/store";

export function ThemeClient() {
  const { isDarkMode } = useAppStore();

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null;
}