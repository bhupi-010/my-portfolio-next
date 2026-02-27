export interface Game {
  title: string;
  slug: string;
  description: string;
  iframeUrl: string;
  category: string;
}

export const GAMES: Game[] = [
  {
    title: "2048",
    slug: "2048",
    description: "Join the numbers and get to the 2048 tile! A classic addictive puzzle game.",
    iframeUrl: "https://play2048.co/",
    category: "Puzzle"
  },
  {
    title: "Tetris",
    slug: "tetris",
    description: "The world-famous tile-matching puzzle game. Stack the blocks and clear the lines.",
    iframeUrl: "https://tetris.com/play-tetris",
    category: "Arcade"
  },
  {
    title: "Snake",
    slug: "snake",
    description: "Classic Nokia-style snake game. Eat the apples and grow as long as possible.",
    iframeUrl: "https://www.google.com/logos/2010/pacman10-i.html", // Placeholder, Google Snake usually embedded differently
    category: "Classic"
  },
  {
    title: "Pong",
    slug: "pong",
    description: "The original table tennis sports game featuring simple two-dimensional graphics.",
    iframeUrl: "https://pong-2.com/",
    category: "Classic"
  },
  {
    title: "Breakout",
    slug: "breakout",
    description: "Destroy all the bricks by bouncing a ball with a paddle. High-octane arcade action.",
    iframeUrl: "https://www.google.com/logos/2013/atari/atari.html",
    category: "Arcade"
  },
  {
    title: "Minesweeper",
    slug: "minesweeper",
    description: "Clear the grid without detonating any hidden mines in this classic logic puzzle.",
    iframeUrl: "https://minesweeperapp.com/",
    category: "Puzzle"
  },
  {
    title: "Tic Tac Toe",
    slug: "tic-tac-toe-pro",
    description: "Test your strategy in the classic X or O game with a modern minimal interface.",
    iframeUrl: "/tools/tic-tac-toe", // Internal redirect or external
    category: "Board"
  },
  {
    title: "Sudoku",
    slug: "sudoku",
    description: "Exercise your brain with the popular logic-based number-placement puzzle.",
    iframeUrl: "https://sudoku.com/",
    category: "Puzzle"
  },
  {
    title: "Hangman",
    slug: "hangman",
    description: "Guess the hidden word before the stickman is fully drawn. Classic word game.",
    iframeUrl: "https://www.hangmanwords.com/play",
    category: "Word"
  },
  {
    title: "Memory Game",
    slug: "memory-game",
    description: "Find matching pairs of cards to clear the board. Improve your visual memory.",
    iframeUrl: "https://matchthememory.com/classic",
    category: "Puzzle"
  },
  {
    title: "Space Invaders",
    slug: "space-invaders",
    description: "Defend Earth from waves of descending alien invaders in this arcade masterpiece.",
    iframeUrl: "https://freeinvaders.org/",
    category: "Arcade"
  },
  {
    title: "Pac-Man",
    slug: "pac-man",
    description: "Navigate through the maze eating pellets and avoiding ghosts in the retro legend.",
    iframeUrl: "https://www.google.com/logos/2010/pacman10-i.html",
    category: "Arcade"
  },
  {
    title: "Asteroids",
    slug: "asteroids",
    description: "Pilot your spaceship through a hazardous asteroid field and blast everything in sight.",
    iframeUrl: "https://freeasteroids.org/",
    category: "Arcade"
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
    title: "HexGL",
    slug: "hexgl",
    description: "High-speed futuristic racing game built with HTML5 and WebGL. Feel the speed.",
    iframeUrl: "http://hexgl.bkcore.com/play/",
    category: "Racing"
  },
  {
    title: "Crossy Road",
    slug: "crossy-road",
    description: "Why did the chicken cross the road? Guide characters through busy traffic and rivers.",
    iframeUrl: "https://poki.com/en/g/crossy-road",
    category: "Arcade"
  },
  {
    title: "Whack a Mole",
    slug: "whack-a-mole",
    description: "Quick reflexes required! Hit the moles as they pop out of their holes.",
    iframeUrl: "https://www.jquerysteps.com/blog/whack-a-mole-game-in-javascript/", // Placeholder code link
    category: "Arcade"
  },
  {
    title: "Agar.io",
    slug: "agar-io",
    description: "The massive multiplayer survival game. Eat cells smaller than you and grow larger.",
    iframeUrl: "https://agar.io/",
    category: "Multiplayer"
  },
  {
    title: "Slither.io",
    slug: "slither-io",
    description: "Travel through a neon arena eating glowing dots to become the longest snake of all.",
    iframeUrl: "https://slither.io/",
    category: "Multiplayer"
  }
];
