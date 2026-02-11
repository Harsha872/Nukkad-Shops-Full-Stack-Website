import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import billingImg from "@/assets/Features/Billing.png";
import inventoryImg from "@/assets/Features/inventory.png";
import loyaltyImg from "@/assets/Features/Loyalty.png";
import offersImg from "@/assets/Features/offers.png";
import {
  CreditCard,
  Tag,
  Heart,
  PackageSearch,
  CheckCircle2,
} from "lucide-react";

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  image: string;
}

const features = [
  {
    icon: CreditCard,
    title: "Billing Payments",
    image: billingImg,
  },
  {
    icon: Tag,
    title: "Offers & Promotions",
    image: offersImg,
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    image: loyaltyImg,
  },
  {
    icon: PackageSearch,
    title: "Inventory Management",
    image: inventoryImg,
  },
];

function FeatureItem({ icon: Icon, title, image }: FeatureItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#2EA7E0] flex-shrink-0 w-[280px] sm:w-[320px] flex flex-col gap-3 sm:gap-4"
    >
      {/* Feature Image - Above the content - Responsive */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#2EA7E0]/20"
      >
        <img
          src={image}
          loading="lazy"
          alt={title}
          className="w-full h-32 sm:h-40 object-cover"
        />
        {/* Overlay gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#2EA7E0]/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Icon and Title - Below the image - Responsive */}
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2EA7E0] to-cyan-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>

        <h3 className="text-lg sm:text-xl text-gray-900 group-hover:text-[#2EA7E0] transition-colors">
          {title}
        </h3>
      </div>

      {/* Border animation */}
      <motion.div
        className="absolute inset-0 border-2 border-[#2EA7E0] rounded-xl sm:rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function InfiniteScroll() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <motion.div
        animate={{
          x: [0, -1620],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isPaused ? 0 : 35,
            ease: "linear",
          },
        }}
        className="flex gap-5 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Duplicate features array for seamless loop */}
        {[...features, ...features, ...features, ...features].map(
          (feature, index) => (
            <FeatureItem
              key={index}
              {...feature}
            />
          )
        )}
      </motion.div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
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
            Key Features of the Devices
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive features designed to streamline your retail operations and boost productivity.
          </p>
        </motion.div>

        {/* Infinite Scrolling Features */}
        <InfiniteScroll />
      </div>
    </section>
  );
}
