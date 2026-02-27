import React from "react";
import { Metadata } from "next";
import { TOOLS_ITEMS } from "@/constants";
import { ToolsDashboard } from "./ToolsDashboard";

export const metadata: Metadata = {
  title: "Developer Tools | Bhupendra Nath",
  description: "A premium collection of high-performance developer utilities including SHA-256 hash generator, JSON beautifier, Base64 encoder, and more. Privacy-first, local browser processing.",
  keywords: "developer tools, JSON formatter, SHA-256, Base64 encoder, image to base64, Tic Tac Toe, programmer utilities",
  alternates: {
    canonical: "https://bhupendranath.com.np/tools",
  },
  openGraph: {
    title: "Developer Tools | Bhupendra Nath",
    description: "Premium browser-based tools for developers. Fast, secure, and privacy-focused utility collection.",
    type: "website",
    url: "https://bhupendranath.com.np/tools",
  }
};

export default function ToolsPage() {
  return <ToolsDashboard tools={[...TOOLS_ITEMS]} />;
}
