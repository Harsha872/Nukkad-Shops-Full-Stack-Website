import { motion } from "motion/react";
import { Phone, Mail, MapPinned, Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo_1.png";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2EA7E0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={logoImage}
                alt="Nukkad Shops Logo"
                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
              />
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Empowering retailers across India with innovative POS solutions. Join us in transforming the retail landscape.
              </p>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://instagram.com/nukkadshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2EA7E0] hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/nukkad-shops"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2EA7E0] hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/nukkadshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2EA7E0] hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://facebook.com/nukkadshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2EA7E0] hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#products" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Products
                  </a>
                </li>
                <li>
                  <a href="#industries" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Industries
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Features
                  </a>
                </li>
                <li>
                  <a href="#partners" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Partners
                  </a>
                </li>
                <li>
                  <Link to="/careers" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Careers
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#support" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Support
                  </a>
                </li>
                <li>
                  <a href="#documentation" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#help" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                    Help Center
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:sales@nukkadshops.com"
                    className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-3 group"
                  >
                    <Mail className="w-5 h-5 text-[#2EA7E0] flex-shrink-0" />
                    <span>sales@nukkadshops.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917997095678"
                    className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-3 group"
                  >
                    <Phone className="w-5 h-5 text-[#2EA7E0] flex-shrink-0" />
                    <span>+91 799 709 5678</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919971452453"
                    className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-3 group"
                  >
                    <Phone className="w-5 h-5 text-[#2EA7E0] flex-shrink-0" />
                    <span>+91 997 145 2453</span>
                  </a>
                </li>
                <li>
                  <div className="text-slate-400 text-sm flex items-start gap-3">
                    <MapPinned className="w-5 h-5 text-[#2EA7E0] flex-shrink-0 mt-0.5" />
                    <span>Hyderabad, Telangana, India</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-slate-700/50"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Nukkad Shops. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
