import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/games";
import { Section, SectionHeader, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { Gamepad2, Play, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Mini Games Arena | Bhupendra Nath",
  description: "Play 20+ classic mini browser games like Hextris, Sudoku, and Battleships. High-performance, mobile-friendly collection with no downloads required.",
  keywords: "mini games, browser games, free online games, html5 games, 2048, hextris, sudoku, battleships, logic puzzles, arcade games",
  alternates: {
    canonical: "https://bhupendranath.com.np/games",
  },
  openGraph: {
    title: "Mini Games Arena | Bhupendra Nath",
    description: "Play 20+ classic mini browser games directly in your browser. No downloads required.",
    url: "https://bhupendranath.com.np/games",
    siteName: "Bhupendra Nath Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Games Arena | Bhupendra Nath",
    description: "Play 20+ classic mini browser games directly in your browser. No downloads required.",
  },
};

export default function GamesPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/30">
      <Section id="games-dashboard">
        <div className="container-custom">
          <SectionHeader
            title="Mini Games Arena"
            description="Relive the classics or challenge yourself with our curated collection of browser-based mini games. No downloads required."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {GAMES.map((game) => (
              <Link key={game.slug} href={`/games/${game.slug}`}>
                <Card className="h-full group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-background/50 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                      <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  
                  <CardHeader>
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                      <Gamepad2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase">{game.category}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg font-bold">{game.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 text-xs leading-relaxed">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                      Play Now <Play className="ml-2 h-3 w-3 fill-current" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
