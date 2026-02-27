"use client";

import React, { useState, useCallback, useEffect } from "react";
import { 
    Button, 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui";
import { 
    Copy, 
    Check, 
    Hash, 
    Trash2, 
    Zap,
    ShieldCheck,
    Lock
} from "lucide-react";
import Editor from 'react-simple-code-editor';
import * as Prism from 'prismjs';
if (typeof window !== 'undefined') {
    (window as any).Prism = Prism;
}
import 'prismjs/components/prism-json';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EDITOR_FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export default function Sha256Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ length: 0, time: 0 });

  const generateHash = useCallback(async (text: string) => {
    const start = performance.now();
    setInput(text);
    if (!text) {
      setHash("");
      setStats({ length: 0, time: 0 });
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const end = performance.now();
    
    setHash(hashHex);
    setStats({ length: text.length, time: end - start });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 p-2 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 px-2 py-1 rounded flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">WebCrypto API</span>
            </div>
            <div className="h-4 w-px bg-border mx-0.5" />
            <Button variant="ghost" size="sm" onClick={() => { setInput(""); setHash(""); }} className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-background/50 border border-border rounded-md mr-1 font-mono text-[10px]">
                <span className="text-muted-foreground">INPUT: <b>{stats.length} chars</b></span>
                <span className="text-muted-foreground">PROC: <b>{stats.time.toFixed(3)}ms</b></span>
            </div>
            <Button size="sm" onClick={copyToClipboard} disabled={!hash} className="h-8 px-3 text-[11px] min-w-[80px]">
                {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                {copied ? "Copied" : "Copy Hash"}
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Input Area */}
        <Card className="border-border shadow-xl rounded-xl overflow-hidden flex flex-col">
            <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center">
                <div className="flex gap-1.5 mr-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] font-mono text-[#abb2bf] italic flex items-center gap-2">
                    <Zap className="h-3 w-3" /> input_raw.txt
                </span>
            </CardHeader>
            <div 
                className="bg-[#282c34] p-0 min-h-[150px] cursor-text"
                onClick={(e) => {
                    const textarea = e.currentTarget.querySelector('textarea');
                    textarea?.focus();
                }}
            >
                <Editor
                    value={input}
                    onValueChange={generateHash}
                    highlight={code => (Prism.languages.json ? Prism.highlight(code, Prism.languages.json, 'json') : code)}
                    padding={16}
                    className="font-mono focus:outline-none text-white"
                    placeholder="Type or paste your text here to generate SHA-256 hash immediately..."
                    style={{ 
                        fontFamily: EDITOR_FONT_FAMILY,
                        fontSize: 12,
                        lineHeight: 1.5,
                        minHeight: '150px'
                    }}
                />
            </div>
        </Card>

        {/* Output Area */}
        <Card className={cn(
            "border-border shadow-xl rounded-xl overflow-hidden flex flex-col transition-all duration-300",
            hash ? "opacity-100 translate-y-0" : "opacity-50 grayscale"
        )}>
            <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center justify-between">
                <span className="text-[10px] font-mono text-[#abb2bf] uppercase tracking-widest font-bold">SHA-256 Digital Signature</span>
                <Lock className="h-3 w-3 text-emerald-500" />
            </CardHeader>
            <div className="bg-[#1e2127] p-4 min-h-[80px] flex items-center justify-center relative">
                <div className="font-mono text-[13px] text-emerald-400 break-all text-center leading-relaxed tracking-wider">
                    {hash || "Hashed output will appear here..."}
                </div>
                {hash && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="text-[8px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">SECURE</Badge>
                    </div>
                )}
            </div>
        </Card>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
            <Hash className="h-4 w-4 text-primary mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Client-Side Only:</span> Your data never leaves your browser. We use the native SubtleCrypto API for maximum security and speed.
            </p>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant = 'default', className }: { children: React.ReactNode, variant?: string, className?: string }) {
    return (
        <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold",
            variant === 'outline' ? "border" : "bg-primary text-primary-foreground",
            className
        )}>
            {children}
        </span>
    )
}
