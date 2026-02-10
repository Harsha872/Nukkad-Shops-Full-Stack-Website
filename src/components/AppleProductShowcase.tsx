import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Monitor,
  Cpu,
  HardDrive,
  Zap,
  Wifi,
  Battery,
  Smartphone,
  Usb
} from "lucide-react";

// Import device images
import aspireDevice from "../assets/aspire_1.png";
import eliteDevice from "../assets/elitedevice.png";
import pro2Device from "../assets/sunmiDevice.png";

// Configuration icons mapping
const configIcons: Record<string, any> = {
  Display: Monitor,
  RAM: Cpu,
  Storage: HardDrive,
  Processor: Zap,
  Connectivity: Wifi,
  Battery: Battery,
  OS: Smartphone,
  Ports: Usb,
};

// Device data with configurations
const devicesData = {
  aspire: {
    name: "Aspire",
    tagline: "Perfect Entry-Level POS",
    description: "Designed for small kiranas, pharmacies, and local shops that need reliable billing with essential features at an affordable price.",
    image: aspireDevice,
    configurations: [
      { label: "Display", value: "10.1 inches", icon: "Display" },
      { label: "RAM", value: "2GB", icon: "RAM" },
      { label: "Storage", value: "16GB", icon: "Storage" },
      { label: "Processor", value: "Quad-core 1.8GHz", icon: "Processor" },
      { label: "Connectivity", value: "WiFi, Bluetooth", icon: "Connectivity" },
      { label: "Battery", value: "5000mAh", icon: "Battery" },
      { label: "OS", value: "Android 11", icon: "OS" },
      { label: "Ports", value: "USB, Ethernet", icon: "Ports" }
    ]
  },
  elite: {
    name: "Elite-A",
    tagline: "Enterprise Excellence",
    description: "The ultimate POS solution with AI-powered features, enterprise-grade security, and unlimited scalability for growing businesses.",
    image: eliteDevice,
    configurations: [
      { label: "Display", value: "15.6 inches", icon: "Display" },
      { label: "RAM", value: "8GB", icon: "RAM" },
      { label: "Storage", value: "128GB", icon: "Storage" },
      { label: "Processor", value: "Octa-core 2.4GHz", icon: "Processor" },
      { label: "Connectivity", value: "WiFi 6, Bluetooth 5.0, 5G", icon: "Connectivity" },
      { label: "Battery", value: "10000mAh", icon: "Battery" },
      { label: "OS", value: "Android 13", icon: "OS" },
      { label: "Ports", value: "USB-C, Ethernet, HDMI, Serial", icon: "Ports" }
    ]
  },
  pro2: {
    name: "Pro2",
    tagline: "Professional POS Solution",
    description: "Built for supermarkets, restaurants, and multi-location businesses that need advanced features, faster performance, and seamless multi-store management.",
    image: pro2Device,
    configurations: [
      { label: "Display", value: "15.6 inches", icon: "Display" },
      { label: "RAM", value: "4GB", icon: "RAM" },
      { label: "Storage", value: "64GB", icon: "Storage" },
      { label: "Processor", value: "Octa-core 2.0GHz", icon: "Processor" },
      { label: "Connectivity", value: "WiFi, Bluetooth, 4G", icon: "Connectivity" },
      { label: "Battery", value: "7000mAh", icon: "Battery" },
      { label: "OS", value: "Android 12", icon: "OS" },
      { label: "Ports", value: "USB, Ethernet, HDMI", icon: "Ports" }
    ]
  }
};

type DeviceType = keyof typeof devicesData;

export function AppleProductShowcase() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleViewDetails = (device: DeviceType) => {
    setSelectedDevice(selectedDevice === device ? null : device);
  };

  return (
    <section className="relative min-h-screen py-12 sm:py-16 px-4 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-5 sm:right-10 lg:right-20 w-[200px] sm:w-[300px] lg:w-[600px] h-[200px] sm:h-[300px] lg:h-[600px] bg-gradient-to-br from-[#2EA7E0]/20 to-cyan-300/20 rounded-full blur-3xl will-change-transform"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-5 sm:left-10 lg:left-20 w-[200px] sm:w-[300px] lg:w-[600px] h-[200px] sm:h-[300px] lg:h-[600px] bg-gradient-to-br from-cyan-300/20 to-[#2EA7E0]/20 rounded-full blur-3xl will-change-transform"
      />

      <div ref={containerRef} className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-16"
        >
          <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
            }}
          >
            Choose Your Perfect POS
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Premium devices designed for modern retail excellence
          </p>
        </motion.div>

        {/* Device Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 items-start">
          {(Object.keys(devicesData) as DeviceType[]).map((deviceKey, index) => {
            const deviceData = devicesData[deviceKey];
            const isExpanded = selectedDevice === deviceKey;

            return (
              <motion.div
                key={deviceKey}
                id={deviceKey} // Add ID for scroll navigation
                initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                style={{ perspective: "1000px" }}
                className="group w-full"
              >
                <motion.div
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-[#2EA7E0] transition-all duration-500 overflow-hidden flex flex-col h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/5 via-transparent to-cyan-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#2EA7E0] rounded-full"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: "100%",
                          opacity: 0
                        }}
                        animate={{
                          y: "-100%",
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Device Image Section */}
                  <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                    {/* Animated gradient waves */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(46, 167, 224, 0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(46, 167, 224, 0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 20% 50%, rgba(46, 167, 224, 0.3) 0%, transparent 50%)",
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/20 to-cyan-400/20 blur-2xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotateY: 8,
                        rotateZ: 2,
                        transition: { duration: 0.4, type: "spring" }
                      }}
                      className="relative z-10"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <motion.img
                        src={deviceData.image}
                        alt={deviceData.name}
                        className="w-full h-auto"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      {deviceData.name}
                    </motion.h3>
                    <motion.p
                      className="text-[#2EA7E0] font-semibold mb-3 text-sm sm:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {deviceData.tagline}
                    </motion.p>
                    <motion.p
                      className="text-slate-600 text-xs sm:text-sm mb-6 flex-1 line-clamp-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.6 }}
                    >
                      {deviceData.description}
                    </motion.p>

                    {/* View Details Button */}
                    <motion.button
                      onClick={() => navigate(`/device/${deviceKey}`)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative px-5 sm:px-6 py-2.5 sm:py-3 bg-[#2EA7E0] text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-[#2EA7E0]/50 transition-all duration-300 overflow-hidden group/btn"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </motion.button>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#2EA7E0] opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}