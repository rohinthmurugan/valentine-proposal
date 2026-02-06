import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FloatingHearts = () => {
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.5,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 0.4, 0],
                        x: [0, (Math.random() - 0.5) * 50, 0] // Sway
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    style={{
                        left: `${heart.left}%`,
                        position: 'absolute',
                    }}
                >
                    <Heart
                        className="text-white fill-white"
                        size={30 * heart.scale}
                        strokeWidth={0}
                    />
                </motion.div>
            ))}
        </div>
    );
};
