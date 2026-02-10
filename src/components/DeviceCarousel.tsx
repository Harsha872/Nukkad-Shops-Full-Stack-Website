import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - image imports are handled by the bundler
import device1 from '../assets/sunmiDevice.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - image imports are handled by the bundler
import device2 from '../assets/dino_elite.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - image imports are handled by the bundler
import device3 from '../assets/aspire_1.png';

const devices = [
  {
    id: 1,
    name: 'Nukkad Pro Terminal',
    image: device1,
    feature: '⚡ Lightning Fast',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'Nukkad Dino Elite',
    image: device2,
    feature: '🔒 Secure Payments',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: 'Nukkad Aspire Terminal',
    image: device3,
    feature: '📊 Smart Analytics',
    color: 'from-blue-500 to-cyan-500'
  }
];

export function DeviceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % devices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDevice = devices[currentIndex];

  return (
    <div className="relative h-full w-full">
      {/* Animated rings - Hidden to prevent visual artifacts during transitions */}
      {/* Removed rotating circular borders that appeared as lines during device transitions */}

      {/* Device carousel - Responsive */}
      <div className="relative w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDevice.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
          >
            {/* Glow effect - REMOVED */}

            {/* POS Device Image - Responsive */}
            <div className="relative z-10 px-4 sm:px-0">
              <img
                src={currentDevice.image}
                alt={currentDevice.name}
                className="w-full h-auto drop-shadow-2xl"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel indicators - REMOVED */}

      {/* Progress bar - REMOVED */}
    </div>
  );
}