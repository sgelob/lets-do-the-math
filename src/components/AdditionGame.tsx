import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, Star, Sparkles, Plus, Minus, X, Divide, Settings, X as CloseIcon, Globe } from 'lucide-react';
type GameStatus = 'idle' | 'correct' | 'incorrect';
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
type Difficulty = 'easy' | 'medium' | 'hard' | 'veryhard';
type Language = 'it' | 'en';
export function AdditionGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(0);
  const [operation, setOperation] = useState<Operation>('add');
  const [streak, setStreak] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [language, setLanguage] = useState<Language>('it');
  // Player name and game start
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  // Sound effects
  const playCorrectSound = () => {
    try {
      // Basketball buzzer/success sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      // Create a rising buzzer sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };
  const playWrongSound = () => {
    try {
      // Fart sound using Web Audio API (comedic low frequency)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      // Create a descending "fart" sound
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };
  // Random encouraging messages with player name
  const getEncouragementMessages = (name: string) => [`Bravo ${name}! Continua così! 🌟`, `Grande ${name}! Sei un campione! 🚀`, `Fantastico ${name}! Vai così! 💪`, `Bravissimo ${name}! Stai andando alla grande! ⭐`, `Ottimo lavoro ${name}! Non fermarti! 🎉`, `Sei fortissimo ${name}! Continua! 🔥`, `Complimenti ${name}! Sei bravissimo! ✨`, `Wow ${name}! Che talento! 🌈`];
  const [encouragement, setEncouragement] = useState('');
  // Update encouragement when name changes
  useEffect(() => {
    if (playerName) {
      const messages = getEncouragementMessages(playerName);
      setEncouragement(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [playerName]);
  // Random success messages
  const successMessages = ['Bravissimo! 🎉', 'Perfetto! 🌟', 'Fantastico! 🚀', 'Eccellente! ⭐', 'Sei un genio! 🧠', 'Incredibile! 💪', 'Magnifico! 🎊', 'Straordinario! ✨', 'Grandioso! 🎯', 'Fenomenale! 🌈'];
  const [successMessage, setSuccessMessage] = useState(successMessages[0]);
  // Update success message when status becomes correct
  useEffect(() => {
    if (status === 'correct') {
      const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
      setSuccessMessage(randomMessage);
    }
  }, [status]);
  // Get ranges based on difficulty and operation
  const getRanges = (op: Operation, diff: Difficulty) => {
    switch (op) {
      case 'add':
      case 'subtract':
        if (diff === 'easy') return 10;
        if (diff === 'medium') return 100;
        if (diff === 'hard') return 1000;
        return 10000;
      // veryhard
      case 'multiply':
      case 'divide':
        if (diff === 'easy') return 5;
        if (diff === 'medium') return 12;
        if (diff === 'hard') return 20;
        return 50;
      // veryhard
      default:
        return 100;
    }
  };
  // Generate numbers based on selected operation and difficulty
  const generateProblem = (selectedOp: Operation = operation, selectedDiff: Difficulty = difficulty) => {
    let n1 = 0;
    let n2 = 0;
    const range = getRanges(selectedOp, selectedDiff);
    switch (selectedOp) {
      case 'add':
        n1 = Math.floor(Math.random() * range) + 1;
        n2 = Math.floor(Math.random() * range) + 1;
        break;
      case 'subtract':
        n1 = Math.floor(Math.random() * range) + 1;
        n2 = Math.floor(Math.random() * n1) + 1; // Ensure n2 <= n1 for positive result
        break;
      case 'multiply':
        n1 = Math.floor(Math.random() * range) + 1;
        n2 = Math.floor(Math.random() * range) + 1;
        break;
      case 'divide':
        // Generate result first to ensure clean division
        const result = Math.floor(Math.random() * range) + 1;
        n2 = Math.floor(Math.random() * range) + 1;
        n1 = result * n2;
        break;
    }
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setStatus('idle');
  };
  // Handle operation change
  const changeOperation = (op: Operation) => {
    setOperation(op);
    generateProblem(op, difficulty);
  };
  // Handle difficulty change
  const changeDifficulty = (diff: Difficulty) => {
    setDifficulty(diff);
    generateProblem(operation, diff);
  };
  // Initial generation
  useEffect(() => {
    if (gameStarted) {
      generateProblem();
    }
  }, [gameStarted]);
  // Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Space key: generate new problem (only when not typing in input)
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        generateProblem();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [operation, difficulty]);
  const checkAnswer = () => {
    let correct = 0;
    const input = parseInt(userAnswer);
    if (isNaN(input)) return;
    switch (operation) {
      case 'add':
        correct = num1 + num2;
        break;
      case 'subtract':
        correct = num1 - num2;
        break;
      case 'multiply':
        correct = num1 * num2;
        break;
      case 'divide':
        correct = num1 / num2;
        break;
    }
    if (input === correct) {
      setStatus('correct');
      playCorrectSound(); // Play success sound
      const newStreak = streak + 1;
      setStreak(newStreak);
      // Check for 10 in a row bonus
      if (newStreak === 10) {
        setScore(s => s + 10); // Bonus +10 points
        setShowBonus(true);
        setStreak(0); // Reset streak
        setTimeout(() => setShowBonus(false), 3000);
      } else {
        setScore(s => s + 1);
      }
    } else {
      setStatus('incorrect');
      playWrongSound(); // Play fart sound
      setStreak(0); // Reset streak on wrong answer
      setShake(s => s + 1); // Trigger shake animation
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (status === 'correct') {
        generateProblem();
      } else {
        checkAnswer();
      }
    }
  };
  const getOperatorSymbol = () => {
    switch (operation) {
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      case 'multiply':
        return '×';
      case 'divide':
        return '÷';
    }
  };
  // Generate random particles for fireworks
  const particles = Array.from({
    length: 30
  }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 800,
    color: ['#FF5757', '#5454FF', '#7DFF82', '#FFDE59', '#FF99C8'][Math.floor(Math.random() * 5)],
    scale: Math.random() * 1.5 + 0.5,
    rotation: Math.random() * 360
  }));
  // Generate flying cards (poop)
  const flyingCards = Array.from({
    length: 12
  }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1200,
    y: (Math.random() - 0.5) * 1200,
    rotation: Math.random() * 720 - 360,
    delay: Math.random() * 0.2
  }));
  // Generate bonus poop (10 in a row)
  const bonusPoop = Array.from({
    length: 10
  }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 1000,
    rotation: Math.random() * 720 - 360,
    delay: i * 0.1
  }));
  const handleStartGame = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setGameStarted(true);
    }
  };
  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartGame();
    }
  };
  // Show welcome screen if game hasn't started
  if (!gameStarted) {
    return <div className="min-h-screen w-full bg-[#F5F1E8] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Pokemon Background Decorations */}
        <div className="absolute top-10 left-10 opacity-10 pointer-events-none select-none">
          <span className="text-6xl filter drop-shadow-lg">⚡</span>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none select-none">
          <span className="text-8xl filter drop-shadow-lg">🔴</span>
        </div>
        <div className="absolute top-20 right-20 opacity-8 pointer-events-none select-none">
          <span className="text-7xl filter drop-shadow-lg">🔥</span>
        </div>
        <div className="absolute bottom-32 left-20 opacity-8 pointer-events-none select-none">
          <span className="text-7xl filter drop-shadow-lg">💧</span>
        </div>

        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="w-full max-w-2xl z-10">
          <div className="bg-white border-[6px] border-black rounded-[3rem] p-12 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
            <motion.div initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="text-7xl mb-8">
              👋
            </motion.div>

            <motion.h1 initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="text-4xl md:text-5xl font-black text-black mb-4 text-center">
              Ciao! Come ti chiami?
            </motion.h1>

            <motion.p initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4
          }} className="text-xl text-black/60 font-bold mb-12 text-center">
              Dimmi il tuo nome per iniziare a giocare! 🎮
            </motion.p>

            <motion.input initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.5
          }} type="text" value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={handleNameKeyDown} placeholder="Il tuo nome..." className="w-full max-w-md h-20 text-center text-3xl font-bold border-[5px] border-black rounded-2xl focus:outline-none focus:ring-8 focus:ring-yellow-300 transition-all bg-gray-50 text-black mb-8 px-6" autoFocus />

            <motion.button initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.6
          }} onClick={handleStartGame} disabled={!nameInput.trim()} className="bg-[#5454FF] hover:bg-[#4242FF] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-3xl font-black py-6 px-16 rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
              INIZIA! 🚀
            </motion.button>
          </div>
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen w-full bg-[#F5F1E8] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Pokemon Background Decorations */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none select-none">
        <span className="text-6xl filter drop-shadow-lg">⚡</span>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none select-none">
        <span className="text-8xl filter drop-shadow-lg">🔴</span>
      </div>
      <div className="absolute top-20 right-20 opacity-8 pointer-events-none select-none">
        <span className="text-7xl filter drop-shadow-lg">🔥</span>
      </div>
      <div className="absolute bottom-32 left-20 opacity-8 pointer-events-none select-none">
        <span className="text-7xl filter drop-shadow-lg">💧</span>
      </div>
      <div className="absolute top-1/2 left-10 opacity-5 pointer-events-none select-none transform -translate-y-1/2">
        <span className="text-9xl filter drop-shadow-lg">🌿</span>
      </div>
      <div className="absolute top-1/3 right-10 opacity-5 pointer-events-none select-none">
        <span className="text-8xl filter drop-shadow-lg">⭐</span>
      </div>

      {/* Settings Button */}
      <button onClick={() => setShowSettings(true)} className="absolute top-6 left-6 bg-white hover:bg-gray-50 text-black p-3 rounded-2xl border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all z-20" aria-label="Impostazioni">
        <Settings size={32} strokeWidth={3} />
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowSettings(false)} className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />
            <motion.div initial={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }} animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }} exit={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }} className="fixed z-50 bg-white border-[6px] border-black rounded-[2rem] p-8 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-black">
                  Impostazioni ⚙️
                </h2>
                <button onClick={() => setShowSettings(false)} className="bg-red-100 hover:bg-red-200 p-2 rounded-xl border-[3px] border-black transition-colors">
                  <CloseIcon size={24} strokeWidth={3} />
                </button>
              </div>

              {/* Difficulty Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="fill-yellow-400 text-black" size={24} />
                  Difficoltà
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-xs font-bold text-gray-500 px-2">
                    <span>Facile</span>
                    <span>Medio</span>
                    <span>Difficile</span>
                    <span>Estremo</span>
                  </div>
                  <input type="range" min="0" max="3" step="1" value={difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : difficulty === 'hard' ? 2 : 3} onChange={e => {
                const val = parseInt(e.target.value);
                const newDiff = val === 0 ? 'easy' : val === 1 ? 'medium' : val === 2 ? 'hard' : 'veryhard';
                changeDifficulty(newDiff);
              }} className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer border-[3px] border-black accent-[#5454FF]" />
                  <div className="text-center font-bold text-lg mt-2 text-[#5454FF]">
                    {difficulty === 'easy' && 'Numeri piccoli (1-10)'}
                    {difficulty === 'medium' && 'Numeri medi (1-100)'}
                    {difficulty === 'hard' && 'Numeri grandi (1-1000)'}
                    {difficulty === 'veryhard' && 'Numeri enormi (1-10000)'}
                  </div>
                </div>
              </div>

              {/* Language Section */}
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="text-black" size={24} />
                  Lingua
                </h3>
                <div className="flex gap-4">
                  <button onClick={() => setLanguage('it')} className={`flex-1 py-3 px-4 rounded-xl border-[3px] border-black font-bold text-lg transition-all flex items-center justify-center gap-2
                      ${language === 'it' ? 'bg-[#7DFF82] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[2px]' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                    `}>
                    🇮🇹 Italiano
                  </button>
                  <button onClick={() => setLanguage('en')} className={`flex-1 py-3 px-4 rounded-xl border-[3px] border-black font-bold text-lg transition-all flex items-center justify-center gap-2
                      ${language === 'en' ? 'bg-[#7DFF82] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[2px]' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                    `}>
                    🇬🇧 English
                  </button>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Celebration Effects */}
      <AnimatePresence>
        {status === 'correct' && <>
            {/* Fireworks Particles */}
            {particles.map(p => <motion.div key={`particle-${p.id}`} initial={{
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1
        }} animate={{
          x: p.x,
          y: p.y,
          scale: p.scale,
          opacity: 0,
          rotate: p.rotation
        }} transition={{
          duration: 1.5,
          ease: 'easeOut'
        }} className="absolute z-50 pointer-events-none" style={{
          left: '50%',
          top: '50%'
        }}>
                <div className="w-4 h-4 rounded-full shadow-sm" style={{
            backgroundColor: p.color
          }} />
              </motion.div>)}

            {/* Flying Poop */}
            {flyingCards.map(card => <motion.div key={`card-${card.id}`} initial={{
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
          rotate: 0
        }} animate={{
          x: card.x,
          y: card.y,
          scale: 1,
          opacity: 0,
          rotate: card.rotation
        }} transition={{
          duration: 2,
          ease: 'easeOut',
          delay: card.delay
        }} className="absolute z-40 pointer-events-none text-5xl" style={{
          left: '50%',
          top: '50%'
        }}>
                💩
              </motion.div>)}
          </>}
      </AnimatePresence>

      {/* Bonus Animation - 10 in a row */}
      <AnimatePresence>
        {showBonus && <>
            {/* Bonus Poop Flying */}
            {bonusPoop.map(poop => <motion.div key={`bonus-${poop.id}`} initial={{
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
          rotate: 0
        }} animate={{
          x: poop.x,
          y: poop.y,
          scale: 1.5,
          opacity: 0,
          rotate: poop.rotation
        }} transition={{
          duration: 2.5,
          ease: 'easeOut',
          delay: poop.delay
        }} className="absolute z-50 pointer-events-none text-7xl" style={{
          left: '50%',
          top: '50%'
        }}>
                💩
              </motion.div>)}

            {/* +10 Bonus Text */}
            <motion.div initial={{
          scale: 0,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0,
          opacity: 0
        }} transition={{
          duration: 0.5,
          ease: 'backOut'
        }} className="absolute z-50 pointer-events-none" style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
              <div className="bg-[#FFDE59] border-[6px] border-black rounded-3xl px-12 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-8xl font-black text-black mb-2">+10</div>
                <div className="text-3xl font-black text-black">BONUS! 🎉</div>
                <div className="text-xl font-bold text-black/70">
                  10 di fila!
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Score Counter */}
      <div className="absolute top-6 right-6 bg-white border-4 border-black rounded-2xl px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transform -rotate-2 z-20">
        <span className="text-6xl">💩</span>
        <span className="text-3xl font-black text-black">{score}</span>
      </div>

      {/* Streak Counter */}
      {streak > 0 && <motion.div initial={{
      scale: 0,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} className="absolute top-24 right-6 bg-[#FFDE59] border-3 border-black rounded-xl px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20">
          <div className="text-sm font-bold text-black/60">Serie</div>
          <div className="text-2xl font-black text-black">{streak}/10 🔥</div>
        </motion.div>}

      <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} className="w-full max-w-3xl z-10">
        <div className="bg-white border-[6px] border-black rounded-[3rem] p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col items-center">
          {/* Title */}
          <h1 className="text-center text-3xl md:text-4xl font-black text-black mb-8 uppercase tracking-wider transform -rotate-1">
            Facciamo i conti! 🧮
          </h1>

          {/* Operation Selector */}
          <div className="flex justify-center gap-2 md:gap-4 mb-10 w-full">
            {[{
            id: 'add',
            icon: Plus,
            label: 'Addizioni'
          }, {
            id: 'subtract',
            icon: Minus,
            label: 'Sottrazioni'
          }, {
            id: 'multiply',
            icon: X,
            label: 'Moltiplicazioni'
          }, {
            id: 'divide',
            icon: Divide,
            label: 'Divisioni'
          }].map(op => <button key={op.id} onClick={() => changeOperation(op.id as Operation)} className={`
                  flex items-center gap-2 px-3 md:px-4 py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg transition-all
                  ${operation === op.id ? 'bg-[#7DFF82] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-50 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                `}>
                <op.icon size={24} strokeWidth={3} />
                <span className="hidden md:inline">{op.label}</span>
              </button>)}
          </div>

          {/* The Math Problem */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 w-full">
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <motion.div key={`n1-${num1}`} initial={{
              y: -20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} className="text-6xl md:text-8xl font-black text-[#5454FF]">
                {num1}
              </motion.div>
              <div className="text-5xl md:text-7xl font-black text-black">
                {getOperatorSymbol()}
              </div>
              <motion.div key={`n2-${num2}`} initial={{
              y: -20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.1
            }} className="text-6xl md:text-8xl font-black text-[#FF5757]">
                {num2}
              </motion.div>
              <div className="text-5xl md:text-7xl font-black text-black">
                =
              </div>
            </div>

            {/* Input Area */}
            <motion.div animate={shake ? {
            x: [-10, 10, -10, 10, 0]
          } : {}} transition={{
            duration: 0.4
          }} className="relative mt-4 lg:mt-0">
              <input type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} onKeyDown={handleKeyDown} placeholder="?" className={`w-48 md:w-64 h-32 md:h-40 text-center text-6xl md:text-8xl font-black border-[5px] border-black rounded-3xl focus:outline-none focus:ring-8 focus:ring-yellow-300 transition-all
                  ${status === 'correct' ? 'bg-[#7DFF82] text-black border-black' : 'bg-gray-50 text-black'}
                  ${status === 'incorrect' ? 'bg-[#FFBDBD]' : ''}
                `} readOnly={status === 'correct'} autoFocus />

              {/* Success Checkmark Overlay */}
              <AnimatePresence>
                {status === 'correct' && <motion.div initial={{
                scale: 0,
                rotate: -180
              }} animate={{
                scale: 1,
                rotate: 0
              }} exit={{
                scale: 0
              }} className="absolute -top-6 -right-6 bg-[#7DFF82] border-4 border-black rounded-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
                    <Check size={40} className="text-black stroke-[4]" />
                  </motion.div>}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Feedback Message */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'correct' && <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} exit={{
              y: -20,
              opacity: 0
            }} className="text-4xl md:text-5xl font-black text-[#00C808] flex items-center gap-3">
                  <span>{successMessage}</span>
                </motion.div>}
              {status === 'incorrect' && <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} exit={{
              y: -20,
              opacity: 0
            }} className="text-3xl md:text-4xl font-black text-[#FF5757]">
                  Riprova! 💪
                </motion.div>}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
            {status !== 'correct' ? <button onClick={checkAnswer} className="bg-[#5454FF] hover:bg-[#4242FF] text-white text-2xl md:text-3xl font-black py-6 px-12 rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
                <Check size={32} strokeWidth={4} />
                CONTROLLA
              </button> : <button onClick={() => generateProblem()} className="bg-[#7DFF82] hover:bg-[#6BE670] text-black text-2xl md:text-3xl font-black py-6 px-12 rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 animate-pulse">
                <RefreshCw size={32} strokeWidth={4} />
                NUOVA
              </button>}

            {status !== 'correct' && <button onClick={() => generateProblem()} className="bg-white hover:bg-gray-100 text-black text-xl md:text-2xl font-bold py-6 px-8 rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                <RefreshCw size={24} strokeWidth={3} />
                Cambia
              </button>}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-black/60 font-bold text-lg">
        {encouragement}
      </div>
    </div>;
}