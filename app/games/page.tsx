import React from "react";
import { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui";
import { AdUnit } from "@/components/ads/AdUnit";
import { ADSENSE_CONFIG, SITE_CONFIG } from "@/constants";
import { GamesGrid } from "./GamesGrid";

export const metadata: Metadata = {
  title: "Mini Games Arena | Bhupendra Nath",
  description: "Play free mini browser games: Snake, Ludo, Sudoku, Solitaire, Hextris, Slither.io, Agar.io, Gartic.io, and more. Board, puzzle, arcade, multiplayer, party, and word games. No downloads required.",
  keywords: "mini games, browser games, free online games, html5 games, multiplayer games, snake, ludo, sudoku, hextris, slither.io, agar.io, gartic.io, party games, word games",
  alternates: {
    canonical: `${SITE_CONFIG.url}/games`,
  },
  openGraph: {
    title: "Mini Games Arena | Bhupendra Nath",
    description: "Play free mini browser games directly in your browser. No downloads required.",
    url: `${SITE_CONFIG.url}/games`,
    siteName: "Bhupendra Nath Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Games Arena | Bhupendra Nath",
    description: "Play free mini browser games directly in your browser. No downloads required.",
  },
};

export default function GamesPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/30">
      <Section id="games-dashboard">
        <div className="container-custom">
          <SectionHeader
            title="Mini Games Arena"
            description="Free browser games by category: Arcade, Board, Puzzle, Multiplayer, Party, Word, and Strategy. Play alone or with friends on different devices—no downloads required."
          />

          <AdUnit 
            pId={ADSENSE_CONFIG.pId} 
            slot={ADSENSE_CONFIG.slots.gamesDashboard} 
            className="mt-8 flex justify-center" 
          />

          <div className="mt-12">
            <GamesGrid />
          </div>
        </div>
      </Section>
    </div>
  );
}
