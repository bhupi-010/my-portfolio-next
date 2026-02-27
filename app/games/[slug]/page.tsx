import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GAMES } from "@/lib/games";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { GamePlayer } from "./GamePlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = GAMES.find((g) => g.slug === slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} | Mini Games`,
    description: `Play ${game.title} online. ${game.description}`,
    keywords: `${game.title}, browser game, play ${game.title}, mini games`,
  };
}

export async function generateStaticParams() {
  return GAMES.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = GAMES.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/20">
      <div className="container-custom max-w-5xl">
        <div className="mb-6">
          <Link href="/games">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Arena
            </Button>
          </Link>
        </div>

        <GamePlayer iframeUrl={game.iframeUrl} title={game.title} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-bold">About {game.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {game.description} This version is optimized for browser play and works on most modern devices. Enjoy the gameplay without any downloads or installations.
                </p>
            </div>
            <div className="bg-background/50 border border-border rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Game Info</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-bold">{game.category}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Platform</span>
                        <span className="font-bold">Browser (HTML5)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-emerald-500 font-bold">Playable</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
