"use client";

import React, { useState } from "react";
import { Button, Card, CardContent, Textarea, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { Copy, Hash, Check } from "lucide-react";

export default function Sha256Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const generateHash = async (text: string) => {
    setInput(text);
    if (!text) {
      setHash("");
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SHA-256 Hash Generator</CardTitle>
          <CardDescription>Securely generate SHA-256 hashes locally in your browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Text</label>
            <Textarea 
              placeholder="Enter text to hash..." 
              value={input}
              onChange={(e) => generateHash(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          {hash && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-sm font-medium flex justify-between">
                Resulting Hash (Hex)
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-6 gap-1 px-2">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </label>
              <div className="p-4 bg-muted rounded-lg break-all font-mono text-sm border border-border">
                {hash}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
