export type Language = 'it' | 'en';
export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'veryhard';

const it = {
  pageTitle: 'Facciamo i conti',
  title: 'Facciamo i conti! 🧮',
  welcomeTitle: 'Ciao! Come ti chiami?',
  welcomeSubtitle: 'Dimmi il tuo nome per iniziare a giocare! 🎮',
  namePlaceholder: 'Il tuo nome...',
  start: 'INIZIA! 🚀',
  settings: 'Impostazioni',
  difficulty: 'Difficoltà',
  levels: ['Facile', 'Medio', 'Difficile', 'Estremo'],
  // max is the largest number used for this operation and level (see getRanges)
  levelHint: (op: Operation, diff: Difficulty, max: number) => {
    const n = max.toLocaleString('it-IT');
    if (op === 'multiply') return `Tabelline fino al ${n}`;
    if (op === 'divide') return `Dividi per numeri fino a ${n}`;
    const size = { easy: 'Numeri piccoli', medium: 'Numeri medi', hard: 'Numeri grandi', veryhard: 'Numeri enormi' }[diff];
    return `${size} (1-${n})`;
  },
  language: 'Lingua',
  close: 'Chiudi',
  operations: {
    add: 'Addizioni',
    subtract: 'Sottrazioni',
    multiply: 'Moltiplicazioni',
    divide: 'Divisioni'
  },
  streak: 'Serie',
  bonus: 'BONUS! 🎉',
  bonusSubtitle: '10 di fila!',
  tryAgain: 'Riprova! 💪',
  check: 'CONTROLLA',
  next: 'NUOVA',
  skip: 'Cambia',
  success: ['Evviva! 🎉', 'Perfetto! 🌟', 'Fantastico! 🚀', 'Eccellente! ⭐', 'Sei un genio! 🧠', 'Incredibile! 💪', 'Magnifico! 🎊', 'Straordinario! ✨', 'Grandioso! 🎯', 'Fenomenale! 🌈'],
  // Worded so no adjective or noun changes with the child's gender
  encouragement: (name: string) => [`Evviva ${name}! Continua così! 🌟`, `Grande ${name}! Sei una forza! 🚀`, `Super ${name}! Vai così! 💪`, `Forza ${name}! Stai andando alla grande! ⭐`, `Ottimo lavoro ${name}! Non fermarti! 🎉`, `Sei una potenza, ${name}! Continua! 🔥`, `Complimenti ${name}! Che bravura! ✨`, `Wow ${name}! Che talento! 🌈`]
};

export type Strings = typeof it;

const en: Strings = {
  pageTitle: "Let's Do the Math",
  title: "Let's do the math! 🧮",
  welcomeTitle: "Hi! What's your name?",
  welcomeSubtitle: 'Tell me your name to start playing! 🎮',
  namePlaceholder: 'Your name...',
  start: 'START! 🚀',
  settings: 'Settings',
  difficulty: 'Difficulty',
  levels: ['Easy', 'Medium', 'Hard', 'Extreme'],
  levelHint: (op: Operation, diff: Difficulty, max: number) => {
    const n = max.toLocaleString('en-GB');
    if (op === 'multiply') return `Times tables up to ${n}`;
    if (op === 'divide') return `Divide by numbers up to ${n}`;
    const size = { easy: 'Small numbers', medium: 'Medium numbers', hard: 'Big numbers', veryhard: 'Huge numbers' }[diff];
    return `${size} (1-${n})`;
  },
  language: 'Language',
  close: 'Close',
  operations: {
    add: 'Addition',
    subtract: 'Subtraction',
    multiply: 'Multiplication',
    divide: 'Division'
  },
  streak: 'Streak',
  bonus: 'BONUS! 🎉',
  bonusSubtitle: '10 in a row!',
  tryAgain: 'Try again! 💪',
  check: 'CHECK',
  next: 'NEXT',
  skip: 'Skip',
  success: ['Brilliant! 🎉', 'Perfect! 🌟', 'Fantastic! 🚀', 'Excellent! ⭐', "You're a genius! 🧠", 'Incredible! 💪', 'Magnificent! 🎊', 'Extraordinary! ✨', 'Awesome! 🎯', 'Phenomenal! 🌈'],
  encouragement: (name: string) => [`Well done, ${name}! Keep it up! 🌟`, `Great job, ${name}! You're a champion! 🚀`, `Fantastic, ${name}! Keep going! 💪`, `Awesome, ${name}! You're doing great! ⭐`, `Nice work, ${name}! Don't stop now! 🎉`, `You're on fire, ${name}! Keep going! 🔥`, `Congrats, ${name}! You're brilliant! ✨`, `Wow, ${name}! What a talent! 🌈`]
};

export const strings: Record<Language, Strings> = { it, en };

const STORAGE_KEY = 'ldtm-language';

export function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'it' || saved === 'en') return saved;
  } catch {
    // storage unavailable: fall back to the default
  }
  return 'it';
}

export function saveLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // storage unavailable: the choice just won't persist
  }
}
