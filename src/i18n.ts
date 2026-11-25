export type Language = 'it' | 'en';

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
  levelHints: {
    easy: 'Numeri piccoli (1-10)',
    medium: 'Numeri medi (1-100)',
    hard: 'Numeri grandi (1-1000)',
    veryhard: 'Numeri enormi (1-10000)'
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
  success: ['Bravissimo! 🎉', 'Perfetto! 🌟', 'Fantastico! 🚀', 'Eccellente! ⭐', 'Sei un genio! 🧠', 'Incredibile! 💪', 'Magnifico! 🎊', 'Straordinario! ✨', 'Grandioso! 🎯', 'Fenomenale! 🌈'],
  encouragement: (name: string) => [`Bravo ${name}! Continua così! 🌟`, `Grande ${name}! Sei un campione! 🚀`, `Fantastico ${name}! Vai così! 💪`, `Bravissimo ${name}! Stai andando alla grande! ⭐`, `Ottimo lavoro ${name}! Non fermarti! 🎉`, `Sei fortissimo ${name}! Continua! 🔥`, `Complimenti ${name}! Sei bravissimo! ✨`, `Wow ${name}! Che talento! 🌈`]
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
  levelHints: {
    easy: 'Small numbers (1-10)',
    medium: 'Medium numbers (1-100)',
    hard: 'Big numbers (1-1000)',
    veryhard: 'Huge numbers (1-10000)'
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
