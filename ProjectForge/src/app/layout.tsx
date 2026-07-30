import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeClient } from "@/components/theme-client";

export const metadata: Metadata = {
  title: "ProjectForge — AI Software Architect",
  description: "Build your next software project in minutes. Answer questions. Let AI design everything.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        <ThemeClient />
        <ToastProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
              {children}
            </main>
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}