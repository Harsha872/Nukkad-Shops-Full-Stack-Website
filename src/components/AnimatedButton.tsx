import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function AnimatedButton({ children, variant = 'primary', onClick }: AnimatedButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      className="relative group w-full sm:w-[320px] h-[60px] box-border"
    >
      {/* Background layers */}
      <motion.div
        className={`
          relative px-8 py-4 rounded-full text-base font-semibold
          ${isPrimary
            ? 'bg-[#2EA7E0]'
            : 'bg-white border-2 border-[#2EA7E0]'
          }
          overflow-hidden shadow-lg w-full sm:min-w-[220px]
        `}
      >
        {/* Animated gradient overlay */}
        <motion.div
          variants={{
            initial: { x: '-100%', opacity: 0 },
            hover: { x: '100%', opacity: 1 }
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r from-transparent ${isPrimary ? 'via-white/20' : 'via-[#2EA7E0]/20'} to-transparent`}
        />

        {/* Glow effect */}
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 1, scale: 1.2 }
          }}
          transition={{ duration: 0.3 }}
          className={`
            absolute inset-0 blur-xl -z-10 bg-[#2EA7E0]/50
          `}
        />

        {/* Button content */}
        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: 4 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`relative flex items-center justify-center gap-2 ${isPrimary ? 'text-white' : 'text-[#2EA7E0]'}`}
        >
          {children}
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
      </motion.div>

      {/* Particle effects on hover */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0 },
          hover: { opacity: 1, scale: 1 }
        }}
        className="absolute -inset-2 -z-10"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 2],
              x: [0, (i % 2 ? 1 : -1) * 30],
              y: [0, (i % 3 ? 1 : -1) * 30],
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className={`
              absolute w-2 h-2 rounded-full
              ${isPrimary ? 'bg-[#2EA7E0]/60' : 'bg-[#2EA7E0]'}
              top-1/2 left-1/2
            `}
            style={{
              rotate: (360 / 6) * i
            }}
          />
        ))}
      </motion.div>
    </motion.button>
  );
}