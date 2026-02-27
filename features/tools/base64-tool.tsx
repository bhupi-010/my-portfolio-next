"use client";

import React, { useState, useCallback } from "react";
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
    ArrowRightLeft, 
    Trash2, 
    AlertCircle,
    Replace,
    Zap,
    Scale
} from "lucide-react";
import Editor from 'react-simple-code-editor';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EDITOR_FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ ratio: 0, size: 0 });

  const process = useCallback((val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    if (!val.trim()) {
      setOutput("");
      setError("");
      setStats({ ratio: 0, size: 0 });
      return;
    }
    try {
      let result = "";
      if (currentMode === "encode") {
        result = btoa(val);
      } else {
        result = atob(val);
      }
      setOutput(result);
      setError("");
      
      const ratio = val.length > 0 ? (result.length / val.length) * 100 : 0;
      setStats({ ratio, size: result.length });
    } catch (e) {
      setError(currentMode === "encode" ? "Encoding failed: Text contains invalid characters for Base64." : "Decoding failed: Invalid Base64 sequence.");
      setOutput("");
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    // Swap input and output for seamless transition
    if (output) {
        process(output, newMode);
    }
  };

  return (
    <div className="space-y-4">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 p-2 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <div className="flex bg-background border border-border rounded-md p-0.5">
                <button
                    onClick={() => { setMode("encode"); process(input, "encode"); }}
                    className={cn(
                        "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
                        mode === "encode" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent text-muted-foreground"
                    )}
                >
                    Encode
                </button>
                <button
                    onClick={() => { setMode("decode"); process(input, "decode"); }}
                    className={cn(
                        "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
                        mode === "decode" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent text-muted-foreground"
                    )}
                >
                    Decode
                </button>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleMode} className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors">
                <Replace className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-border mx-0.5" />
            <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); setError(""); }} className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-background/50 border border-border rounded-md mr-1 font-mono text-[10px]">
                <span className="text-muted-foreground">SIZE: <b>{stats.size}b</b></span>
                <span className="text-muted-foreground">RATIO: <b>{stats.ratio.toFixed(0)}%</b></span>
            </div>
            <Button size="sm" onClick={copyToClipboard} disabled={!output || !!error} className="h-8 px-3 text-[11px]">
                {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                {copied ? "Copied" : "Copy Result"}
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Card */}
        <Card className="border-border shadow-md rounded-xl overflow-hidden flex flex-col">
            <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center">
                <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">{mode === "encode" ? "Source Content" : "Base64 Data"}</span>
            </CardHeader>
            <div className="bg-[#282c34] p-0 h-[300px] overflow-auto">
                <Editor
                    value={input}
                    onValueChange={(val) => process(val, mode)}
                    highlight={code => code}
                    padding={16}
                    className="font-mono focus:outline-none min-h-full text-[#abb2bf]"
                    style={{ fontSize: 12, lineHeight: 1.5, fontFamily: EDITOR_FONT_FAMILY }}
                />
            </div>
        </Card>

        {/* Output Card */}
        <Card className="border-border shadow-md rounded-xl overflow-hidden flex flex-col">
            <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center">
                <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">{mode === "encode" ? "Base64 Result" : "Parsed Content"}</span>
            </CardHeader>
            <div className="bg-[#1e2127] p-0 h-[300px] overflow-auto relative">
                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.div 
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-6 flex flex-col items-center justify-center h-full text-center space-y-3"
                        >
                            <div className="bg-destructive/10 p-3 rounded-full">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <p className="text-xs text-destructive font-bold">{error}</p>
                            <p className="text-[10px] text-muted-foreground">Check your {mode === "decode" ? "base64 string" : "input"} for errors.</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="output"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-0 h-full"
                        >
                            <pre className="font-mono text-[12px] p-4 text-[#98c379] whitespace-pre-wrap break-all leading-relaxed">
                                {output || "Processed output will appear here..."}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
              <Zap className="h-4 w-4 text-primary" />
              <div className="text-[10px] text-muted-foreground">Instant processing as you type.</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
              <Scale className="h-4 w-4 text-emerald-500" />
              <div className="text-[10px] text-muted-foreground">{mode === "encode" ? "Expansion" : "Reduction"} ratio calculated live.</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
              <ArrowRightLeft className="h-4 w-4 text-amber-500" />
              <div className="text-[10px] text-muted-foreground">Swap mode easily with the center icon.</div>
          </div>
      </div>
    </div>
  );
}
