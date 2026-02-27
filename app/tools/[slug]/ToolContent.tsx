"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { TicTacToe, Sha256Generator, JsonBeautifier, Base64Tool, Base64ImageTool } from "@/features/tools";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'sha-256': Sha256Generator,
  'json-beautifier': JsonBeautifier,
  'base64-text': Base64Tool,
  'base64-image': Base64ImageTool,
  'tic-tac-toe': TicTacToe,
};

interface ToolContentProps {
  slug: string;
  toolInfo: {
      label: string;
      description: string;
  };
}

export function ToolContent({ slug, toolInfo }: ToolContentProps) {
  const router = useRouter();
  const ToolComponent = TOOL_COMPONENTS[slug];

  if (!ToolComponent) return null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: toolInfo.label, url });
    } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-20 pb-10 min-h-screen bg-muted/10">
      <div className="container-custom max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/tools">
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 px-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-4">
             <h1 className="text-sm font-bold tracking-tight text-muted-foreground hidden md:block">
                {toolInfo.label}
             </h1>
             <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 px-3" onClick={handleShare}>
                <Share2 className="h-3.5 w-3.5" /> Share
             </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background rounded-xl p-4 md:p-6 border border-border shadow-md"
        >
          <div className="mb-6 border-b border-border/50 pb-4">
            <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-black tracking-tighter uppercase">{toolInfo.label}</h2>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">v1.2</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE</span>
                </div>
            </div>
            <p className="text-muted-foreground text-[11px] md:text-xs mt-2 max-w-3xl leading-relaxed">
              {toolInfo.description} All computations are performed locally for maximum privacy.
            </p>
          </div>

          <div className="min-h-[500px]">
            <ToolComponent />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
