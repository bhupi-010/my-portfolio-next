"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { GAMES, type Game } from "@/lib/games";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Button,
} from "@/components/ui";
import { Gamepad2, Play, Search, Trophy } from "lucide-react";

/** Display order for categories when showing "All" */
const CATEGORY_ORDER = [
  "Arcade",
  "Board",
  "Cards",
  "Classic",
  "Multiplayer",
  "Party",
  "Word",
  "Puzzle",
  "Strategy",
  "Racing",
];

function getCategories(): string[] {
  const set = new Set(GAMES.map((g) => g.category));
  return CATEGORY_ORDER.filter((c) => set.has(c)).concat(
    [...set].filter((c) => !CATEGORY_ORDER.includes(c)).sort()
  );
}

function filterGames(
  games: Game[],
  searchQuery: string,
  categoryFilter: string
): Game[] {
  const q = searchQuery.trim().toLowerCase();
  return games.filter((game) => {
    const matchCategory = !categoryFilter || game.category === categoryFilter;
    const matchName =
      !q ||
      game.title.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q) ||
      game.slug.toLowerCase().includes(q);
    return matchCategory && matchName;
  });
}

function groupByCategory(games: Game[]): Map<string, Game[]> {
  const map = new Map<string, Game[]>();
  for (const game of games) {
    const list = map.get(game.category) ?? [];
    list.push(game);
    map.set(game.category, list);
  }
  return map;
}

function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="h-full group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-background/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <CardHeader>
          <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <Gamepad2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase">
              {game.category}
            </span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors text-lg font-bold">
            {game.title}
          </CardTitle>
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
  );
}

export function GamesGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useMemo(() => getCategories(), []);

  const filteredGames = useMemo(
    () => filterGames(GAMES, searchQuery, categoryFilter),
    [searchQuery, categoryFilter]
  );

  const byCategory = useMemo(
    () => (categoryFilter ? null : groupByCategory(filteredGames)),
    [filteredGames, categoryFilter]
  );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Filter by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            aria-label="Filter games by name"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground font-medium shrink-0">
            Category:
          </span>
          <Button
            variant={categoryFilter === "" ? "primary" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("")}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "primary" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} found
      </p>

      {/* Content: by category or single grid */}
      {filteredGames.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No games match your filters. Try a different search or category.
        </p>
      ) : categoryFilter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {CATEGORY_ORDER.filter((cat) => (byCategory?.get(cat)?.length ?? 0) > 0).map(
            (cat) => {
              const gamesInCat = byCategory!.get(cat) ?? [];
              if (gamesInCat.length === 0) return null;
              return (
                <div
                  key={cat}
                  id={`category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                    <span className="text-primary">{cat}</span>
                    <span className="text-muted-foreground font-normal text-sm">
                      ({gamesInCat.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {gamesInCat.map((game) => (
                      <GameCard key={game.slug} game={game} />
                    ))}
                  </div>
                </div>
              );
            }
          )}
          {/* Any category not in CATEGORY_ORDER */}
          {[...(byCategory?.keys() ?? [])]
            .filter((cat) => !CATEGORY_ORDER.includes(cat))
            .sort()
            .map((cat) => {
              const gamesInCat = byCategory!.get(cat) ?? [];
              if (gamesInCat.length === 0) return null;
              return (
                <div
                  key={cat}
                  id={`category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                    <span className="text-primary">{cat}</span>
                    <span className="text-muted-foreground font-normal text-sm">
                      ({gamesInCat.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {gamesInCat.map((game) => (
                      <GameCard key={game.slug} game={game} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
