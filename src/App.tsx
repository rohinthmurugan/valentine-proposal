import { useState, useCallback } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { ProposalCard } from './components/ProposalCard';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isYesClicked, setIsYesClicked] = useState(false);

  const handleYesClick = useCallback(() => {
    setIsYesClicked(true);
    // Trigger confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!isYesClicked ? (
          <ProposalCard key="proposal" onYes={handleYesClick} />
        ) : (
          <motion.div
            key="celebration"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 text-center p-8 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40"
          >
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md"
            >
              Yay! I Love You!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl text-white font-medium drop-shadow-sm"
            >
              You made me the happiest! 💍
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
