import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  ShoppingCart,
  Building2,
  Coffee,
  Utensils,
  Pizza,
  Fuel,
  ShoppingBag,
  Plane,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Film,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Landmark,
  Armchair,
} from "lucide-react";


import airportsImg from "../assets/Industries/Airports.jpg";
import canteenImg from "../assets/Industries/canteen.jpg";
import govtImg from "../assets/Industries/govt.jpg";
import loungesImg from "../assets/Industries/Lounges.jpg";
import mallsImg from "../assets/Industries/Malls.jpg";
import stationsImg from "../assets/Industries/Stations.jpg";
import storesImg from "../assets/Industries/Stores.jpg";
import theatersImg from "../assets/Industries/Theaters.jpg";

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface IndustryCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  stats: string;
  delay: number;
}

function IndustryCard({
  icon: Icon,
  title,
  description,
  image,
  delay,
}: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-[#2EA7E0]" />
        </motion.div>


      </div>

      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">
          {description}
        </p>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-[#2EA7E0] rounded-2xl md:rounded-3xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#2EA7E0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#2EA7E0]" />
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

export function Industries() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const retailIndustries = [
    {
      icon: Store,
      title: "Kirana Stores & Supermarkets",
      description:
        "Empower neighborhood stores and supermarkets with fast billing, barcode scanning, inventory tracking, and real-time stock updates.",
      image:
        storesImg,
    },
    {
      icon: Plane,
      title: "Airports",
      description:
        "Handle high-volume airport retail with multi-currency support, duty-free billing, and real-time inventory sync across terminals.",
      image: airportsImg,

    },
    {
      icon: Fuel,
      title: "Fuel Stations",
      description:
        "Streamline fuel sales, convenience store billing, and fleet management with integrated POS solutions.",
      image: stationsImg,

    },
    {
      icon: Film,
      title: "Cinema Theaters",
      description:
        "Manage ticket sales, concession stands, and loyalty programs with seamless POS integration for entertainment venues.",
      image: theatersImg,

    },
    {
      icon: ShoppingBag,
      title: "Malls",
      description:
        "Power large-scale mall operations with centralized billing, tenant management, multi-store coordination, and comprehensive sales analytics.",
      image: mallsImg,

    },
    {
      icon: Landmark,
      title: "Government",
      description:
        "Support government canteens, offices, and public facilities with secure billing, transparent transactions, and compliance-ready reporting systems.",
      image: govtImg,

    },
    {
      icon: Armchair,
      title: "Lounges",
      description:
        "Enhance premium lounge experiences with quick service billing, membership management, and sophisticated payment processing for VIP areas.",
      image: loungesImg,

    },
    {
      icon: Utensils,
      title: "Canteen",
      description:
        "Streamline corporate and institutional canteen operations with fast meal billing, employee ID integration, subsidy management, and cashless payments.",
      image: canteenImg,
    },
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 100);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-white">
      {/* RETAIL SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2
              className="uppercase mb-4 text-gray-900 tracking-normal text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(42px, 6vw, 72px)",
                lineHeight: "1",
              }}
            >
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powering retail businesses with smart billing and
              inventory management.
            </p>
          </motion.div>

          {/* Scrollable Industry Cards Container */}
          <div className="relative">
            {/* Left Scroll Button */}

            {/* Right Scroll Button */}


            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollButtons}
              className="flex gap-6 overflow-x-scroll overflow-y-hidden scrollbar-hide px-12 py-4 snap-x snap-mandatory"

              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {retailIndustries.map((industry, i) => (
                <IndustryCard
                  key={i}
                  {...industry}
                  delay={0.1 * i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Don't See Your Industry */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto mt-16 px-4"
      >
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2EA7E0] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4 relative z-10">
            Don't See Your Industry?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 relative z-10 max-w-2xl mx-auto px-4 sm:px-0">
            We customize solutions for businesses of all
            types. Let's discuss how we can help transform
            your operations.
          </p>

          <motion.a
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-[#2EA7E0] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 relative z-10 text-sm sm:text-base"
          >
            Talk to Our Team
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}