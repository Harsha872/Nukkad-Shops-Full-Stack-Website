import { motion } from 'motion/react';
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Cpu, HardDrive, Wifi, Battery, Smartphone, Zap, Usb } from 'lucide-react';
import logoImage from '../assets/logo_1.png';

// Import device images
import aspireDevice from "../assets/aspire_1.png";
import eliteDevice from "../assets/elitedevice.png";
import pro2Device from "../assets/sunmiDevice.png";

// Configuration feature images
const displayImage = "https://images.unsplash.com/photo-1636614597280-3dde89cbd6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkaXNwbGF5JTIwc2NyZWVuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjYzOTc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const processorImage = "https://images.unsplash.com/photo-1562136935-2c010ce547b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvciUyMGNoaXAlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc2NjM5NzQ4OXww&ixlib=rb-4.1.0&q=80&w=1080";
const ramImage = "https://images.unsplash.com/photo-1601046885687-b7bdf1306274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSQU0lMjBtZW1vcnklMjBjaGlwJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjYzOTc0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const storageImage = "https://images.unsplash.com/photo-1756836857570-127b0408b676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwaGFyZCUyMGRyaXZlJTIwU1NEfGVufDF8fHx8MTc2NjM5NzQ5MHww&ixlib=rb-4.1.0&q=80&w=1080";
const connectivityImage = "https://images.unsplash.com/photo-1750712263185-edde9f359e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWZpJTIwY29ubmVjdGl2aXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjYzOTc0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const batteryImage = "https://images.unsplash.com/photo-1521372557841-004496c23b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0ZXJ5JTIwcG93ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NjM5NzQ5MHww&ixlib=rb-4.1.0&q=80&w=1080";

interface DeviceConfig {
  label: string;
  value: string;
  description: string;
  image: string;
}

interface DeviceData {
  name: string;
  tagline: string;
  description: string;
  image: string;
  configurations: DeviceConfig[];
}

const devicesData: Record<string, DeviceData> = {
  aspire: {
    name: "Aspire",
    tagline: "Perfect Entry-Level POS",
    description: "Designed for small kiranas, pharmacies, and local shops that need reliable billing with essential features at an affordable price.",
    image: aspireDevice,
    configurations: [
      {
        label: "Display",
        value: "10.1\" Thin Bezel Screen",
        description: "HD Display with Touch Support",
        image: displayImage
      },
      {
        label: "Processor",
        value: "Quad-core 1.8GHz",
        description: "Fast & Efficient Processing",
        image: processorImage
      },
      {
        label: "RAM",
        value: "2GB DDR4",
        description: "Smooth Multitasking",
        image: ramImage
      },
      {
        label: "Storage",
        value: "16GB eMMC",
        description: "Expandable Storage",
        image: storageImage
      },
      {
        label: "Connectivity",
        value: "WiFi + Bluetooth",
        description: "Seamless Connectivity",
        image: connectivityImage
      },
      {
        label: "Battery",
        value: "5000mAh Li-ion",
        description: "All-day Power Backup",
        image: batteryImage
      },
    ]
  },
  elite: {
    name: "Elite-A",
    tagline: "Enterprise Excellence",
    description: "The ultimate POS solution with AI-powered features, enterprise-grade security, and unlimited scalability for growing businesses.",
    image: eliteDevice,
    configurations: [
      {
        label: "Display",
        value: "15.6\" FHD Screen",
        description: "Crystal Clear Full HD Display",
        image: displayImage
      },
      {
        label: "Processor",
        value: "Octa-core 2.4GHz",
        description: "Premium Performance Chipset",
        image: processorImage
      },
      {
        label: "RAM",
        value: "8GB DDR4",
        description: "Superior Multitasking Power",
        image: ramImage
      },
      {
        label: "Storage",
        value: "128GB NVMe SSD",
        description: "Ultra-Fast Storage",
        image: storageImage
      },
      {
        label: "Connectivity",
        value: "WiFi 6 + BT 5.0 + 5G",
        description: "Advanced Connectivity Suite",
        image: connectivityImage
      },
      {
        label: "Battery",
        value: "10000mAh Li-Po",
        description: "Extended Power Capacity",
        image: batteryImage
      },
    ]
  },
  pro2: {
    name: "Pro2",
    tagline: "Professional POS Solution",
    description: "Built for supermarkets, restaurants, and multi-location businesses that need advanced features, faster performance, and seamless multi-store management.",
    image: pro2Device,
    configurations: [
      {
        label: "Display",
        value: "15.6\" HD+ Screen",
        description: "High Definition Touch Display",
        image: displayImage
      },
      {
        label: "Processor",
        value: "Octa-core 2.0GHz",
        description: "Professional Performance",
        image: processorImage
      },
      {
        label: "RAM",
        value: "4GB DDR4",
        description: "Efficient Multitasking",
        image: ramImage
      },
      {
        label: "Storage",
        value: "64GB SSD",
        description: "Fast & Reliable Storage",
        image: storageImage
      },
      {
        label: "Connectivity",
        value: "WiFi + Bluetooth + 4G",
        description: "Comprehensive Connectivity",
        image: connectivityImage
      },
      {
        label: "Battery",
        value: "7000mAh Li-ion",
        description: "Long-lasting Performance",
        image: batteryImage
      },
    ]
  }
};

