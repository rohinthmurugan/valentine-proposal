import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProposalCardProps {
    onYes: () => void;
}

const NO_TEXTS = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't do this!",
    "I'll be sad 🥺",
    "Give me a chance!",
];

export const ProposalCard = ({ onYes }: ProposalCardProps) => {
    const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
    const [noClickCount, setNoClickCount] = useState(0);

    const handleNoHoverOrClick = () => {
        // Generate random position relative to viewport, but keep it somewhat accessible (padding)
        const padding = 100;
        const maxX = window.innerWidth - padding * 2;
        const maxY = window.innerHeight - padding * 2;

        // Ensure we don't end up offscreen
        const x = Math.random() * maxX - maxX / 2;
        const y = Math.random() * maxY - maxY / 2;

        setNoButtonPos({ x, y });
        setNoClickCount(prev => prev + 1);
    };

    const currentNoText = NO_TEXTS[Math.min(noClickCount, NO_TEXTS.length - 1)];
    const scale = 1 + (noClickCount * 0.1); // Slightly grow Yes button as you click No (optional fun interaction)

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 w-full max-w-md p-8 text-center"
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-md leading-tight">
                    Will You Be My Valentine? 💕
                </h1>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center relative min-h-[100px]">
                <motion.button
                    whileHover={{ scale: 1.1 * scale }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale }}
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-xl shadow-lg hover:shadow-xl transition-colors flex items-center gap-2"
                    onClick={onYes}
                >
                    <Heart className="fill-current" size={24} />
                    Yes!
                </motion.button>

                <motion.button
                    animate={noButtonPos ? { x: noButtonPos.x, y: noButtonPos.y, position: "fixed" } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={handleNoHoverOrClick}
                    onClick={handleNoHoverOrClick}
                    className="px-8 py-4 bg-gray-100 text-gray-800 font-bold rounded-full text-xl shadow-lg transition-colors whitespace-nowrap z-50"
                    style={{ position: noButtonPos ? 'fixed' : 'relative' }}
                >
                    {currentNoText}
                </motion.button>
            </div>
        </motion.div>
    );
};
