"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { RefreshCcw, User, Cpu } from "lucide-react";
import confetti from "canvas-confetti";

type Player = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [isAgainstCpu, setIsAgainstCpu] = useState(false);

  useEffect(() => {
    if (isAgainstCpu && !isXNext && !winner) {
      const timer = setTimeout(makeCpuMove, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, isAgainstCpu, winner]);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) return "Draw";
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner !== "Draw") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const makeCpuMove = () => {
    const emptySquares = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
    if (emptySquares.length === 0) return;

    // Basic AI: Try to win, or block, otherwise random
    const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    handleClick(randomMove);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (i: number) => (
    <button
      className="h-20 w-20 sm:h-24 sm:w-24 border border-border bg-background text-3xl font-bold transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary rounded-lg flex items-center justify-center text-foreground"
      onClick={() => handleClick(i)}
    >
      <span className={board[i] === "X" ? "text-primary" : "text-blue-400"}>
        {board[i]}
      </span>
    </button>
  );

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="flex justify-between items-center gap-4">
        <Button 
          variant={isAgainstCpu ? "outline" : "primary"} 
          onClick={() => { setIsAgainstCpu(false); resetGame(); }}
          className="flex-1"
        >
          <User className="mr-2 h-4 w-4" /> 2 Players
        </Button>
        <Button 
          variant={isAgainstCpu ? "primary" : "outline"} 
          onClick={() => { setIsAgainstCpu(true); resetGame(); }}
          className="flex-1"
        >
          <Cpu className="mr-2 h-4 w-4" /> vs CPU
        </Button>
      </div>

      <Card className="p-0 border-none shadow-xl bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            {winner ? (
              <h3 className="text-2xl font-bold animate-bounce text-primary">
                {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
              </h3>
            ) : (
              <p className="text-lg font-medium text-muted-foreground">
                Next Player: <span className={isXNext ? "text-primary" : "text-blue-400"}>{isXNext ? "X" : "O"}</span>
                {isAgainstCpu && !isXNext && " (CPU Thinking...)"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 justify-center items-center">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <React.Fragment key={i}>{renderSquare(i)}</React.Fragment>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center pb-6">
          <Button onClick={resetGame} variant="outline" size="lg" className="w-full">
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