export function DeviceDetails() {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState(deviceId || 'aspire');

  const currentDevice = devicesData[selectedDevice];

  if (!currentDevice) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Device Not Found</h1>
          <Link to="/" className="text-[#2EA7E0] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const deviceButtons = [
    { id: 'aspire', name: 'Aspire', color: '#2EA7E0' },
    { id: 'pro2', name: 'Pro2', color: '#2EA7E0' },
    { id: 'elite', name: 'Elite-A', color: '#2EA7E0' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Sticky Navigation - Responsive */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logoImage}
                alt="Nukkad Shops Logo"
                className="h-8 sm:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2EA7E0] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#2596c9] transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section - Responsive */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(42px, 6vw, 72px)",
                fontWeight: 400,
              }}
            >
              Device Configurations</h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 px-4">
              Explore the complete specifications and features
            </p>
          </motion.div>

          {/* Device Selection Buttons - Responsive */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
            {deviceButtons.map((device, index) => (
              <motion.button
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 200 }}
                onClick={() => setSelectedDevice(device.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 overflow-hidden ${selectedDevice === device.id
                  ? 'bg-[#2EA7E0] text-white shadow-lg shadow-[#2EA7E0]/50'
                  : 'bg-slate-800 text-slate-300 border-2 border-slate-700 hover:border-[#2EA7E0]'
                  }`}
              >
                {/* Shimmer effect for active button */}
                {selectedDevice === device.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                )}
                {/* Shimmer effect on hover for inactive buttons */}
                {selectedDevice !== device.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2EA7E0]/20 to-transparent opacity-0 group-hover:opacity-100"
                    whileHover={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5 }}
                  />
                )}
                <span className="relative z-10">{device.name}</span>
              </motion.button>
            ))}
          </div>

          {/* DESKTOP LAYOUT - Hidden on mobile, visible on large screens */}
          <motion.div
            key={`desktop-${selectedDevice}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex items-center justify-center mb-16 relative"
          >
            {/* Configurations - Burst Animation from Center */}
            <div className="relative flex items-center justify-center gap-8 xl:gap-12 max-w-[1800px] mx-auto">
              {/* Left Side Cards - 3 cards */}
              <div className="flex flex-col gap-6 w-full max-w-sm">
                {currentDevice.configurations.slice(0, 3).map((config, index) => (
                  <motion.div
                    key={`${selectedDevice}-left-${index}`}
                    initial={{
                      opacity: 0,
                      x: 200,
                      scale: 0,
                      rotateY: 90
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotateY: 0
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + (index * 0.12),
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }}
                    whileHover={{ scale: 1.05, x: -10, transition: { type: "spring", stiffness: 300 } }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-800/60 border border-slate-700/50 hover:border-[#2EA7E0] transition-all duration-500"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={config.image}
                        alt={config.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120 opacity-30 group-hover:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 group-hover:from-[#2EA7E0]/70 group-hover:via-slate-900/70 group-hover:to-[#2EA7E0]/70 transition-all duration-700" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between min-h-[160px]">
                      <div>
                        <motion.h3
                          className="text-white font-bold mb-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.15) }}
                        >
                          {config.label}
                        </motion.h3>
                        <motion.p
                          className="text-slate-400 text-sm mb-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + (index * 0.15) }}
                        >
                          {config.description}
                        </motion.p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + (index * 0.15) }}
                      >
                        <div className="text-[#2EA7E0] font-bold bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-[#2EA7E0]/30 group-hover:border-[#2EA7E0] group-hover:shadow-lg group-hover:shadow-[#2EA7E0]/50 transition-all duration-500">
                          {config.value}
                        </div>
                      </motion.div>
                    </div>

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-[#2EA7E0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none shadow-lg shadow-[#2EA7E0]/50" />
                  </motion.div>
                ))}
              </div>

              {/* Device Image - Centered */}
              <motion.div
                key={`device-${selectedDevice}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.08, rotateY: 5 }}
                className="relative z-20 w-full max-w-lg flex-shrink-0"
                style={{ perspective: "1500px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/30 to-cyan-400/30 blur-3xl rounded-full animate-pulse" />
                <img
                  src={currentDevice.image}
                  alt={currentDevice.name}
                  className="relative z-10 w-full h-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Right Side Cards - 3 cards */}
              <div className="flex flex-col gap-6 w-full max-w-sm">
                {currentDevice.configurations.slice(3, 6).map((config, index) => (
                  <motion.div
                    key={`${selectedDevice}-right-${index}`}
                    initial={{
                      opacity: 0,
                      x: -200,
                      scale: 0,
                      rotateY: -90
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotateY: 0
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + (index * 0.12),
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }}
                    whileHover={{ scale: 1.05, x: 10, transition: { type: "spring", stiffness: 300 } }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-800/60 border border-slate-700/50 hover:border-[#2EA7E0] transition-all duration-500"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={config.image}
                        alt={config.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120 opacity-30 group-hover:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 group-hover:from-[#2EA7E0]/70 group-hover:via-slate-900/70 group-hover:to-[#2EA7E0]/70 transition-all duration-700" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between min-h-[160px]">
                      <div>
                        <motion.h3
                          className="text-white font-bold mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.15) }}
                        >
                          {config.label}
                        </motion.h3>
                        <motion.p
                          className="text-slate-400 text-sm mb-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + (index * 0.15) }}
                        >
                          {config.description}
                        </motion.p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + (index * 0.15) }}
                      >
                        <div className="text-[#2EA7E0] font-bold bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-[#2EA7E0]/30 group-hover:border-[#2EA7E0] group-hover:shadow-lg group-hover:shadow-[#2EA7E0]/50 transition-all duration-500">
                          {config.value}
                        </div>
                      </motion.div>
                    </div>

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-[#2EA7E0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none shadow-lg shadow-[#2EA7E0]/50" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MOBILE LAYOUT - Visible on mobile, hidden on large screens */}
          <div className="lg:hidden">
            {/* Device Image - Mobile */}
            <motion.div
              key={`mobile-device-${selectedDevice}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-20 w-full max-w-md mx-auto mb-8 sm:mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/30 to-cyan-400/30 blur-3xl rounded-full animate-pulse" />
              <img
                src={currentDevice.image}
                alt={currentDevice.name}
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Configuration Cards Grid - Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
              {currentDevice.configurations.map((config, index) => (
                <motion.div
                  key={`${selectedDevice}-mobile-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + (index * 0.1),
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer bg-slate-800/60 border border-slate-700/50 hover:border-[#2EA7E0] transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={config.image}
                      alt={config.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 group-hover:from-[#2EA7E0]/70 group-hover:via-slate-900/70 group-hover:to-[#2EA7E0]/70 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
                    <div>
                      <h3 className="text-white font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">
                        {config.label}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">
                        {config.description}
                      </p>
                    </div>
                    <div>
                      <div className="text-[#2EA7E0] font-bold bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 inline-block border border-[#2EA7E0]/30 group-hover:border-[#2EA7E0] group-hover:shadow-lg group-hover:shadow-[#2EA7E0]/50 transition-all duration-500 text-xs sm:text-sm">
                        {config.value}
                      </div>
                    </div>
                  </div>

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  />

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-[#2EA7E0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none shadow-lg shadow-[#2EA7E0]/50" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 text-center px-4"
          >
            <p className="text-slate-600 text-base sm:text-lg mb-4 sm:mb-6">
              Ready to transform your business with {currentDevice.name}?
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 167, 224, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#2EA7E0] to-[#2596c9] text-white rounded-full font-semibold text-base sm:text-lg shadow-xl transition-all duration-300"
            >
              Request a Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}