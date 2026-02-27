"use client";

import React from "react";
import Link from "next/link";
import { Section, SectionHeader, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { motion } from "framer-motion";
import { Hash, FileJson, ArrowRightLeft, Image as ImageIcon, Gamepad2, ArrowRight } from "lucide-react";
import { AdUnit } from "@/components/ads/AdUnit";
import { ADSENSE_CONFIG } from "@/constants";

const TOOL_ICONS: Record<string, any> = {
  'SHA 256 Generator': Hash,
  'JSON Beautifier': FileJson,
  'Base64 Encode/Decode': ArrowRightLeft,
  'Base64 Image Encode/Decode': ImageIcon,
  'Tic Tac Toe Game': Gamepad2,
};

interface ToolsDashboardProps {
  tools: any[];
}

export function ToolsDashboard({ tools }: ToolsDashboardProps) {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/30">
      <Section id="tools-dashboard">
        <div className="container-custom">
          <SectionHeader
            title="Developer Tools"
            description="A premium collection of essential utilities for developers. Built for performance and privacy—all processing happens on your device."
          />

          <AdUnit 
            pId={ADSENSE_CONFIG.pId} 
            slot={ADSENSE_CONFIG.slots.toolsDashboard} 
            className="mt-8 flex justify-center" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {tools.map((tool, index) => {
              const Icon = TOOL_ICONS[tool.label];
              return (
                <motion.div
                  key={tool.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={tool.href}>
                    <Card className="h-full group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-background/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                          {Icon && <Icon className="h-6 w-6 text-primary" />}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors text-lg font-bold">{tool.label}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2 text-xs leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                          Launch Tool <ArrowRight className="ml-2 h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
