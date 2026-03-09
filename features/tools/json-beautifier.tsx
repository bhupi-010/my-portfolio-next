"use client";

import React, { useState, useCallback, useRef } from "react";
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
  AlertCircle,
  Trash2,
  Minimize2,
  Download,
  FileUp,
  AlignLeft,
  Wand2,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import * as Prism from "prismjs";
if (typeof window !== "undefined") {
  (window as any).Prism = Prism;
}
import "prismjs/components/prism-json";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EDITOR_FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const EDITOR_FONT_SIZE = 12;
const EDITOR_LINE_HEIGHT = 1.5;

const editorTheme = `
  .json-editor-container { 
    position: relative; 
    display: flex; 
    background: #282c34; 
    height: 500px; 
    width: 100%; 
    border-radius: 0 0 0.75rem 0.75rem; 
    overflow: auto; /* Key: The entire container scrolls */
  }
  
  .json-editor-gutter { 
    position: sticky; 
    left: 0; 
    z-index: 20; 
    width: 3rem; 
    background: #21252b; 
    border-right: 1px solid #181a1f; 
    color: #4b5263; 
    padding: 16px 0; 
    text-align: right; 
    user-select: none; 
    font-family: ${EDITOR_FONT_FAMILY}; 
    font-size: ${EDITOR_FONT_SIZE}px; 
    line-height: ${EDITOR_LINE_HEIGHT}; 
    flex-shrink: 0; 
    height: max-content;
    min-height: 100%;
  }
  
  .gutter-line { 
    padding: 0 0.5rem; 
    transition: color 0.2s; 
    height: ${EDITOR_FONT_SIZE * EDITOR_LINE_HEIGHT}px; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .gutter-line.error-active { color: #e06c75; font-weight: bold; background: rgba(224, 108, 117, 0.1); }
  
  .json-editor-textarea-wrapper { 
    flex: 1; 
    position: relative; 
    min-width: 0; /* Prevent flex overflow */
  }
  
  .json-editor-textarea-wrapper textarea, .json-editor-textarea-wrapper pre { 
    font-family: ${EDITOR_FONT_FAMILY} !important; 
    font-size: ${EDITOR_FONT_SIZE}px !important; 
    line-height: ${EDITOR_LINE_HEIGHT} !important; 
    padding: 16px !important; 
    margin: 0 !important;
    white-space: pre-wrap !important;
    word-break: break-all !important;
    min-height: 100% !important;
  }
  .json-editor-textarea-wrapper textarea { pointer-events: none; }
  .json-editor-textarea-wrapper textarea.editing { pointer-events: auto; }
  .json-editor-textarea-wrapper pre { pointer-events: auto; }
  
  .token.comment { color: #5c6370; }
  .token.punctuation { color: #abb2bf; }
  .token.property { color: #d19a66; cursor: pointer; }
  .token.string { color: #98c379; cursor: pointer; }
  .token.number, .token.boolean { color: #d19a66; cursor: pointer; }
  .token.keyword { color: #c678dd; cursor: pointer; }
  .token.property:hover, .token.string:hover, .token.number:hover, .token.boolean:hover, .token.keyword:hover { background: rgba(255,255,255,0.08); border-radius: 2px; }
  
  .error-highlight-overlay { 
    position: absolute; 
    left: 0; 
    right: 0; 
    background: rgba(224, 108, 117, 0.1); 
    pointer-events: none; 
    z-index: 1; 
    border-left: 2px solid #e06c75; 
  }

  /* Copy mode: simple read-only view (no textarea) */
  .json-copy-view {
    flex: 1;
    min-width: 0;
    overflow: auto;
    padding: 16px;
    font-family: ${EDITOR_FONT_FAMILY} !important;
    font-size: ${EDITOR_FONT_SIZE}px !important;
    line-height: ${EDITOR_LINE_HEIGHT} !important;
    white-space: pre-wrap;
    word-break: break-all;
    min-height: 100%;
    user-select: none;
  }
  .json-copy-view .token.property,
  .json-copy-view .token.string,
  .json-copy-view .token.number,
  .json-copy-view .token.boolean,
  .json-copy-view .token.keyword {
    cursor: copy;
    border-radius: 3px;
  }
  .json-copy-view .token.property:hover,
  .json-copy-view .token.string:hover,
  .json-copy-view .token.number:hover,
  .json-copy-view .token.boolean:hover,
  .json-copy-view .token.keyword:hover {
    background: rgba(255,255,255,0.15);
    outline: 1px solid rgba(255,255,255,0.3);
  }
`;

