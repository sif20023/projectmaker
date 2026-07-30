"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInWithGoogle, signInWithGitHub, signInGuest } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LogIn, Mail, Circle, Lock, GitBranch, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { setAuthenticated } = useAppStore();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleGuest = async () => {
    setIsLoading(true);
    await signInGuest();
    setAuthenticated(null, true);
    setIsLoading(false);
    router.push("/dashboard");
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setAuthenticated(email || null, false);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setAuthenticated(null, false);
      router.push("/dashboard");
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handleGitHub = async () => {
    setIsLoading(true);
    try {
      await signInWithGitHub();
      setAuthenticated(null, false);
      router.push("/dashboard");
    } catch {
      setError("GitHub sign-in failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LogIn className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl">Welcome to ProjectForge</CardTitle>
            <CardDescription>Sign in to save and manage your projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 text-destructive px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in with Email"}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" onClick={handleGoogle} disabled={isLoading}>
                <Circle className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleGitHub} disabled={isLoading}>
                <GitBranch className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleGuest} disabled={isLoading}>
                <User className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Guest mode requires no signup.{" "}
              <Link href="/dashboard" className="text-primary hover:underline">
                Continue as guest
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}