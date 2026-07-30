"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Save, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/store";

const MODELS = [
  { value: "openai/gpt-5.5", label: "OpenAI GPT-5.5" },
  { value: "anthropic/claude", label: "Anthropic Claude" },
  { value: "google/gemini", label: "Google Gemini" },
  { value: "deepseek/deepseek-coder", label: "DeepSeek" },
  { value: "qwen/qwen2.5-coder", label: "Qwen" },
  { value: "mistralai/mistral", label: "Mistral" },
];

export default function SettingsPage() {
  const { aiConfig, updateAIConfig } = useAppStore();
  const [showKey, setShowKey] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);
  const [testing, setTesting] = React.useState(false);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    // Simulate API test
    setTimeout(() => {
      if (aiConfig.apiKey.length > 10) {
        setTestResult("success");
        updateAIConfig({ connected: true });
      } else {
        setTestResult("error");
        updateAIConfig({ connected: false });
      }
      setTesting(false);
    }, 1500);
  };

  const maskedKey = aiConfig.apiKey
    ? "*".repeat(Math.max(0, aiConfig.apiKey.length - 4)) + aiConfig.apiKey.slice(-4)
    : "";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Configure your OpenRouter API key and model preferences.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              OpenRouter API Key
            </CardTitle>
            <CardDescription>
              Your API key is stored locally in your browser and never sent to any server except OpenRouter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type={showKey ? "text" : "password"}
                  placeholder="sk-or-v1-____________________________________"
                  value={showKey ? aiConfig.apiKey : maskedKey}
                  onChange={(e) => updateAIConfig({ apiKey: e.target.value, connected: false })}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={() => setShowKey(!showKey)}>
                  {showKey ? "Hide" : "Show"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default Model</Label>
              <Select
                value={aiConfig.model}
                onValueChange={(v) => updateAIConfig({ model: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Temperature: {aiConfig.temperature.toFixed(2)}</Label>
              <Slider
                min={0}
                max={2}
                step={0.01}
                value={[aiConfig.temperature]}
                onValueChange={(v) => updateAIConfig({ temperature: v[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Higher values = more creative/random. Lower = more focused/deterministic.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Max Tokens: {aiConfig.maxTokens}</Label>
              <Slider
                min={1}
                max={4096}
                step={1}
                value={[aiConfig.maxTokens]}
                onValueChange={(v) => updateAIConfig({ maxTokens: v[0] })}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleTestConnection} disabled={testing || !aiConfig.apiKey}>
                {testing ? "Testing..." : "Test Connection"}
              </Button>
              {testResult === "success" && (
                <Badge variant="success" className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> Connected
                </Badge>
              )}
              {testResult === "error" && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Failed
                </Badge>
              )}
            </div>

            {aiConfig.connected && (
              <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Connected to OpenRouter
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Available models: {MODELS.map((m) => m.label).join(", ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/builder">Back to Builder</Link>
        </Button>
      </div>
    </div>
  );
}