const highlightJSON = (code: string) => {
  // Ensure grammar is loaded (fallback if Prism is reset)
  if (!Prism.languages.json) {
    require("prismjs/components/prism-json");
  }
  return Prism.highlight(code, Prism.languages.json || {}, "json");
};

/** Strip surrounding double quotes from a string. */
function stripQuotes(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"'))
    return t.slice(1, -1);
  return t;
}

export default function JsonBeautifier() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [editorMode, setEditorMode] = useState<"beautify" | "minify">(
    "beautify",
  );
  const [error, setError] = useState<{
    message: string;
    line?: number;
    pos?: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyMode, setCopyMode] = useState(false);
  const [copyMessage, setCopyMessage] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [stats, setStats] = useState({ size: 0, nodes: 0, depth: 0 });
  const [mounted, setMounted] = useState(false);
  const textareaContainerRef = useRef<HTMLDivElement>(null);
  const copyMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const showCopyToast = useCallback((message: string, x: number, y: number) => {
    if (copyMessageTimeoutRef.current)
      clearTimeout(copyMessageTimeoutRef.current);
    setCopyMessage({ text: message, x, y });
    copyMessageTimeoutRef.current = setTimeout(() => {
      setCopyMessage(null);
      copyMessageTimeoutRef.current = null;
    }, 2000);
  }, []);

  const handleCopyKeyOrValue = useCallback(
    (text: string, isKey: boolean, x: number, y: number) => {
      navigator.clipboard
        .writeText(text)
        .then(() =>
          showCopyToast(
            isKey ? `Copied key: ${text}` : `Copied: ${text}`,
            x,
            y,
          ),
        )
        .catch(() => console.error("Copy failed"));
    },
    [showCopyToast],
  );

  const copyFromToken = useCallback(
    (token: HTMLElement, x: number, y: number) => {
      const raw = (token.textContent ?? "").trim();
      const isProperty = token.classList.contains("property");
      const isString = token.classList.contains("string");
      const isLiteral =
        token.classList.contains("number") ||
        token.classList.contains("boolean") ||
        token.classList.contains("keyword");

      if (isProperty) {
        handleCopyKeyOrValue(stripQuotes(raw), true, x, y);
      } else if (isString || isLiteral) {
        handleCopyKeyOrValue(isString ? stripQuotes(raw) : raw, false, x, y);
      }
    },
    [handleCopyKeyOrValue],
  );

  // Copy mode only while Alt is held; release Alt to return to normal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt" || e.key === "AltGraph") {
        e.preventDefault();
        setCopyMode(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt" || e.key === "AltGraph") {
        setCopyMode(false);
      }
    };
    if (!mounted) return;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [mounted]);

  const handleEditorMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!copyMode) return;
      const token = (e.target as HTMLElement).closest?.(
        ".token.property, .token.string, .token.number, .token.boolean, .token.keyword",
      ) as HTMLElement | null;
      if (token && textareaContainerRef.current?.contains(token)) {
        e.preventDefault();
        e.stopPropagation();
        copyFromToken(token, e.clientX, e.clientY);
      }
    },
    [copyMode, copyFromToken],
  );

  const handleEditorClick = useCallback(
    (e: React.MouseEvent) => {
      if (copyMode) return;
      const textarea = textareaContainerRef.current?.querySelector(
        "textarea",
      ) as HTMLTextAreaElement | null;
      textarea?.focus();
      textarea?.classList.add("editing");
    },
    [copyMode],
  );

  const handleCopyViewClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const token = (e.target as HTMLElement).closest?.(
        ".token.property, .token.string, .token.number, .token.boolean, .token.keyword",
      ) as HTMLElement | null;
      if (token) {
        e.preventDefault();
        copyFromToken(token, e.clientX, e.clientY);
      }
    },
    [copyFromToken],
  );

  React.useEffect(() => {
    const textarea = textareaContainerRef.current?.querySelector("textarea");
    if (!textarea) return;
    const onBlur = () => textarea.classList.remove("editing");
    textarea.addEventListener("blur", onBlur);
    return () => textarea.removeEventListener("blur", onBlur);
  }, [input]);

  const calculateStats = (obj: any, size: number) => {
    let nodes = 0;
    let maxDepth = 0;
    const traverse = (item: any, depth: number) => {
      nodes++;
      maxDepth = Math.max(maxDepth, depth);
      if (typeof item === "object" && item !== null) {
        Object.values(item).forEach((v) => traverse(v, depth + 1));
      }
    };
    try {
      traverse(obj, 1);
    } catch (e) {}
    setStats({ size, nodes, depth: maxDepth });
  };

  const validateAndFormat = useCallback(
    (raw: string, modeOverride?: "beautify" | "minify" | "fix") => {
      if (!raw.trim()) {
        setError(null);
        setStats({ size: 0, nodes: 0, depth: 0 });
        return;
      }

      const targetMode =
        modeOverride === "fix" ? "beautify" : modeOverride || editorMode;

      try {
        let textToParse = raw;

        if (modeOverride === "fix") {
          textToParse = raw
            .replace(/\/\/.*$/gm, "") // 1. Strip comments
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/'/g, '"') // 2. Normalize quotes

            // 3. Robust Key Quoting (handles start of line, after spaces, or delimiters)
            .replace(/((?:[{,\[\n|^]\s*))([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":')

            // 4. Aggressive Missing Comma Injection
            // Numbers/Words followed by a quoted key: 1800 "duration" -> 1800, "duration"
            .replace(
              /([0-9\.]+|true|false|null|(?:"[^"]*"))\s+(?="[a-zA-Z0-9_$]+":)/g,
              "$1,",
            )
            // Close braces followed by a quoted key: } "services" -> }, "services"
            .replace(/([\}\]])\s+(?="[a-zA-Z0-9_$]+":)/g, "$1,")

            // 5. Handle unquoted strings values like city: Kathmandu
            // Target any word after : that isn't a known keyword or followed by a quote
            .replace(
              /:\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(?!\s*[:])/g,
              (match, p1) => {
                if (["true", "false", "null", "undefined", "NaN"].includes(p1))
                  return match;
                return `: "${p1}"`;
              },
            )

            // 6. Handle unquoted dates
            .replace(
              /:\s*(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)?)(?!\s*:)/g,
              ': "$1"',
            )

            // 7. Final Cleanup
            .replace(/,\s*([}\]])/g, "$1") // Trailing commas
            .replace(/:\s*undefined/g, ": null")
            .replace(/NaN/g, "null");
        }

        const parsed = JSON.parse(textToParse);
        const result =
          targetMode === "minify"
            ? JSON.stringify(parsed)
            : JSON.stringify(parsed, null, indent);

        setInput(result);
        setError(null);
        if (modeOverride && modeOverride !== "fix")
          setEditorMode(modeOverride as "beautify" | "minify");
        calculateStats(parsed, result.length);
      } catch (e: any) {
        const posMatch = e.message.match(/at position (\d+)/);
        const lineMatch = e.message.match(/at line (\d+)/);

        let line = lineMatch ? parseInt(lineMatch[1]) : undefined;
        let pos = posMatch ? parseInt(posMatch[1]) : undefined;

        if (pos !== undefined && line === undefined) {
          line = raw.substring(0, pos).split("\n").length;
        }

        setError({
          message: e.message.replace(/JSON\.parse: /, ""),
          line,
          pos,
        });
      }
    },
    [indent, editorMode],
  );

  const lineCount = input.split("\n").length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        const content = re.target?.result as string;
        setInput(content);
        validateAndFormat(content);
      };
      reader.readAsText(file);
    }
  };

  if (!mounted) return <div className="min-h-[600px]" />;

  return (
    <div className="space-y-4">
      <style dangerouslySetInnerHTML={{ __html: editorTheme }} />

      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 p-2 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <div className="flex bg-background border border-border rounded-md p-0.5">
            {[2, 4].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setIndent(num);
                  validateAndFormat(input, "beautify");
                }}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
                  indent === num && editorMode === "beautify"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent text-muted-foreground",
                )}
              >
                {num}P
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-border mx-0.5" />
          <label className="flex items-center gap-1.5 cursor-pointer hover:bg-accent px-2 py-1 rounded-md transition-colors group">
            <FileUp className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
            <span className="text-[11px] font-medium hidden sm:inline">
              Upload
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("");
              setError(null);
              setStats({ size: 0, nodes: 0, depth: 0 });
            }}
            className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-background/50 border border-border rounded-md mr-1 font-mono text-[10px]">
            <span className="text-muted-foreground">
              SIZE: <b>{stats.size}b</b>
            </span>
            <span className="text-muted-foreground">
              NODES: <b>{stats.nodes}</b>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(input);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!input || !!error}
            className="h-8 px-3 text-[11px]"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 mr-1.5" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            size="sm"
            onClick={() => validateAndFormat(input, "fix")}
            disabled={!error}
            className="h-8 px-3 text-[11px] bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm shadow-amber-500/20"
          >
            <Wand2 className="h-3.5 w-3.5 mr-1.5" /> Auto-Fix
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 flex flex-col space-y-4">
          <Card className="flex-1 border-border transition-all overflow-hidden flex flex-col shadow-xl rounded-xl">
            <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] font-mono text-[#abb2bf] italic">
                  json-editor.io
                </span>
                <span className="text-[9px] text-muted-foreground hidden sm:inline">
                  — Hold Alt for copy mode; hover + click key/value to copy.
                  Release Alt for normal.
                </span>
                {copyMode && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-tighter">
                    <Copy className="h-2.5 w-2.5" /> Copy mode
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => validateAndFormat(input, "beautify")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter transition-colors",
                    editorMode === "beautify"
                      ? "bg-primary/20 text-primary"
                      : "text-[#abb2bf] hover:bg-white/5",
                  )}
                >
                  Beautify
                </button>
                <button
                  onClick={() => validateAndFormat(input, "minify")}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter transition-colors",
                    editorMode === "minify"
                      ? "bg-primary/20 text-primary"
                      : "text-[#abb2bf] hover:bg-white/5",
                  )}
                >
                  Minify
                </button>
              </div>
            </CardHeader>
            <div
              className={cn(
                "json-editor-container cursor-text",
                copyMode && "copy-mode",
              )}
              onMouseDown={!copyMode ? handleEditorMouseDown : undefined}
              onClick={!copyMode ? handleEditorClick : undefined}
            >
              <div className="json-editor-gutter">
                {Array.from({ length: Math.max(lineCount, 1) }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "gutter-line",
                      error?.line === i + 1 && "error-active",
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {copyMode ? (
                <div
                  className="json-copy-view"
                  onClick={handleCopyViewClick}
                  role="application"
                  aria-label="Copy mode: click a key or value to copy"
                  dangerouslySetInnerHTML={{
                    __html: highlightJSON(input || " "),
                  }}
                />
              ) : (
                <div
                  className="json-editor-textarea-wrapper"
                  ref={textareaContainerRef}
                >
                  {error?.line && (
                    <div
                      className="error-highlight-overlay"
                      style={{
                        top: `${16 + (error.line - 1) * EDITOR_FONT_SIZE * EDITOR_LINE_HEIGHT}px`,
                        height: `${EDITOR_FONT_SIZE * EDITOR_LINE_HEIGHT}px`,
                        background: "hsl(var(--destructive) / 0.1)",
                        borderLeft: "2px solid hsl(var(--destructive))",
                      }}
                    />
                  )}
                  <Editor
                    value={input}
                    onValueChange={(code) => {
                      setInput(code);
                      validateAndFormat(code);
                    }}
                    highlight={(code) => highlightJSON(code)}
                    padding={16}
                    readOnly={false}
                    className="font-mono focus:outline-none"
                    style={{ minHeight: "100%" }}
                  />
                </div>
              )}
            </div>
          </Card>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 flex gap-3 min-h-[3.5rem] items-start"
              >
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 text-[11px] font-mono leading-relaxed">
                    <span className="font-bold border-b border-destructive/30 mr-2">
                      LINE {error.line}:
                    </span>
                    {error.message}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 px-4 text-[10px] uppercase font-bold shrink-0 self-end sm:self-auto"
                    onClick={() => validateAndFormat(input, "fix")}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-2" />
                    Attempt Auto-Fix
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-[11px] uppercase tracking-widest text-primary font-bold">
                Quick Toggles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              <Button
                variant={editorMode === "beautify" ? "primary" : "outline"}
                className="w-full justify-start gap-2 h-8 text-[11px] px-2"
                onClick={() => validateAndFormat(input, "beautify")}
              >
                <AlignLeft className="h-3.5 w-3.5 text-primary" /> Format
              </Button>
              <Button
                variant={editorMode === "minify" ? "primary" : "outline"}
                className="w-full justify-start gap-2 h-8 text-[11px] px-2"
                onClick={() => validateAndFormat(input, "minify")}
              >
                <Minimize2 className="h-3.5 w-3.5" /> Compact
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                Export
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 h-8 text-[11px] px-2"
                onClick={() => {
                  const blob = new Blob([input], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `data-${Date.now()}.json`;
                  a.click();
                }}
              >
                <Download className="h-3.5 w-3.5" /> Save File
              </Button>
            </CardContent>
          </Card>

          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <div className="flex items-center gap-2 mb-1">
              <Wand2 className="h-3 w-3 text-amber-600" />
              <span className="text-[10px] font-bold uppercase text-amber-700 tracking-tighter">
                Smart Fix
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Automatically repairs single quotes and trailing commas.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copyMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "fixed",
              left: copyMessage.x,
              top: copyMessage.y,
              transform: "translate(-50%, -100%) translateY(-8px)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-lg border border-primary/20"
          >
            <Check className="h-3.5 w-3.5 shrink-0" />
            {copyMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
