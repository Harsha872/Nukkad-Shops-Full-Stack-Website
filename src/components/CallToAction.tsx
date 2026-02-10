import { motion, useInView } from 'motion/react';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="call-to-action" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-cyan-50/40" />

      {/* Single animated orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#2EA7E0]/20 to-cyan-400/20 rounded-full blur-3xl"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto relative z-10 max-w-4xl"
      >
        {/* Main Card */}
        <div className="relative">
          {/* Animated border glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-0.5 bg-gradient-to-r from-[#2EA7E0] via-cyan-400 to-[#2EA7E0] rounded-2xl blur-lg"
          />

          <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center">
                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-slate-900">Ready to </span>
                  <span className="bg-gradient-to-r from-[#2EA7E0] to-cyan-500 bg-clip-text text-transparent">
                    Transform
                  </span>
                  <span className="text-slate-900"> Your Store?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-slate-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto"
                >
                  Join <span className="font-semibold text-[#2EA7E0]">12,000+</span> retailers across India growing with Nukkad Shops
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8"
                >
                  {/* Primary CTA */}
                  <motion.a
                    href="tel:+917997095678"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#2EA7E0] to-cyan-500 text-white rounded-full shadow-lg shadow-[#2EA7E0]/30 overflow-hidden text-center font-semibold text-sm sm:text-base transition-all duration-300"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />

                    <span className="relative flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Call Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </motion.a>

                  {/* Secondary CTA */}
                  <motion.a
                    href="mailto:sales@nukkadshops.com"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#2EA7E0] border-2 border-[#2EA7E0] rounded-full shadow-md hover:bg-[#2EA7E0] hover:text-white transition-all duration-300 text-center font-semibold text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Email Us</span>
                    </span>
                  </motion.a>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="pt-6 border-t border-slate-200/50 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Easy Growth For Your Store</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Made in India 🇮🇳</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
