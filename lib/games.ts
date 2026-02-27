export interface Game {
  title: string;
  slug: string;
  description: string;
  iframeUrl: string;
  category: string;
}

export const GAMES: Game[] = [
  {
    title: "Hextris",
    slug: "hextris",
    description: "A fast-paced hexagonal Tetris variant. Rotate the hexagon to match blocks.",
    iframeUrl: "https://hextris.io/",
    category: "Arcade"
  },
  {
    title: "Snake PWA",
    slug: "snake-pwa",
    description: "Classic Snake rebuilt as a high-performance progressive web app. Eat and grow!",
    iframeUrl: "https://snake-pwa.github.io/",
    category: "Classic"
  },
  {
    title: "Soodoku",
    slug: "sudoku",
    description: "Clean, minimal Sudoku puzzles. Exercise your logic with infinite number placements.",
    iframeUrl: "https://soodoku.com/",
    category: "Puzzle"
  },
  {
    title: "Battleships",
    slug: "battleships",
    description: "Solitaire version of the classic naval combat game. Sink the enemy fleet.",
    iframeUrl: "https://lukerissacher.com/battleships",
    category: "Strategy"
  },
  {
    title: "Prime Sweeper",
    slug: "minesweeper-prime",
    description: "A clever variant of Minesweeper involving prime numbers and logical deduction.",
    iframeUrl: "https://vole.wtf/primesweeper/",
    category: "Puzzle"
  },
  {
    title: "Tic Tac Toe AI",
    slug: "tic-tac-toe-ai",
    description: "Play the classic Tic Tac Toe against a smart computer opponent. Can you win?",
    iframeUrl: "https://tmaiadev-tictactoe.netlify.app/",
    category: "Board"
  },
  {
    title: "TacTicToe 3D",
    slug: "tactictoe-3d",
    description: "A 3D variant of Tic Tac Toe with a unique push mechanic for deeper strategy.",
    iframeUrl: "https://tactictoe.io/",
    category: "Strategy"
  },
  {
    title: "Othello Rust",
    slug: "othello-rust",
    description: "Fast-paced Othello (Reversi) implementation in Rust and WebAssembly.",
    iframeUrl: "https://othello-rust.web.app/",
    category: "Board"
  },
  {
    title: "PWA Memory",
    slug: "memory-pwa",
    description: "Find matching pairs in this modern memory game built for fast browser play.",
    iframeUrl: "https://pwa-memory-game.surge.sh/",
    category: "Puzzle"
  },
  {
    title: "Hex Puzzles",
    slug: "hex-puzzle",
    description: "A series of challenging hexagonal logic puzzles that will test your spatial reasoning.",
    iframeUrl: "http://www.mseymour.ca/hex_puzzle/hexpuzzle.html",
    category: "Puzzle"
  },
  {
    title: "Colamone",
    slug: "colamone",
    description: "A chess-like board game with simple rules and deep tactical possibilities.",
    iframeUrl: "https://kurehajime.github.io/colamone_js/",
    category: "Board"
  },
  {
    title: "HexGL",
    slug: "hexgl",
    description: "High-speed futuristic racing game built with HTML5 and WebGL. Feel the speed.",
    iframeUrl: "http://hexgl.bkcore.com/play/",
    category: "Racing"
  },
  {
    title: "Chrome Dino",
    slug: "chrome-dino",
    description: "The ultimate 'No Internet' companion. Run, jump over cacti, and dodge pterodactyls.",
    iframeUrl: "https://chromedino.com/",
    category: "Classic"
  },
  {
    title: "Flappy Bird",
    slug: "flappy-bird",
    description: "Tap to flap your wings and navigate through infinite rows of green pipes.",
    iframeUrl: "https://flappybird.io/",
    category: "Arcade"
  },
  {
    title: "Slither.io",
    slug: "slither-io",
    description: "Travel through a neon arena eating glowing dots to become the longest snake of all.",
    iframeUrl: "https://slither.io/",
    category: "Multiplayer"
  }
];
