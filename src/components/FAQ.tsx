import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatePresence } from "motion/react";

import faq1Img from "../assets/faq/faq_1.png";
import faq2Img from "../assets/faq/faq_2.png";
import faq3Img from "../assets/faq/faq_3.png";
import faq4Img from "../assets/faq/faq_4.png";
import faq5Img from "../assets/faq/faq_5.png";
import faq6Img from "../assets/faq/faq_6.png";
import faq7Img from "../assets/faq/faq_7.png";
import faq8Img from "../assets/faq/faq_8.png";
import faq9Img from "../assets/faq/faq_9.png";

/* =======================
   FAQ DATA
======================= */
const faqData = [
  {
    question: "What services does Nukkad Shops offer?",
    answer:
      "We provide a complete Android-based POS solution with billing, inventory, analytics, CRM, marketing, and online store features. For any special requirements, you can always speak to our sales team.",
    image: faq1Img,
  },
  {
    question: "Who can use Nukkad Shops POS?",
    answer:
      "Ideal for all retail outlets - including supermarkets, grocery stores, bakeries, and pharmacies - this solution offers billing, inventory management, analytics, CRM, marketing, and online store setup. click “Call for Demo”, or contact our sales team at +91 799 7095678 to schedule a demonstration.",
    image: faq2Img,
  },
  {
    question: "What is the main difference between a POS system and a cash register",
    answer:
      " A cash register only records sales and prints bills, while a POS system manages sales, inventory, customers, payments, reports, and overall business operations. POS is a complete business management tool; a cash register is just a billing machine.",
    image: faq3Img,
  },
  {
    question: "What is mPOS? Who should use mPOS?",
    answer:
      "mPOS (Mobile Point of Sale) is a portable billing system that works on a smartphone/ tablet or EDC machine to help businesses bill customers and accept payments on the go. Ideal for grocery stores, small retailers, delivery staff, food trucks, pop-up shops, and businesses that need quick, mobile billing.",
    image: faq4Img,
  },
  {
    question: "What is DinO?",
    answer:
      "DinO is our complete POS solution for restaurants and F& B outlets.It works even on mobiles, and helps with: ",
    points: [
      "Billing",
      "Kitchen order management",
      "Attendance tracking",
      "Real-time reporting",
    ],
    image: faq5Img,
  },
  {
    question: "Does Nukkad Shops offer hardware along with software?",
    answer:
      "Yes. Nukkad Shops provides Android POS devices such as Aspire, Pro2, and Elite-A, integrated with the software.",
    image: faq6Img,
  },
  {
    question: "Is the internet required to use Nukkad Shops POS and mPOS?",
    answer:
      "The system works both online and offline. Data syncs automatically once the connection is restored.",
    image: faq7Img,
  },
  {
    question: "Does Nukkad Shops provide customer support?",
    answer:
      "Yes. Dedicated support is available via phone, email, and live chat for all users.",
    image: faq9Img,
  },
  {
    question: "Can I access reports and analytics remotely?",
    answer: "Yes, you can track sales, inventory, and performance from anywhere using the Nukkad Shops dashboard or mobile app.",
    image: faq8Img
  }
];

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onClick,
}: {
  item: { question: string; answer: string; image: string };
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b-2 border-slate-900/10 last:border-b-0 overflow-hidden"
    >
      {/* Main container for question and expanded content */}
      <div className="relative">
        {/* Question Button */}
        <button
          onClick={onClick}
          className={`w-full py-8 px-6 flex items-start justify-between gap-6 text-left transition-all duration-500 group relative z-20 ${isOpen ? 'bg-gradient-to-r from-[#2EA7E0]/5 to-transparent' : 'hover:bg-slate-50/50'
            }`}
        >
          <span
            className={`text-xl pr-4 transition-colors duration-300 ${isOpen ? 'text-[#2EA7E0]' : 'text-slate-900 group-hover:text-[#2EA7E0]'
              }`}
          >
            {item.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
              ? 'bg-[#2EA7E0] shadow-lg shadow-[#2EA7E0]/30'
              : 'bg-[#2EA7E0]/10 group-hover:bg-[#2EA7E0]'
              }`}
          >
            <ChevronDown
              className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#2EA7E0] group-hover:text-white'
                }`}
            />
          </motion.div>
        </button>

        {/* Answer Content with Image - Slides in from right */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.5, ease: "easeInOut" },
                  opacity: { duration: 0.4, delay: 0.1 }
                }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden"
            >
              <div className="pb-8 pt-0 px-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Answer Text - Left Side */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.2,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    exit={{
                      x: -30,
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    className="flex-1"
                  >
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>

                  {/* Image - Right Side */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    exit={{
                      x: 100,
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    className="flex-shrink-0 w-full md:w-72"
                  >
                    {/* Image container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#2EA7E0]/20">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.question}
                        className="w-full h-48 object-cover"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);





  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 overflow-hidden"
    >

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className=" uppercase mb-4 text-gray-900 tracking-normal text-center"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about Nukkad Shops POS solutions
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}