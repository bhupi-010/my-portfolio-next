"use client";

import React, { useState } from "react";
import { Button, Card, CardContent, Textarea, CardHeader, CardTitle, CardDescription, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { Copy, ArrowRightLeft, Check, AlertCircle } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = (val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    if (!val.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      if (currentMode === "encode") {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
      setError("");
    } catch (e) {
      setError(currentMode === "encode" ? "Encoding error" : "Invalid Base64 string");
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="encode" onValueChange={(v) => {
          const newMode = v as "encode" | "decode";
          setMode(newMode);
          process(input, newMode);
      }}>
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{mode === "encode" ? "Plain Text" : "Base64 Input"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder={mode === "encode" ? "Enter text..." : "Enter base64..."}
                value={input}
                onChange={(e) => process(e.target.value, mode)}
                className="min-h-[250px] font-mono"
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Result</CardTitle>
              {output && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 gap-2">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {error ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex gap-3 text-sm border border-destructive/20 h-full">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              ) : (
                <div className="flex-1 bg-muted rounded-lg p-4 font-mono text-sm border border-border overflow-auto max-h-[300px]">
                  <pre className="whitespace-pre-wrap">{output || "Waiting for input..."}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
