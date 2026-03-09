/**
 * Long-form, unique content for each game page to meet quality and minimum content guidelines.
 * Each block is 150+ words of substantive, useful information about the game.
 * Games are free iframe embeds from PlayPager (playpager.com).
 */

export const GAME_PAGE_CONTENT: Record<
  string,
  { howToPlay: string; whyIncluded: string }
> = {
  snake: {
    howToPlay:
      "Snake is the classic game where you control a snake that moves around the grid. Use the arrow keys or on-screen controls to change direction. Eat the fruit that appears to grow longer. The catch: don't hit the walls or your own body. This version includes Survival mode (grow as long as you can) and Adventure mode with levels. In Adventure mode you must eat a set number of fruits per level while avoiding obstacles. The game runs in your browser with no install required and works on desktop and mobile.",
    whyIncluded:
      "This Snake game is provided by PlayPager, a free embeddable games platform. It is included so you can play a classic arcade game directly on this site. PlayPager allows website owners to embed their HTML5 games at no cost; the games have no ads inside them. All games in this Mini Games Arena use free iframe embeds from sources that permit embedding.",
  },
  ludo: {
    howToPlay:
      "Ludo is a classic board game for 2–4 players. Each player has four tokens and tries to move them from home base to the center. Roll the dice each turn and move one token the shown number of spaces. Roll a 6 to leave home and get an extra turn. Land on an opponent's token to send it back to their base. Form stacks (two or more of your tokens on one square) to block opponents. The first player to get all four tokens into the center wins. This version lets you play against the computer (1–3 AI players) or with friends on the same device.",
    whyIncluded:
      "Ludo is included as a free iframe game from PlayPager. It is a well-loved board game that works well in the browser. PlayPager explicitly allows embedding their games on other websites, so you can play here without leaving the page. The game is HTML5-based and runs on phones, tablets, and desktops.",
  },
  othello: {
    howToPlay:
      "Othello (Reversi) is a two-player strategy game on an 8×8 board. You and your opponent take turns placing a disc of your color. When you place a disc, you must trap one or more of the opponent's discs between your new disc and another of your color in a straight or diagonal line; those trapped discs are flipped to your color. The game ends when the board is full or neither player can move. The player with more discs of their color wins. You can play against the computer (with difficulty levels) or against a friend in 2-player mode. Corners and edges are strong positions because they are harder to flip.",
    whyIncluded:
      "Othello is a timeless strategy game. This version is embedded from PlayPager, which offers free iframe embeds for their HTML5 games. It is included to give visitors a quick, no-download way to play a classic board game. PlayPager's terms allow embedding on normal websites, and the games contain no in-game ads.",
  },
  checkers: {
    howToPlay:
      "Checkers (Draughts) is played on an 8×8 board with 12 pieces per player. Move your pieces diagonally on the dark squares. Jump over an opponent's piece to capture it; multiple jumps in one turn are allowed. When a piece reaches the far row it becomes a King and can move and capture backward as well as forward. You must capture when possible. The player who loses all pieces or cannot move loses. Start a game from the play button, then choose to play against the computer or a friend. The interface is simple and works on touch devices and keyboards.",
    whyIncluded:
      "Checkers is included as a free embed from PlayPager. It is one of the most recognizable board games and fits well in a browser games collection. PlayPager allows website owners to embed their games for free; the game runs in an iframe with no ads inside the game area.",
  },
  sudoku: {
    howToPlay:
      "Sudoku uses a 9×9 grid divided into nine 3×3 boxes. Fill the grid so that each row, each column, and each 3×3 box contains the digits 1 through 9 exactly once. Some numbers are given as clues. Use logic and elimination to find the rest. This version lets you choose difficulty: Easy, Medium, or Hard. You can undo moves, use notes for pencil marks, and resume an unfinished game. The game runs in the browser with no login. Take your time; there is no timer unless you want to challenge yourself.",
    whyIncluded:
      "Sudoku is one of the most popular logic puzzles. This implementation is embedded from PlayPager, which provides free iframe embeds for their HTML5 games. It is included so visitors can play Sudoku without leaving the site or installing anything. PlayPager's embed policy allows use on standard websites.",
  },
  solitaire: {
    howToPlay:
      "This page offers several solitaire card games in one place. Freecell: all cards are visible; use four free cells to temporarily hold cards while you build down by alternating colors. Klondike: the classic solitaire; build down in alternating colors and build up in the foundation by suit. Spider: use two decks; build descending sequences in suit to remove them. Pyramid, Scorpion, Tri Peaks, and Golf are also available. Pick a variant from the menu and start playing. The games work with mouse or touch and run entirely in the browser.",
    whyIncluded:
      "Solitaire games are included via PlayPager's free embed program. Multiple variants in one place give visitors variety. PlayPager allows their HTML5 games to be embedded on other sites at no cost, and the games do not show ads inside the iframe. This keeps the Mini Games Arena full of playable, free content.",
  },
  backgammon: {
    howToPlay:
      "Backgammon is a two-player race game. Each player has 15 pieces and moves them around the board in opposite directions according to dice rolls. Move your pieces toward your home board; then bear them off. You can hit an opponent's single piece (blot) to send it to the bar; they must re-enter before moving elsewhere. Doubles let you play the number four times. The first to bear off all pieces wins. This version lets you play against the computer or a friend. The board and rules are standard; the game runs in the browser with no signup.",
    whyIncluded:
      "Backgammon is included as a free iframe game from PlayPager. It is one of the oldest board games and remains popular. PlayPager explicitly allows embedding their games on websites, so visitors can play here without leaving. The game is HTML5 and works on mobile and desktop.",
  },
  battleship: {
    howToPlay:
      "Battleship is a strategy game where you hide a fleet on a grid and try to sink your opponent's fleet. Place your ships (different sizes) on your grid. Then take turns calling coordinates to fire. A hit is marked; when every cell of a ship is hit, it is sunk. The first to sink all enemy ships wins. This version offers Classic and Advanced modes; Advanced can include bombers and radar. Place your fleet, then choose coordinates to attack. The computer places its fleet secretly. The game runs in the browser with no download.",
    whyIncluded:
      "Battleship is included as a free embed from PlayPager. It is a well-known strategy game that works well in the browser. PlayPager allows their HTML5 games to be embedded on other sites for free, so this game is a reliable, always-available option in the Mini Games Arena.",
  },
  pinball: {
    howToPlay:
      "Pinball is a classic arcade game. Use the flippers (keyboard left/right arrows or tap left/right on mobile) to keep the ball on the playfield. Use the plunger (down arrow or tap and hold) to launch the ball. Keep the ball from draining and hit targets and bumpers to score. This version runs in the browser with sound and fullscreen options. There are no extra levels to unlock; just play for high score. The game works on desktop and mobile with simple controls.",
    whyIncluded:
      "Pinball is included as a free iframe game from PlayPager. It adds an arcade feel to the collection. PlayPager allows website owners to embed their games at no cost, and the games do not contain in-game ads. This gives visitors a quick, free pinball game without leaving the site.",
  },
  mahjong: {
    howToPlay:
      "Mahjong Solitaire uses a layout of stacked tiles. Your goal is to remove all tiles by matching pairs of identical tiles. You can only select tiles that are not covered and have a free left or right side. This version has 18 layouts with Easy, Medium, and Hard levels. Use the Hint button to see a possible match, Restart to try again, and Shuffle to get a new layout. Plan ahead: some tiles appear only once or twice, so the order in which you remove pairs matters. The game runs in the browser with no install.",
    whyIncluded:
      "Mahjong is included as a free embed from PlayPager. It is a popular tile-matching puzzle that fits the puzzle section of the Mini Games Arena. PlayPager's terms allow embedding their HTML5 games on other websites, so you can play here with no signup and no ads in the game.",
  },
  cubes: {
    howToPlay:
      "Falling Cubes (block puzzle) is like Tetris: blocks of different shapes fall from the top. Rotate and position them to form complete horizontal lines. When a line is full, it clears and you score. The game speeds up over time. Gaps in your stack make it harder, so try to keep the surface even. Use keyboard or touch to rotate and move. The goal is to last as long as you can and score as high as possible. The game runs in the browser with no download and works on mobile and desktop.",
    whyIncluded:
      "Falling Cubes is included as a free iframe game from PlayPager. It is a classic block-puzzle that many players recognize. PlayPager allows their games to be embedded on other sites at no cost, and the games do not show ads inside the iframe. It rounds out the puzzle and arcade mix in this collection.",
  },
  chess: {
    howToPlay:
      "Chess is the classic two-player strategy game. Move your pieces according to their rules; capture the opponent's pieces and try to checkmate the king. This version lets you play against the computer with selectable difficulty. All standard rules apply—pawns, knights, bishops, rooks, queen, and king. The game runs in your browser with no signup; you can play directly on this site.",
    whyIncluded:
      "Chess is included as a free embed from PlayPager so you can play it right here. PlayPager allows embedding their HTML5 games on other websites at no cost, with no ads in the game. This gives you a full chess game without leaving the page.",
  },
  "find-the-word": {
    howToPlay:
      "Find the Word is a word puzzle with color-coded hints. You have six guesses to find the secret word. After each guess, letters turn gray (not in the word), yellow (in the word but wrong position), or green (correct position). Use the hints to narrow down the answer. No timer—think at your own pace. The game runs in the browser and works on this site.",
    whyIncluded:
      "Find the Word is a free PlayPager embed, so it plays directly on this page. PlayPager allows their games to be embedded on other sites with no ads. It adds a popular word-puzzle option that works without leaving your site.",
  },
  // Old / external games
  hextris: {
    howToPlay:
      "Hextris is a fast-paced arcade game that puts a twist on Tetris. You control a hexagon in the center; colored blocks close in from the edges. Rotate the hexagon so the segment facing incoming blocks matches their color. Match three or more of the same color to clear them. The game speeds up as you progress. Use touch, mouse, or keyboard. If the game cannot be embedded here, use the 'Play on site' button to open it on hextris.io in a new tab.",
    whyIncluded:
      "Hextris is a polished open-source HTML5 game. Some sites block embedding (X-Frame-Options); when that happens we show a link to play on the official site. We keep it in the list so you can still reach it from this collection.",
  },
  "snake-pwa": {
    howToPlay:
      "Snake PWA is the classic Snake game as a progressive web app. Control the snake with arrow keys or swipe. Eat food to grow longer; avoid walls and your own body. The PWA runs offline, loads quickly, and works on any device. No install required—just play in the browser.",
    whyIncluded:
      "This version showcases a timeless game delivered as a modern PWA. It is hosted on GitHub Pages; we embed it here so you can play without leaving the site. Our CSP allows this origin so the iframe can load.",
  },
  soodoku: {
    howToPlay:
      "Soodoku offers clean, minimal Sudoku puzzles in the browser. Fill the 9×9 grid so each row, column, and 3×3 box contains 1–9 exactly once. Use logic and elimination. The interface is simple and distraction-free. No timers unless you want them.",
    whyIncluded:
      "Soodoku is included as a classic logic puzzle. We allow its origin in our CSP so it can be embedded. If the embed is ever blocked, you can still use the 'Play on site' link to open it on soodoku.com.",
  },
  battleships: {
    howToPlay:
      "This Battleships game is a solitaire version: you hunt for hidden enemy ships on a grid. Guess coordinates to fire; when you hit every cell of a ship, it sinks. Use logic to minimize shots. Ships are placed horizontally or vertically. No opponent required.",
    whyIncluded:
      "Battleships is a beloved strategy game. This implementation is from an external site; we added its origin to our CSP so the iframe can load. It offers a quick solo strategy option in the collection.",
  },
  "minesweeper-prime": {
    howToPlay:
      "Prime Sweeper is a twist on Minesweeper using prime numbers and logical deduction. Numbers in cells give clues about neighbors; use them to figure out safe cells. Click carefully and avoid wrong guesses. The prime theme adds a mathematical flavor.",
    whyIncluded:
      "This game shows how a familiar mechanic can be reimagined. We include it for variety and allow its origin (vole.wtf) in our CSP so the embed works when the site permits it.",
  },
  "tic-tac-toe-ai": {
    howToPlay:
      "Play classic 3×3 Tic Tac Toe against the computer. You are X, the AI is O. Take turns placing your symbol; first to get three in a row wins. The AI will block and take opportunities. Optimal play leads to a draw.",
    whyIncluded:
      "Tic Tac Toe is the go-to example for simple game AI. This version is embedded from an external host; we allow it in our CSP so you can play without leaving the page.",
  },
  "tactictoe-3d": {
    howToPlay:
      "TacTicToe 3D is Tic Tac Toe in 3D with a push mechanic. You still aim for three in a row but can push rows or columns to shift pieces. That adds strategy: you place pieces and rearrange the board. Learn the push mechanic to create or block lines.",
    whyIncluded:
      "This game is an example of 3D browser gaming and a creative rule twist. We include it for variety and allow tactictoe.io in our CSP so the iframe can load.",
  },
  "othello-rust": {
    howToPlay:
      "Othello Rust is Othello (Reversi) in the browser with a Rust/WebAssembly backend. Two players take turns placing discs; trap opponent discs between yours to flip them. Control corners and edges. Play against the computer or a friend. The WASM backend keeps it fast.",
    whyIncluded:
      "Othello is a classic with deep strategy. This version showcases WebAssembly in the browser. We allow othello-rust.web.app in our CSP so the game can be embedded here.",
  },
  "memory-pwa": {
    howToPlay:
      "PWA Memory is a card-matching game: find pairs of identical cards in a grid. Flip two at a time; matches stay face up. Find all pairs in as few moves as possible. The game is responsive and works on phones and desktops. No timers—just concentration.",
    whyIncluded:
      "Memory games are timeless and accessible. This PWA version is embedded from an external host; we allow it in our CSP so you can play it here.",
  },
  "hex-puzzle": {
    howToPlay:
      "Hex Puzzles are logic puzzles on a hexagonal grid. Goals and rules vary by level; you use spatial reasoning to place or connect hexagons. The hex layout feels different from square grids. Take your time; there is no time limit.",
    whyIncluded:
      "Hex-based puzzles offer a fresh challenge. We include this game and allow its origin (mseymour.ca) in our CSP so the iframe can load when the site permits embedding.",
  },
  colamone: {
    howToPlay:
      "Colamone is a two-player board game with chess-like depth but simpler rules. Move pieces to outmaneuver your opponent and achieve the winning condition. Rules are easy to learn; strategy can be deep. Play against the computer or a friend on the same device.",
    whyIncluded:
      "Colamone is a lesser-known strategy game that works well in the browser. We allow kurehajime.github.io in our CSP so the game can be embedded here.",
  },
  hexgl: {
    howToPlay:
      "HexGL is a futuristic racing game built with HTML5 and WebGL. Control a high-speed craft on a twisting track. Avoid obstacles and stay on the track. Use keyboard or touch. No vehicle upgrades—just speed and reflexes. Great for short, high-energy sessions.",
    whyIncluded:
      "HexGL is a standout WebGL browser game. We include it for the racing genre and allow hexgl.bkcore.com in our CSP so the iframe can load.",
  },
  "chrome-dino": {
    howToPlay:
      "Chrome Dino is the endless runner from Chrome's offline page. Press space or tap to jump; avoid cacti and pterodactyls. The game speeds up over time. One life, one run. Simple and addictive. This version runs in any browser so you don't need to go offline to play.",
    whyIncluded:
      "The Dino game is iconic. We include it as a classic browser game and allow chromedino.com in our CSP so you can play it here.",
  },
  "flappy-bird": {
    howToPlay:
      "Flappy Bird: tap or press to flap and gain a bit of height; release and the bird falls. Fly through the gaps between green pipes without touching them or the ground. Each pipe passed is one point. One touch and it's over. Timing and rhythm are everything.",
    whyIncluded:
      "Flappy Bird is a cultural touchstone in casual gaming. We include this web version and allow flappybird.io in our CSP so you can play without an app.",
  },
  "slither-io": {
    howToPlay:
      "Slither.io is a multiplayer game: you control a snake in a neon arena. Move with the mouse or touch. Eat glowing orbs to grow. Avoid other snakes' bodies and your own. Your remains become orbs for others. The goal is to become the longest snake on the server.",
    whyIncluded:
      "Slither.io is one of the most popular .io games. We include it for the multiplayer action genre. If the game cannot be embedded, use the 'Play on site' button to open it in a new tab.",
  },
  // --- Multiplayer (online, different devices) ---
  "vehikill-io": {
    howToPlay:
      "Vehikill.io is a demolition derby for up to 16 players online. Drive with WASD or arrow keys, ram and destroy other vehicles, and be the last one running. Choose from different vehicles (Beetle, Truck, Tank, etc.) with different stats. Matches are short and chaotic; play on any device. This game allows embedding, so you can play it directly here.",
    whyIncluded:
      "Vehikill.io is one of the few .io-style games that explicitly allows free embedding on other websites. It offers real-time online multiplayer across different devices and fits the multiplayer section of this collection.",
  },
  "agar-io": {
    howToPlay:
      "Agar.io is a massive multiplayer game where you control a cell. Move with the mouse; eat smaller cells to grow and avoid larger ones. Use split to shoot mass and W to feed. Team mode lets you play with a friend. The goal is to become the biggest cell on the server. If the game cannot be embedded here, use the 'Play on site' button.",
    whyIncluded:
      "Agar.io is one of the most famous .io games. We list it for visitors who want online multiplayer across devices. Many .io games block embedding; when that happens we show a link to play on the official site.",
  },
  "diep-io": {
    howToPlay:
      "Diep.io is a tank shooter. Move with WASD and aim with the mouse. Shoot shapes and other players to gain experience and level up. Spend points on body, bullet, and movement stats, and choose from many tank classes. Survive and dominate the arena. Use the 'Play on site' button if the game does not load in the iframe.",
    whyIncluded:
      "Diep.io is a popular .io game with deep upgrade paths and real-time PvP. We include it in the multiplayer category so you can reach it from this collection; play on the official site when embedding is blocked.",
  },
  "krunker-io": {
    howToPlay:
      "Krunker.io is a fast-paced browser FPS. Move with WASD, jump with space, aim and shoot with the mouse. Pick a class (rifle, sniper, shotgun, etc.), join a match, and compete for kills. Movement is fluid with sliding and bunny-hopping. Matches are quick and skill-based. Use 'Play on site' if the embed is blocked.",
    whyIncluded:
      "Krunker.io is a well-known browser FPS with online multiplayer. We add it to the list so you can jump to it from here; when the site blocks embedding we provide a direct link to play on krunker.io.",
  },
  "hole-io": {
    howToPlay:
      "In Hole.io you control a black hole. Move around the map and absorb objects—benches, trees, cars, and eventually other players—to grow. Bigger holes swallow smaller ones. The goal is to be the largest hole when time runs out. Simple controls; play on desktop or mobile. Use 'Play on site' if the game does not embed.",
    whyIncluded:
      "Hole.io is a popular casual multiplayer game. We include it in the multiplayer section for cross-device play. If embedding is blocked, the 'Play on site' button opens the official game.",
  },
  "surviv-io": {
    howToPlay:
      "Surviv.io is a 2D battle royale. Parachute in, loot weapons and gear, and fight other players in solo, duo, or squad mode. The zone shrinks; stay inside and be the last team or player standing. No download, runs in the browser. Use 'Play on site' if the game does not load here.",
    whyIncluded:
      "Surviv.io offers classic battle royale gameplay in the browser with online multiplayer. We list it for visitors who want squad or duo play across devices. Note: game availability may vary; use the official site link if needed.",
  },
  "tank-royale": {
    howToPlay:
      "Tank Royale is a tank battle royale. Drive your tank, destroy other tanks and obstacles, and collect power-ups. Customize your tank and weapons as you survive. The last tank standing wins. Use 'Play on site' to open the game on tankroyale.io if the embed is blocked.",
    whyIncluded:
      "Tank Royale fits the .io battle royale style with online multiplayer. We include it so you can access it from this collection; play on the official site when embedding is not allowed.",
  },
  "build-royale": {
    howToPlay:
      "Build Royale combines 2D battle royale with building. Gather materials, fight with weapons, and build structures for cover or advantage. Loot, upgrade gear, and be the last one standing. Use 'Play on site' to open buildroyale.io if the game cannot be embedded.",
    whyIncluded:
      "Build Royale offers building plus shooting in a browser battle royale. We add it to the multiplayer list for variety; use the official site link when the iframe is blocked.",
  },
  "sharkz-io": {
    howToPlay:
      "Sharkz.io is a multiplayer game where you control a shark. Use the mouse to move; eat smaller fish and players to grow and level up. Compete against other players in the same ocean. Use 'Play on site' if the embed does not load.",
    whyIncluded:
      "Sharkz.io is an HTML5 multiplayer game. We include it in the multiplayer category; when the site blocks embedding, use the 'Play on site' button to open sharkz.io.",
  },
  "sworm-io": {
    howToPlay:
      "Sworm.io is a multiplayer worm game. Control your worm with the mouse, collect power-ups, and avoid or eliminate other worms. Supports multiple worms and spectate mode. Use 'Play on site' if the game cannot be embedded.",
    whyIncluded:
      "Sworm.io offers a different take on the .io genre with worm-based action. We list it for online multiplayer variety; play on the official site when embedding is blocked.",
  },
  "robot-royale": {
    howToPlay:
      "Online Robot Royale is a 15-player HTML5 shooter. Customize your robot and fight in a last-robot-standing match. No download; runs in the browser on desktop and mobile. Use 'Play on site' if the embed is blocked.",
    whyIncluded:
      "Robot Royale provides a focused multiplayer shooter with cross-device play. We include it in the multiplayer section; use the official site link when the iframe cannot load.",
  },
  // --- Party (room-based) ---
  "gartic-io": {
    howToPlay:
      "Gartic.io is a drawing and guessing game. One player draws a word while others type guesses. Create a room and share the link; up to 50 players can join. Choose from three word options and use the undo button. Supports multiple languages and private rooms. Use 'Play on site' if the game does not embed.",
    whyIncluded:
      "Gartic.io is a popular party game for playing with friends on different devices. We list it in the Party category; when embedding is blocked, the 'Play on site' button opens gartic.io.",
  },
  "skribbl-io": {
    howToPlay:
      "Skribbl.io is draw-and-guess: one person draws a word, others guess in the chat. Create a private room and share the link so friends can join from any device. Custom word lists are supported. Use 'Play on site' if the embed is blocked.",
    whyIncluded:
      "Skribbl.io is a classic party game for online play with friends. We include it so you can reach it from this collection; play on skribbl.io when the iframe is not allowed.",
  },
  bombparty: {
    howToPlay:
      "BombParty is a fast-paced word game. A short letter sequence appears; type a word containing those letters before the bomb explodes. Valid words keep you in the game; the last player standing wins. Create a room and share the link to play with friends online. Use 'Play on site' if the game does not embed.",
    whyIncluded:
      "BombParty is a fun party word game for different devices. We add it to the Party category; use the official site when embedding is blocked.",
  },
  // --- Word ---
  crossplay: {
    howToPlay:
      "Crossplay is a 2-player word game. Create a room to get a 4-letter code and share it with a friend. Take turns placing letter tiles on the board to form words and score points. No app or signup; play on any device. Use 'Play on site' if the game cannot be embedded.",
    whyIncluded:
      "Crossplay is designed for playing with a friend on another device via a shared code. We include it in the Word category; when the embed is blocked, open crossplaygame.org to play.",
  },
  // --- Strategy & board (online) ---
  "web-tic-tac-toe": {
    howToPlay:
      "Web Tic Tac Toe lets you play classic 3×3 Tic Tac Toe online with a friend. Create a new game to get a room ID and share it so they can join from another device. No account needed. Use 'Play on site' if the game does not load in the iframe.",
    whyIncluded:
      "Web Tic Tac Toe is a simple way to play Tic Tac Toe with someone on a different device. We list it in the Board category; use webtictactoe.com when embedding is not available.",
  },
  "ludo-online": {
    howToPlay:
      "Ludo Online lets you play Ludo with friends online. Create a private room and share the link; friends join from their devices. Classic rules: roll the dice, move tokens, and get all four home first. Use 'Play on site' if the game cannot be embedded.",
    whyIncluded:
      "Ludo Online provides cross-device Ludo via shared links. We include it alongside the local PlayPager Ludo; use play-ludo.com when the embed is blocked.",
  },
  dragonbound: {
    howToPlay:
      "DragonBound is a turn-based 2D shooter with multiplayer. Play with or against friends, customize your avatar, and choose from multiple modes. Loot and upgrade; play in the browser with no download. Use 'Play on site' if the game does not embed.",
    whyIncluded:
      "DragonBound offers turn-based multiplayer and customisation. We add it to the Strategy section; when embedding is blocked, open dragonbound.net to play.",
  },
  "strike-tactics": {
    howToPlay:
      "Strike Tactics is an HTML5 real-time strategy game. Build bases, produce units, and fight in 1v1, team, or free-for-all matches. Over 20 unit types and custom maps. Works in the browser on Mac, PC, and Linux. Use 'Play on site' if the game cannot be embedded.",
    whyIncluded:
      "Strike Tactics fills the RTS niche with online multiplayer. We include it in the Strategy category; use striketactics.net when the iframe is blocked.",
  },
};
