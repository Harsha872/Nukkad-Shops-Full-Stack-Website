import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Phone, Download, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { DeviceCarousel } from './DeviceCarousel';

function AnimatedNumber({
  value,
  suffix = '',
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      const millions = (num / 1000000).toFixed(1).replace('.0', '');
      return millions + 'M';
    }
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div ref={nodeRef}>
      {formatNumber(displayValue)}
      {suffix}
    </div>
  );
}

// Presentational hero. Parent (HomePage) controls the brochure popup and
// passes `onOpenBrochure` so we don't manage that state here or recurse.
export function Hero({ onOpenBrochure }: { onOpenBrochure: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Reduced parallax effect for stability
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50"
    >
      {/* Animated background orbs - Responsive sizes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-[#3DB2FF]/30 to-cyan-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-300/30 to-[#3DB2FF]/30 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 bg-[#3DB2FF] rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left content - Responsive text and layout */}
          <div
            className="lg:pl-12 xl:pl-24 space-y-4 sm:space-y-6 w-full max-w-xl mx-auto text-center lg:mx-0 lg:text-left relative"
          >
            {/* Trust Badge - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer bg-white/80 backdrop-blur-sm border-2 border-[#2EA7E0]/30 shadow-lg hover:shadow-xl hover:border-[#2EA7E0] transition-all duration-300 relative overflow-hidden group w-fit mx-auto lg:mx-0"
            >
              {/* Subtle shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2EA7E0]/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="relative z-10"
              >
                <Sparkles
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  style={{ color: '#2EA7E0' }}
                />
              </motion.div>
              <span
                className="relative z-10 text-xs sm:text-sm"
                style={{ color: '#1e293b' }}
              >
                Trusted by 10,000+ retailers
              </span>
            </motion.div>

            {/* Main Heading - Fully Responsive Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] mx-auto"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
            >
              <span
                className="block uppercase tracking-normal relative"
                style={{ color: '#3DB2FF' }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  SMART,
                </motion.span>{' '}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  SIMPLE,
                </motion.span>{' '}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  SCALABLE
                </motion.span>
              </span>
              <span
                className="block text-black uppercase tracking-normal relative text-center mx-auto"
                style={{ color: '#000000' }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  POS
                </motion.span>{' '}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  FOR
                </motion.span>{' '}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  MODERN
                </motion.span>{' '}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  RETAIL
                </motion.span>
              </span>
            </motion.h1>

            {/* Description - Responsive text size */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg max-w-[360px] mx-auto lg:max-w-xl lg:mx-0"
            >
              Empowering kirana stores, supermarkets, multi-counter retail
              outlets with one integrated Android POS system
            </motion.p>

            {/* Buttons - Responsive layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full"
            >
              <AnimatedButton
                variant="primary"
                onClick={() => {
                  const section = document.getElementById('demo');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Call for Demo
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </AnimatedButton>
              <AnimatedButton variant="secondary" onClick={onOpenBrochure}>
                Download Brochure
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </AnimatedButton>
            </motion.div>

            {/* Number Metrics - Responsive grid and text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 px-2 sm:px-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    type: 'spring',
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl mb-1 font-bold"
                  style={{ color: '#3DB2FF' }}
                >
                  <AnimatedNumber value={12000} suffix="+" />
                </motion.div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Retailers
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    type: 'spring',
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl mb-1 font-bold"
                  style={{ color: '#3DB2FF' }}
                >
                  <AnimatedNumber value={1000000} suffix="+" />
                </motion.div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Transactions
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                    type: 'spring',
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl mb-1 font-bold"
                  style={{ color: '#3DB2FF' }}
                >
                  <AnimatedNumber value={100} suffix="+" />
                </motion.div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Smart Minds
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right content - Animated POS Device Carousel - Responsive */}
          <motion.div
            style={{ y }}
            className="relative pt-8 lg:pt-0 pb-12 sm:pb-20"
          >
            <DeviceCarousel />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
