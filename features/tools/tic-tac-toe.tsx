"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
    Button, 
    Card, 
    CardContent, 
} from "@/components/ui";
import { 
    RefreshCcw, 
    User, 
    Cpu, 
    Trophy, 
    Gamepad2,
    Users,
    Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Player = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [isAgainstCpu, setIsAgainstCpu] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    if (squares.every((square) => square !== null)) return { winner: "Draw" as const, line: null };
    return null;
  };

  const handleWin = useCallback((w: Player | "Draw", line: number[] | null) => {
    setWinner(w);
    setWinningLine(line);
    if (w === "Draw") {
        setScore(s => ({ ...s, Draws: s.Draws + 1 }));
    } else if (w) {
        setScore(s => ({ ...s, [w]: s[w] + 1 }));
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: w === 'X' ? ['#ef4444', '#f87171'] : ['#3b82f6', '#60a5fa']
        });
    }
  }, []);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const result = calculateWinner(newBoard);
    if (result) {
        handleWin(result.winner, result.line);
    }
  };

  const makeCpuMove = useCallback(() => {
    const emptySquares = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
    
    if (emptySquares.length === 0 || winner) return;

    // Smart-ish AI: try to win, else block, else random
    const newBoard = board.slice();
    
    // 1. Try to win
    for (let i of emptySquares) {
        newBoard[i] = 'O';
        if (calculateWinner(newBoard)?.winner === 'O') {
            handleClick(i); return;
        }
        newBoard[i] = null;
    }

    // 2. Block X
    for (let i of emptySquares) {
        newBoard[i] = 'X';
        if (calculateWinner(newBoard)?.winner === 'X') {
            handleClick(i); return;
        }
        newBoard[i] = null;
    }

    // 3. Center or Random
    if (emptySquares.includes(4)) {
        handleClick(4);
    } else {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        handleClick(randomMove);
    }
  }, [board, winner]);

  useEffect(() => {
    if (isAgainstCpu && !isXNext && !winner) {
      const timer = setTimeout(makeCpuMove, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, isAgainstCpu, winner, makeCpuMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="space-y-3 max-w-sm mx-auto py-2">
      {/* Score row – compact */}
      <div className="grid grid-cols-3 gap-2">
          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
              <div className="p-2 text-center">
                  <p className="text-[9px] font-bold text-primary uppercase tracking-tighter flex items-center justify-center gap-0.5">
                      <User className="h-2.5 w-2.5" /> X
                  </p>
                  <p className="text-lg font-black text-primary leading-tight">{score.X}</p>
              </div>
              {isXNext && !winner && <motion.div layoutId="turn" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </Card>
          <Card className="bg-muted/50 border-border overflow-hidden p-2 text-center">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Draws</p>
              <p className="text-lg font-black text-foreground leading-tight">{score.Draws}</p>
          </Card>
          <Card className="bg-blue-500/5 border-blue-500/10 overflow-hidden relative">
              <div className="p-2 text-center">
                  <p className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter flex items-center justify-center gap-0.5">
                      {isAgainstCpu ? <Cpu className="h-2.5 w-2.5" /> : <Users className="h-2.5 w-2.5" />} O
                  </p>
                  <p className="text-lg font-black text-blue-500 leading-tight">{score.O}</p>
              </div>
              {!isXNext && !winner && <motion.div layoutId="turn" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </Card>
      </div>

      {/* Board – single-screen size, touch-friendly */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000" />
        <Card className="relative bg-background/80 backdrop-blur-xl border-border shadow-xl p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Gamepad2 className="h-3 w-3 text-primary" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-tight truncate">Classic Duel</h4>
                        <p className="text-[8px] text-muted-foreground truncate">{isAgainstCpu ? "vs CPU" : "2 Player"}</p>
                    </div>
                </div>
                <div className="flex gap-0.5 bg-muted p-0.5 rounded flex-shrink-0">
                    <button
                        onClick={() => { setIsAgainstCpu(false); resetGame(); setScore({X:0,O:0,Draws:0}); }}
                        className={cn("p-1 rounded transition-all min-w-[28px] min-h-[28px] flex items-center justify-center", !isAgainstCpu ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                        title="2 Player"
                    >
                        <Users className="h-3 w-3" />
                    </button>
                    <button
                        onClick={() => { setIsAgainstCpu(true); resetGame(); setScore({X:0,O:0,Draws:0}); }}
                        className={cn("p-1 rounded transition-all min-w-[28px] min-h-[28px] flex items-center justify-center", isAgainstCpu ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                        title="vs CPU"
                    >
                        <Cpu className="h-3 w-3" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto">
                {board.map((cell, i) => (
                    <motion.button
                        key={i}
                        whileHover={!cell && !winner ? { scale: 0.98, backgroundColor: "rgba(var(--primary), 0.05)" } : {}}
                        whileTap={!cell && !winner ? { scale: 0.95 } : {}}
                        onClick={() => handleClick(i)}
                        className={cn(
                            "aspect-square min-h-[72px] rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-black transition-all duration-300 relative",
                            !cell && !winner && "bg-muted/30 hover:shadow-inner",
                            cell && "bg-background shadow-lg border border-border/50",
                            winningLine?.includes(i) && (winner === 'X' ? "bg-primary text-white scale-105 z-10 shadow-primary/40 border-primary" : "bg-blue-500 text-white scale-105 z-10 shadow-blue-500/40 border-blue-500")
                        )}
                    >
                        <AnimatePresence>
                            {cell && (
                                <motion.span
                                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    className={cn(
                                        "select-none",
                                        cell === "X" && !winningLine?.includes(i) && "text-primary",
                                        cell === "O" && !winningLine?.includes(i) && "text-blue-500",
                                        winningLine?.includes(i) && "text-white"
                                    )}
                                >
                                    {cell}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                 <div className="flex items-center gap-1.5 min-w-0">
                     <AnimatePresence mode="wait">
                         {winner ? (
                             <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center gap-1.5"
                             >
                                 <Trophy className={cn("h-4 w-4 flex-shrink-0", winner === 'Draw' ? "text-amber-500" : (winner === 'X' ? "text-primary" : "text-blue-500"))} />
                                 <span className="text-xs font-black uppercase tracking-tight truncate">
                                     {winner === 'Draw' ? "Tie!" : `${winner} wins!`}
                                 </span>
                             </motion.div>
                         ) : (
                             <div className="flex items-center gap-1.5">
                                <Zap className={cn("h-3.5 w-3.5 animate-pulse flex-shrink-0", isXNext ? "text-primary" : "text-blue-500")} />
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Your turn</span>
                             </div>
                         )}
                     </AnimatePresence>
                 </div>
                 <Button
                    variant="secondary"
                    size="sm"
                    onClick={resetGame}
                    className="h-8 px-3 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-1.5 flex-shrink-0"
                 >
                    <RefreshCcw className="h-3.5 w-3.5" /> New game
                 </Button>
            </div>
        </Card>
      </div>

      {/* Minimal footer */}
      <div className="flex items-center justify-center gap-4 py-1 opacity-40">
          <span className="font-mono text-[9px] font-bold">Session</span>
          <span className="font-mono text-[9px] font-bold">0ms</span>
      </div>
    </div>
  );
}
