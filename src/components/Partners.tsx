import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Handshake, Award, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';

// Import partner logos
import peeSafeLogo from '../assets/peesafe.png';
import paymentLogo from '../assets/swiggy.png';
import govLogo from '../assets/delhi.png';
import bharatPetroleumLogo from '../assets/bharath.png';
import beCafeLogo from '../assets/beCafe.png';
import waislLogo from '../assets/waisl.png';
import ampmLogo from '../assets/ampm.png';
import chickenVickenLogo from '../assets/chickenvicken.png';
import ninjacartLogo from '../assets/ninja.png';
import swiggyLogo from '../assets/swiggy.png';
import manCompanyLogo from '../assets/man.png';
import rajasthanGovLogo from '../assets/rajsthan.png';
import hydAirportLogo from '../assets/hyderabad.png';
import newGoaAirportLogo from '../assets/newgoa.png';
import delhiAirportLogo from '../assets/delhi.png';

const partners = [
  { logo: peeSafeLogo, name: 'Pee Safe' },
  { logo: paymentLogo, name: 'Payment Partner' },
  { logo: govLogo, name: 'Government Partner' },
  { logo: bharatPetroleumLogo, name: 'Bharat Petroleum' },
  { logo: beCafeLogo, name: 'BeCafe' },
  { logo: waislLogo, name: 'Waisl' },
  { logo: ampmLogo, name: 'ampm' },
  { logo: chickenVickenLogo, name: 'Chicken Vicken' },
  { logo: ninjacartLogo, name: 'Ninjacart' },
  { logo: swiggyLogo, name: 'Swiggy' },
  { logo: manCompanyLogo, name: 'The Man Company' },
  { logo: rajasthanGovLogo, name: 'Government of Rajasthan' },
  { logo: hydAirportLogo, name: 'Hyderabad International Airport' },
  { logo: newGoaAirportLogo, name: 'New Goa International Airport' },
  { logo: delhiAirportLogo, name: 'Delhi International Airport' },
];

const benefits = [
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    description: 'Collaborate with industry leaders for cutting-edge technology',
  },
  {
    icon: Award,
    title: 'Certified Solutions',
    description: 'Maintain industry certifications and compliance standards',
  },
  {
    icon: TrendingUp,
    title: 'Growth Together',
    description: 'Build powerful ecosystem for mutual success',
  },
  {
    icon: Users,
    title: 'Customer Success',
    description: 'Deliver exceptional value to every retailer',
  },
];

function InfiniteScroll() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />
      {/* Scrolling container */}
      <motion.div
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isPaused ? 0 : 40,
            ease: "linear",
          },
        }}
        className="flex gap-16 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Duplicate partners array for seamless loop */}
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex-shrink-0 w-48 h-32 bg-white rounded-2xl shadow-md hover:shadow-xl flex items-center justify-center p-6 border border-[#3DB2FF]/20 cursor-pointer group relative overflow-hidden"
          >
            {/* Hover gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#3DB2FF]/10 to-cyan-300/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description, delay }: {
  icon: typeof Handshake;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-white/90 backdrop-blur-lg border-2 border-[#3DB2FF]/20 rounded-2xl p-8 h-full group cursor-pointer overflow-hidden"
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#3DB2FF]/5 to-cyan-300/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2] }}
            transition={{ duration: 0.6 }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-5 h-5 text-[#3DB2FF]" />
          </motion.div>
        )}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3DB2FF] to-cyan-400 rounded-xl mb-4 shadow-lg"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="relative text-xl mb-3 text-slate-800 group-hover:text-[#3DB2FF] transition-colors duration-300">
          {title}
        </h3>
        <p className="relative text-slate-600 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Partners() {
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
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#3DB2FF]/30 to-cyan-300/30 rounded-full blur-3xl"
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
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-300/30 to-[#3DB2FF]/30 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
          </motion.div>
          <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
            }}
          >
            Proud to be the choice of leading businesses
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Collaborating with industry leaders to deliver exceptional technology
          </motion.p>
        </motion.div>

        {/* Infinite Scrolling Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <InfiniteScroll />
        </motion.div>

        {/* Partnership CTA - Removed */}
      </div>
    </section>
  );
}