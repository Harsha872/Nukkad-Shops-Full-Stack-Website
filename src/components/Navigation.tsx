import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo_1.png';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products', dropdown: true },
    { id: 'industries', label: 'Industries' },
    { id: 'features', label: 'Features' },
    { id: 'partners', label: 'Partners' },
    { id: 'careers', label: 'Careers', isRoute: true },
  ];

  const productItems = [
    { id: 'aspire', label: 'Aspire' },
    { id: 'pro2', label: 'Pro2' },
    { id: 'elite', label: 'Elite-A' },
  ];

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  const handleNavigation = (id: string, isRoute?: boolean) => {
    if (isRoute) {
      navigate('/careers');
      setIsOpen(false);
    } else {
      // If we're on careers page, go back to home first
      if (location.pathname === '/careers') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveSection(id);
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActiveSection(id);
        }
      }
      setIsOpen(false);
      setShowProductsDropdown(false);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/careers') {
      navigate('/');
    } else {
      handleNavigation('home');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/30 shadow-lg shadow-[#2EA7E0]/5">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-8">
            {/* Logo - Absolute Left Corner */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={handleLogoClick}
            >
              <img
                src={logoImage}
                alt="Nukkad Shops Logo"
                className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {navItems.map((item, index) => (
                <div key={item.id} className="relative">
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => setShowProductsDropdown(true)}
                      onMouseLeave={() => setShowProductsDropdown(false)}
                    >
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavigation(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${activeSection === item.id
                          ? 'text-[#2EA7E0] bg-[#2EA7E0]/15 shadow-sm'
                          : 'text-slate-700 hover:text-[#2EA7E0] hover:bg-white/60 hover:shadow-sm'
                          }`}
                      >
                        {item.label}
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showProductsDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-36 bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl shadow-xl shadow-[#2EA7E0]/10 overflow-hidden"
                          >
                            {productItems.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleNavigation(product.id)}
                                className="w-full px-4 py-2.5 text-left text-sm font-normal text-slate-700 hover:text-[#2EA7E0] hover:bg-[#2EA7E0]/10 transition-all duration-200"
                              >
                                {product.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(item.id, item.isRoute)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${activeSection === item.id || (item.isRoute && location.pathname === '/careers')
                        ? 'text-[#2EA7E0] bg-[#2EA7E0]/15 shadow-sm'
                        : 'text-slate-700 hover:text-[#2EA7E0] hover:bg-white/60 hover:shadow-sm'
                        }`}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Absolute Right Corner */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              {/* Language Selector */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:text-[#2EA7E0] hover:bg-white/60 hover:shadow-sm transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span>English</span>
              </motion.button>

              {/* Book Demo Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => handleNavigation('demo')}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(46, 167, 224, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-1.5 bg-gradient-to-r from-[#2EA7E0] to-[#2596c9] text-white rounded-md text-sm font-medium shadow-lg shadow-[#2EA7E0]/25 hover:shadow-xl hover:shadow-[#2EA7E0]/35 transition-all duration-300 whitespace-nowrap"
              >
                Book a Demo
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-700 hover:text-[#2EA7E0] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/40 shadow-lg"
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id, item.isRoute)}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-normal transition-all duration-200 ${activeSection === item.id
                        ? 'text-[#2EA7E0] bg-[#2EA7E0]/10 shadow-sm'
                        : 'text-slate-700 hover:text-[#2EA7E0] hover:bg-white/60'
                        }`}
                    >
                      {item.label}
                    </button>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {productItems.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleNavigation(product.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#2EA7E0] hover:bg-[#2EA7E0]/10 rounded-lg transition-all duration-200"
                          >
                            {product.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-2 space-y-2">
                  <button className="w-full px-4 py-2.5 text-left text-sm font-normal text-slate-700 hover:text-[#2EA7E0] hover:bg-white/60 rounded-lg transition-all duration-200 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('demo')}
                    className="w-full px-5 py-2.5 bg-gradient-to-r from-[#2EA7E0] to-[#2596c9] text-white rounded-lg text-sm font-medium shadow-lg shadow-[#2EA7E0]/25 hover:shadow-xl hover:shadow-[#2EA7E0]/35 transition-all duration-300"
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}