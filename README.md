# Facciamo i conti! (Let's Do the Math)

A playful arithmetic game for kids. Each round shows one problem, the child types the answer, and the game celebrates every right answer. It's built to make drilling the four operations feel like a game, not homework.

## How it plays

1. The child types their name, and the game cheers them on by name ("Bravo Marco! Continua così! 🌟").
2. Pick an operation: addition, subtraction, multiplication or division.
3. Solve the problem and press Enter.
   - **Right:** a success sound, a random cheer ("Sei un genio! 🧠"), confetti and flying 💩 emojis. You get +1 point.
   - **Wrong:** a silly buzz and a shake, and you can try again.
4. Get **10 right in a row** to earn a +10 bonus and a big celebration. A 🔥 counter shows how close you are.

## Difficulty levels

You can change these in the settings at any time:

| Level     | Addition & subtraction | Multiplication & division |
|-----------|------------------------|---------------------------|
| Easy      | numbers up to 10       | up to 5 × 5               |
| Medium    | up to 100              | up to 12 × 12             |
| Hard      | up to 1,000            | up to 20 × 20             |
| Very hard | up to 10,000           | up to 50 × 50             |

Subtraction never goes below zero, and division always comes out to a whole number, so young players never run into negatives or remainders.

## Language

The game is in Italian. Settings has an Italian/English switch, but English text isn't wired up yet.

## Tech stack

- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Lucide](https://lucide.dev/) icons
- Web Audio API for the sounds (no audio files)

## Run it locally

```bash
git clone https://github.com/sgelob/lets-do-the-math.git
cd lets-do-the-math
npm install
npm run dev
```

Then open http://localhost:5173.

| Script            | What it does                      |
|-------------------|-----------------------------------|
| `npm run dev`     | Dev server with hot reload        |
| `npm run build`   | Production build into `dist/`     |
| `npm run preview` | Serve the production build locally |

## Origin

The original UI was designed in [Magic Patterns](https://www.magicpatterns.com/c/i2cfpuk2cjaxwbjivy7red).
