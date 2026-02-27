"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Section, SectionHeader, Button } from "@/components/ui";
import { TicTacToe, Sha256Generator, JsonBeautifier, Base64Tool, Base64ImageTool } from "@/features/tools";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { TOOLS_ITEMS } from "@/constants";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'sha-256': Sha256Generator,
  'json-beautifier': JsonBeautifier,
  'base64-text': Base64Tool,
  'base64-image': Base64ImageTool,
  'tic-tac-toe': TicTacToe,
};

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const ToolComponent = TOOL_COMPONENTS[slug];
  const toolInfo = TOOLS_ITEMS.find(t => t.slug === slug);

  if (!ToolComponent || !toolInfo) {
    return (
      <div className="pt-32 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted-foreground mb-8">The tool you are looking for does not exist.</p>
        <Button onClick={() => router.push('/tools')}>Back to Tools</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => {
            navigator.share?.({
                title: toolInfo.label,
                url: window.location.href
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            });
          }}>
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background rounded-2xl p-6 md:p-10 border border-border shadow-xl shadow-primary/5"
        >
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{toolInfo.label}</h1>
            <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Professional utility designed for high-performance and local data processing.
            </p>
          </div>

          <div className="min-h-[400px]">
            <ToolComponent />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
