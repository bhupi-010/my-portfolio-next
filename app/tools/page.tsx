"use client";

import React from "react";
import Link from "next/link";
import { Section, SectionHeader, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { TOOLS_ITEMS } from "@/constants";
import { motion } from "framer-motion";
import { Hash, FileJson, ArrowRightLeft, Image as ImageIcon, Gamepad2, ArrowRight } from "lucide-react";

const TOOL_ICONS: Record<string, any> = {
  'SHA 256 Generator': Hash,
  'JSON Beautifier': FileJson,
  'Base64 Encode/Decode': ArrowRightLeft,
  'Base64 Image Encode/Decode': ImageIcon,
  'Tic Tac Toe Game': Gamepad2,
};

const TOOL_DETAILS: Record<string, string> = {
  'SHA 256 Generator': 'Generate secure SHA-256 hashes locally in your browser for passwords, verification, and more.',
  'JSON Beautifier': 'Format, minify, and validate your JSON data with instant feedback and error highlighting.',
  'Base64 Encode/Decode': 'Easily encode text to Base64 or decode Base64 strings back to plain text.',
  'Base64 Image Encode/Decode': 'Convert images to Base64 Data URIs or view images from Base64 strings.',
  'Tic Tac Toe Game': 'A classic game built with React. Play against a friend or challenge the basic AI.',
};

export default function ToolsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/30">
      <Section id="tools-dashboard">
        <div className="container-custom">
          <SectionHeader
            title="Developer Tools"
            description="A premium collection of essential utilities for developers. Built for performance and privacy—all processing happens on your device."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {TOOLS_ITEMS.map((tool, index) => {
              const Icon = TOOL_ICONS[tool.label];
              return (
                <motion.div
                  key={tool.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={tool.href}>
                    <Card className="h-full group hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {Icon && <Icon className="h-6 w-6 text-primary" />}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{tool.label}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {TOOL_DETAILS[tool.label]}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Open Tool <ArrowRight className="ml-2 h-4 w-4" />
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
