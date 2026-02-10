import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Download } from 'lucide-react';
import { useState } from 'react';
import brochureImage from '../assets/brochure.png';
import whatsappIcon from '../assets/whatsapp.png';

interface BrochurePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochurePopup({ isOpen, onClose }: BrochurePopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    email: '',
    recaptcha: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState<'whatsapp' | 'direct' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInfoMessage, setIsInfoMessage] = useState(false);

  // WhatsApp Business Number - Format: country code + number (no + or spaces)
  const WHATSAPP_BUSINESS_NUMBER = '917997095678';
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Email validation helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Mobile validation helper (Indian format)
  const isValidMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ''));
  };

  const validateForm = (): boolean => {
    // Validate reCAPTCHA
    if (!formData.recaptcha) {
      setError('Please verify that you are not a robot');
      return false;
    }

    // Validate form fields
    if (!formData.name || !formData.mobile || !formData.city) {
      setError('Please fill in all required fields');
      return false;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate mobile number
    if (!isValidMobile(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }

    return true;
  };

  const handleWhatsAppSubmit = async () => {
    setError(null);
    setIsInfoMessage(false);
    setSubmitType('whatsapp');

    // Validate form
    if (!validateForm()) {
      setSubmitType(null);
      return;
    }

    setIsSubmitting(true);

    try {
      // Optional: Send lead data to backend for tracking
      // This is non-blocking - WhatsApp will open regardless of backend status
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE}/api/brochure`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            email: formData.email.trim(),
            city: formData.city.trim(),
            source: 'whatsapp',
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log('✅ Lead data saved successfully');
        } else {
          console.log('⚠️ Backend returned an error, but continuing with WhatsApp');
        }
      } catch (fetchError) {
        // Silent fail - backend is optional for WhatsApp flow
        console.log('ℹ️ Backend not available - lead tracking skipped (this is normal if backend is not set up)');
      }

      // Create WhatsApp message with form details
      const message = `Hi, I would like to get the Nukkad Shops POS brochure.

*My Details:*
Name: ${formData.name}
Mobile: ${formData.mobile}
Email: ${formData.email}
City: ${formData.city}

Please send me the brochure PDF. Thank you!`;

      // Create WhatsApp URL - wa.me opens user's WhatsApp app (mobile) or web.whatsapp.com (desktop)
      const whatsappURL = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;

      // Open user's WhatsApp
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');

      // Success - close modal after short delay
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          mobile: '',
          city: '',
          email: '',
          recaptcha: false,
        });
        setError(null);
      }, 1000);

    } catch (error) {
      console.error('WhatsApp redirect error:', error);
      setError('Unable to open WhatsApp. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitType(null);
    }
  };

  const handleDirectSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError(null);
    setIsInfoMessage(false);
    setSubmitType('direct');

    // Validate form
    if (!validateForm()) {
      setSubmitType(null);
      return;
    }

    setIsSubmitting(true);
    let apiSuccess = false;

    try {
      // 1️⃣ Try to send lead to backend (MySQL + HubSpot)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(`${API_BASE}/api/brochure`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            email: formData.email.trim(),
            city: formData.city.trim(),
            source: 'direct',
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          apiSuccess = true;
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.warn('Server returned error:', errorData.message || `Status: ${response.status}`);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.warn('Request timeout - server may be unavailable');
        } else {
          console.warn('Failed to connect to server:', fetchError);
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }

    // 2️⃣ Download brochure (fetch + blob + trigger download)
    try {
      const res = await fetch(`${API_BASE}/brochure`);
      if (!res.ok) throw new Error('Brochure not available');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Nukkad_Shops_Brochure.pdf';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (downloadError) {
      setError('Unable to download brochure. Please ensure the server is running or try again later.');
      setIsSubmitting(false);
      setSubmitType(null);
      return;
    }

    // 3️⃣ Show success message
    if (apiSuccess) {
      onClose();
      setFormData({
        name: '',
        mobile: '',
        city: '',
        email: '',
        recaptcha: false,
      });
      setError(null);
    } else {
      setError('Brochure downloaded! Note: Your details may not have been saved. Please contact us if needed.');
      setIsInfoMessage(true);
      setTimeout(() => {
        setError(null);
        setIsInfoMessage(false);
        onClose();
        setFormData({
          name: '',
          mobile: '',
          city: '',
          email: '',
          recaptcha: false,
        });
      }, 5000);
    }

    setIsSubmitting(false);
    setSubmitType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Default to direct download if form is submitted via Enter key
    await handleDirectSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Opaque dark overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Popup content - Horizontal layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-full max-w-4xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" strokeWidth={2} />
              </motion.button>

              {/* Content wrapper - Horizontal layout */}
              <div className="flex flex-col md:flex-row">
                {/* Left side - Image (40% width) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="md:w-[40%] bg-slate-100 hidden md:block"
                >
                  <img
                    src={brochureImage}
                    alt="Shopkeeper using POS device"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Right side - Form (60% width) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="md:w-[60%] p-6 sm:p-8 md:p-10"
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-5 sm:mb-6"
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 text-slate-900">
                      Get the Right POS Solution for Your Store
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      Fill in the form to download our brochure and explore Nukkad Shops
                    </p>
                  </motion.div>

                  {/* Error/Info Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 p-3 rounded-lg text-sm ${isInfoMessage
                        ? 'bg-blue-50 border border-blue-200 text-blue-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                        }`}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Name field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Name *"
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-300 rounded-lg focus:border-[#2EA7E0] focus:ring-2 focus:ring-[#2EA7E0]/20 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm"
                      />
                    </motion.div>

                    {/* Mobile field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="Enter Mobile Number *"
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-300 rounded-lg focus:border-[#2EA7E0] focus:ring-2 focus:ring-[#2EA7E0]/20 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm"
                      />
                    </motion.div>

                    {/* Email field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Email *"
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-300 rounded-lg focus:border-[#2EA7E0] focus:ring-2 focus:ring-[#2EA7E0]/20 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm"
                      />
                    </motion.div>

                    {/* City field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter City *"
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-300 rounded-lg focus:border-[#2EA7E0] focus:ring-2 focus:ring-[#2EA7E0]/20 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm"
                      />
                    </motion.div>

                    {/* reCAPTCHA checkbox */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      className="flex items-center gap-2 py-1"
                    >
                      <input
                        type="checkbox"
                        id="recaptcha"
                        checked={formData.recaptcha}
                        onChange={(e) =>
                          setFormData({ ...formData, recaptcha: e.target.checked })
                        }
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-slate-300 text-[#2EA7E0] focus:ring-[#2EA7E0] cursor-pointer"
                      />
                      <label
                        htmlFor="recaptcha"
                        className="text-xs sm:text-sm text-slate-600 cursor-pointer select-none"
                      >
                        I'm not a robot
                      </label>
                    </motion.div>

                    {/* Submit Buttons - WhatsApp & Direct Download */}
                    <div className="space-y-3 pt-2">


                      <motion.button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"

                      >


                        {isSubmitting && submitType === 'whatsapp' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="text-sm sm:text-base font-medium">Opening WhatsApp...</span>
                          </>
                        ) : (
                          <>
                            <img
                              src={whatsappIcon}
                              alt="WhatsApp"
                              className="w-5 h-5"
                              draggable={false}
                            />

                            <span className="text-sm sm:text-base font-medium">GET VIA WHATSAPP</span>
                          </>
                        )}
                      </motion.button>

                      {/* Direct Download Button */}
                      <motion.button
                        type="button"
                        onClick={() => handleDirectSubmit()}
                        disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                        className="w-full bg-[#2EA7E0] hover:bg-[#2596c9] disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        {isSubmitting && submitType === 'direct' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="text-sm sm:text-base font-medium">Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            <span className="text-sm sm:text-base font-medium">DOWNLOAD DIRECTLY</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}