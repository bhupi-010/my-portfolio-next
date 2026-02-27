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
    History
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
    <div className="space-y-6 max-w-xl mx-auto py-4">
      {/* Game Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
              <div className="p-3 text-center">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1 flex items-center justify-center gap-1">
                      <User className="h-3 w-3" /> Player X
                  </p>
                  <p className="text-xl font-black text-primary">{score.X}</p>
              </div>
              {isXNext && !winner && <motion.div layoutId="turn" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
          </Card>
          <Card className="bg-muted/50 border-border overflow-hidden p-3 text-center">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mb-1">Draws</p>
              <p className="text-xl font-black text-foreground">{score.Draws}</p>
          </Card>
          <Card className="bg-blue-500/5 border-blue-500/10 overflow-hidden relative">
              <div className="p-3 text-center">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mb-1 flex items-center justify-center gap-1">
                      {isAgainstCpu ? <Cpu className="h-3 w-3" /> : <Users className="h-3 w-3" />} Player O
                  </p>
                  <p className="text-xl font-black text-blue-500">{score.O}</p>
              </div>
              {!isXNext && !winner && <motion.div layoutId="turn" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />}
          </Card>
      </div>

      {/* Main Game Interface */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        <Card className="relative bg-background/80 backdrop-blur-xl border-border shadow-2xl p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Gamepad2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">Classic Duel</h4>
                        <p className="text-[10px] text-muted-foreground">{isAgainstCpu ? "vs Machine Intelligence" : "Local Multiplayer"}</p>
                    </div>
                </div>
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                    <button 
                        onClick={() => { setIsAgainstCpu(false); resetGame(); setScore({X:0,O:0,Draws:0}); }}
                        className={cn("p-1.5 rounded-md transition-all", !isAgainstCpu ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                    >
                        <Users className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={() => { setIsAgainstCpu(true); resetGame(); setScore({X:0,O:0,Draws:0}); }}
                        className={cn("p-1.5 rounded-md transition-all", isAgainstCpu ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                    >
                        <Cpu className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {board.map((cell, i) => (
                    <motion.button
                        key={i}
                        whileHover={!cell && !winner ? { scale: 0.98, backgroundColor: "rgba(var(--primary), 0.05)" } : {}}
                        whileTap={!cell && !winner ? { scale: 0.95 } : {}}
                        onClick={() => handleClick(i)}
                        className={cn(
                            "aspect-square rounded-2xl flex items-center justify-center text-4xl font-black transition-all duration-300 relative",
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

            <div className="mt-8 flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                     <AnimatePresence mode="wait">
                         {winner ? (
                             <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center gap-2"
                             >
                                 <Trophy className={cn("h-5 w-5", winner === 'Draw' ? "text-amber-500" : (winner === 'X' ? "text-primary" : "text-blue-500"))} />
                                 <span className="text-sm font-black uppercase tracking-tight">
                                     {winner === 'Draw' ? "It's a tie!" : `${winner} dominating!`}
                                 </span>
                             </motion.div>
                         ) : (
                             <div className="flex items-center gap-2">
                                <Zap className={cn("h-4 w-4 animate-pulse", isXNext ? "text-primary" : "text-blue-500")} />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Live session active</span>
                             </div>
                         )}
                     </AnimatePresence>
                 </div>
                 <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={resetGame}
                    className="h-9 px-4 rounded-xl font-bold uppercase tracking-wider text-[11px] gap-2 active:scale-95 transition-all shadow-sm"
                 >
                    <RefreshCcw className="h-4 w-4" /> New Round
                 </Button>
            </div>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-6 py-2 opacity-50">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
              <History className="h-3 w-3" /> SESSION_PERSISTENT
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
              <Zap className="h-3 w-3" /> LATENCY_0ms
          </div>
      </div>
    </div>
  );
}
