"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
    Button, 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    Input,
    Badge,
    ScrollArea
} from "@/components/ui";
import { 
    Copy, 
    FileJson, 
    Check, 
    AlertCircle, 
    Zap, 
    Trash2, 
    Maximize2, 
    Minimize2,
    Download,
    Code2,
    Settings2,
    FileUp,
    AlignLeft
} from "lucide-react";
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Prism theme styles for the editor
const editorTheme = `
  code[class*="language-"], pre[class*="language-"] { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 13px; line-height: 1.6; color: #abb2bf; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; -moz-tab-size: 2; -o-tab-size: 2; tab-size: 2; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; background: transparent; }
  .token.comment, .token.prolog, .token.doctype, .token.cdata { color: #5c6370; }
  .token.punctuation { color: #abb2bf; }
  .token.namespace { opacity: .7; }
  .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #d19a66; }
  .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #98c379; }
  .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #56b6c2; }
  .token.atrule, .token.attr-value, .token.keyword { color: #c678dd; }
  .token.function, .token.class-name { color: #61afef; }
  .token.regex, .token.important, .token.variable { color: #e06c75; }
`;

export default function JsonBeautifier() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<{message: string, line?: number} | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ size: 0, nodes: 0, depth: 0 });

  const processJson = useCallback((raw: string, action: 'beautify' | 'minify' | 'fix' = 'beautify') => {
    if (!raw.trim()) {
      setInput("");
      setError(null);
      setStats({ size: 0, nodes: 0, depth: 0 });
      return;
    }

    try {
      let parsed;
      let textToParse = raw;

      if (action === 'fix') {
          // Attempt common fixes: add missing quotes, remove trailing commas
          textToParse = raw
            .replace(/,\s*([}\]])/g, '$1') // trailing commas
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // unquoted keys
            .replace(/'/g, '"'); // single quotes to double
      }

      parsed = JSON.parse(textToParse);
      
      const result = action === 'minify' 
        ? JSON.stringify(parsed) 
        : JSON.stringify(parsed, null, indent);
      
      setInput(result);
      setError(null);
      calculateStats(parsed, result.length);
    } catch (e: any) {
      const lineMatch = e.message.match(/at line (\d+)/);
      setError({
        message: e.message,
        line: lineMatch ? parseInt(lineMatch[1]) : undefined
      });
    }
  }, [indent]);

  const calculateStats = (obj: any, size: number) => {
    let nodes = 0;
    let maxDepth = 0;

    const traverse = (item: any, depth: number) => {
      nodes++;
      maxDepth = Math.max(maxDepth, depth);
      if (typeof item === 'object' && item !== null) {
        Object.values(item).forEach(v => traverse(v, depth + 1));
      }
    };

    traverse(obj, 1);
    setStats({ size, nodes, depth: maxDepth });
  };

  const downloadJson = () => {
    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        const content = re.target?.result as string;
        processJson(content);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: editorTheme }} />
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/50 p-3 rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="flex bg-background border border-border rounded-lg p-1">
                {[2, 4].map(num => (
                    <button
                        key={num}
                        onClick={() => setIndent(num)}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md transition-all",
                            indent === num ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent"
                        )}
                    >
                        {num} Spaces
                    </button>
                ))}
            </div>
            <div className="h-6 w-px bg-border mx-1" />
            <label className="flex items-center gap-2 cursor-pointer hover:bg-accent px-3 py-1.5 rounded-lg transition-colors group">
                <FileUp className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="text-xs font-medium">Upload JSON</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setInput("")} className="h-9">
                <Trash2 className="h-4 w-4 mr-2" /> Clear
            </Button>
            <Button variant="outline" size="sm" onClick={downloadJson} disabled={!input || !!error} className="h-9">
                <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button size="sm" onClick={copyToClipboard} disabled={!input || !!error} className="h-9 min-w-[100px]">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy Result"}
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <Card className="flex-1 min-h-[500px] border-2 border-border focus-within:border-primary/30 transition-all overflow-hidden flex flex-col">
            <CardHeader className="py-3 bg-muted/30 border-b border-border flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <CardTitle className="ml-2 text-sm font-mono flex items-center gap-2">
                        editor.json <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest px-1 py-0 h-4">Local</Badge>
                    </CardTitle>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" title="Format (Ctrl+S)" onClick={() => processJson(input)}>
                        <Zap className="h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative overflow-auto bg-[#282c34]">
                <Editor
                    value={input}
                    onValueChange={code => {
                        setInput(code);
                        processJson(code);
                    }}
                    highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
                    padding={20}
                    className="font-mono focus:outline-none min-h-full"
                    style={{
                        fontSize: 14,
                    }}
                />
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 flex gap-4 animate-in slide-in-from-bottom-2">
                <div className="mt-1 bg-destructive/20 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                    <p className="font-bold flex items-center gap-2">
                        Syntax Error {error.line && <Badge variant="destructive">Line {error.line}</Badge>}
                    </p>
                    <p className="text-sm opacity-90 font-mono leading-relaxed">{error.message}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-destructive underline" onClick={() => processJson(input, 'fix')}>
                        💡 Try Auto-Fix (Fix quotes & commas)
                    </Button>
                </div>
            </div>
          )}
        </div>

        {/* Sidebar / Stats */}
        <div className="lg:col-span-4 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Settings2 className="h-5 w-5 text-primary" /> Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="secondary" className="w-full justify-start gap-2 h-11" onClick={() => processJson(input, 'beautify')}>
                        <AlignLeft className="h-4 w-4" /> Beautify JSON
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-2 h-11" onClick={() => processJson(input, 'minify')}>
                        <Maximize2 className="h-4 w-4" /> Minify / Compress
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 h-11 border-dashed" onClick={() => processJson(input, 'fix')}>
                        <Code2 className="h-4 w-4" /> Fix Broken JSON
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted border-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500" /> Structure Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Size</p>
                            <p className="text-xl font-mono font-bold">{(stats.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Nodes</p>
                            <p className="text-xl font-mono font-bold">{stats.nodes}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Maximum Depth</p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden border border-border">
                                <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(stats.depth * 5, 100)}%` }}
                                />
                            </div>
                            <span className="font-mono font-bold text-sm">{stats.depth} levels</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Visualizing object hierarchy complexity.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">Pro-Tip:</span> Use the "Auto-Fix" feature to automatically resolve common JSON issues like trailing commas or unquoted keys.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
