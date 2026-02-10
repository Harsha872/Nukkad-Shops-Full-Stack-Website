import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Store, Users, TrendingUp, Receipt, MapPin, Award, Sparkles, ArrowRight } from 'lucide-react';

interface MetricCardProps {
  icon: typeof Store;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  delay?: number;
  startFrom?: number;
}

function AnimatedCounter({ value, suffix = '', prefix = '', startFrom = 0 }: { value: number; suffix?: string; prefix?: string; startFrom?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(startFrom);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Intl.NumberFormat('en-IN').format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix, prefix]);

  return <span ref={ref}>{prefix}{Intl.NumberFormat('en-IN').format(startFrom)}{suffix}</span>;
}

function MetricCard({ icon: Icon, value, suffix, prefix, label, description, delay = 0, startFrom = 0 }: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.div
        whileHover={{
          y: -10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white/90 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-8 overflow-hidden"
      >
        <div className="relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2EA7E0] to-cyan-400 rounded-2xl mb-6 shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Value */}
          <div className="mb-3">
            <div className="text-4xl md:text-5xl bg-gradient-to-r from-slate-800 via-[#2EA7E0] to-cyan-600 bg-clip-text text-transparent">
              <AnimatedCounter value={value} suffix={suffix} prefix={prefix} startFrom={startFrom} />
            </div>
          </div>

          {/* Label */}
          <h3 className="text-lg mb-2 text-slate-900">
            {label}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const metrics = [
  {
    icon: Store,
    value: 12000,
    suffix: '+',
    label: 'Active Retailers',
    description: 'Kirana stores and supermarkets trust us daily',
    startFrom: 9000,
  },
  {
    icon: Receipt,
    value: 2400000,
    suffix: '+',
    label: 'Transactions',
    description: 'Processed successfully every month',
    startFrom: 2000000,
  },
  {
    icon: Users,
    value: 100,
    suffix: '+',
    label: 'Smart Minds',
    description: 'Dedicated team members driving innovation',
    startFrom: 90,
  },
];

export function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#3DB2FF]/30 to-cyan-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-300/30 to-[#3DB2FF]/30 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
          </motion.div>

          <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
            }}>
            Trusted by Thousands
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
              delay={0.1 * index}
              startFrom={metric.startFrom}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        {/* Removed "Join These Successful Retailers" button */}
      </div>
    </section>
  );
}