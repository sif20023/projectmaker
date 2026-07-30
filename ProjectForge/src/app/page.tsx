"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, GitBranch, Shield, Rocket, Layers, Play, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Architecture",
    description: "Answer a few questions and let AI design your complete software blueprint with code, docs, and roadmap.",
  },
  {
    icon: GitBranch,
    title: "Full-Stack Generation",
    description: "Get frontend, backend, database, and deployment configs tailored to every choice you make.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Built-in security features like rate limiting, 2FA, CSRF protection, and email verification.",
  },
  {
    icon: Rocket,
    title: "One-Click Deployment",
    description: "Deploy to Vercel, Netlify, Railway, or your own VPS with a single configuration.",
  },
  {
    icon: Layers,
    title: "Customizable Themes",
    description: "Choose from Apple, Material, Glassmorphism, and more. Light, dark, or system themes supported.",
  },
  {
    icon: Zap,
    title: "Smart Defaults",
    description: "AI picks the best options for you when you're unsure, so you never get stuck.",
  },
];

const steps = [
  { step: 1, title: "Choose Your Project", desc: "Select what you're building from 13+ project types." },
  { step: 2, title: "Pick Your Stack", desc: "Choose frontend, backend, database, and styling preferences." },
  { step: 3, title: "Configure Extras", desc: "Add auth, payments, analytics, i18n, and optional features." },
  { step: 4, title: "Generate & Build", desc: "Get a complete architecture, code, docs, and roadmap instantly." },
];

const faqs = [
  { q: "What can I build with ProjectForge?", a: "From Todo apps to full enterprise SaaS — support for 14+ project types including e-commerce, LMS, CRM, chat apps, social media, AI SaaS, and more." },
  { q: "Is it really free?", a: "Yes, ProjectForge is free to use. You only pay for the cloud services you choose (Vercel, Supabase, Stripe, etc.)." },
  { q: "Can I edit my project later?", a: "Absolutely. All projects are saved and fully editable. You can add features like authentication, payments, or dark mode at any time." },
  { q: "What AI model powers the generation?", a: "ProjectForge uses OpenRouter to access top models like GPT-5.5, Claude, Gemini, and more. You provide your own API key." },
  { q: "Can I export my blueprint?", a: "Yes, you can export your complete project blueprint as JSON, share it, or even generate a README and documentation." },
  { q: "Can I use it without signing up?", a: "Yes, guest mode lets you build projects without any signup. Your projects are saved to your browser's local storage." },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Build your next software project
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              in minutes
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Answer a few questions. Let AI design everything else.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/dashboard">
                <Play className="h-4 w-4 mr-2" />
                Start Building
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                <Eye className="h-4 w-4 mr-2" />
                View Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need to build</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            From idea to deployment, ProjectForge provides the tools and AI assistance to ship faster.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-xl hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Four simple steps to build your complete project blueprint.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="rounded-xl h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg mb-4">
                      {s.step}
                    </div>
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}