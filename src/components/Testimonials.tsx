import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { useState } from 'react';

import saiKumarImg from "../assets/Testinomails/saiKumar.jpg";
import priyaImg from "../assets/Testinomails/priya.png";
import rameshImg from "../assets/Testinomails/Ramesh.jpg";
import anitaImg from "../assets/Testinomails/anita.png";
import snehaImg from "../assets/Testinomails/sneha.jpg";
import amitImg from "../assets/Testinomails/amit.jpg";

const testimonials = [
  {
    id: 1,
    name: 'Sai Kumar',
    role: 'Owner',
    company: 'Supermarket',
    image: saiKumarImg,
    rating: 5,
    text: 'Best software, easy to handle, can be done by any one with minimal knowledge. In case of any issue back up team will resolve in minutes, i personal recommend this for all type of business.'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Head Of Operations',
    company: 'Fashion Zone',
    image: priyaImg,
    rating: 5,
    text: 'Nice software easy to use and proper generation of sales reports very useful for business.'
  },
  {
    id: 3,
    name: 'Ramesh',
    role: 'Manager',
    company: 'Woxsen University Campus Store',
    image: rameshImg,
    rating: 5,
    text: "Use Nukkadshops every day & even during long queues, the system works very quickly. I haven’t faced any issues with the software so far. I especially like the Quick Items feature - it helps me add our most-selling items easily. I highly recommend it!"
  },
  {
    id: 4,
    name: 'Anita',
    role: 'Co-founder',
    company: 'Cake Cafe',
    image: anitaImg,
    rating: 5,
    text: 'Approached Nukkadshops for my bakery, and the team was incredibly quick - from demo to full setup. The system is so easy to use that my staff started billing within minutes.'
  },
  {
    id: 5,
    name: 'Sneha Rao',
    role: 'Owner',
    company: 'Café Bloom Hyderabad',
    image: snehaImg,
    rating: 5,
    text: 'The POS system’s intuitive interface and reliable support team have made daily billing and inventory management effortless.'
  },
  {
    id: 6,
    name: 'Amit Verma',
    role: 'Store Manager',
    company: 'Metro Fashion Pvt. Ltd.',
    image: amitImg,
    rating: 5,
    text: 'From onboarding to training, the team ensured a smooth transition. Our staff adapted quickly thanks to the user-friendly design.'
  }
];

// Duplicate testimonials for seamless infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#3DB2FF]/30 to-cyan-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.4, 0.3],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-300/30 to-[#3DB2FF]/30 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(42px, 6vw, 72px)",
                fontWeight: 400,
              }}
            >
              Trusted by Industry Leaders and Loved by Clients
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              See what our customers have to say about their experience
            </motion.p>
          </motion.div>
        </div>

        {/* Horizontal scrolling testimonials */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyan-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              duration: isPaused ? 0 : 60,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex gap-6 pl-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: (index % testimonials.length) * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative flex-shrink-0 w-[340px]"
              >

                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#3DB2FF]/20 hover:border-[#3DB2FF]/40 h-full flex flex-col overflow-hidden">

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-slate-700 text-sm mb-4 flex-grow leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Customer info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#3DB2FF]/20 group-hover:ring-[#3DB2FF] transition-all duration-300"
                        animate={{
                          ringColor: hoveredCard === index ? '#3DB2FF' : 'rgba(61, 178, 255, 0.2)',
                        }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                        animate={{
                          scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: hoveredCard === index ? Infinity : 0,
                        }}
                      />
                    </motion.div>
                    <div>
                      <div className="text-sm text-slate-900 group-hover:text-[#3DB2FF] transition-colors duration-300">{testimonial.name}</div>
                      <div className="text-xs text-slate-600">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}