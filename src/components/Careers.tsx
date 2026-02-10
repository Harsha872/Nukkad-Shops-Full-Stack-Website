import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Briefcase, Clock, ArrowRight, Mail, Phone, MapPinned, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo_1.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { JobDetailsModal } from './JobDetailsModal';

interface Job {
  title: string;
  location: string;
  experience: string;
  posted: string;
  department: string;
  type: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  benefits: string[];
}

const jobsData: Job[] = [
  {
    title: 'Trainee Analyst – Engineering',
    location: 'Hyderabad',
    experience: '0 – 1 Years',
    posted: '4 weeks ago',
    department: 'Engineering',
    type: 'Full-time',
    salary: 'INR 2.5 - 3.5 LPA',
    description: 'Join our Engineering team as a Trainee Analyst to assist in the development and maintenance of our POS solutions.',
    responsibilities: [
      'Assist in the development and testing of POS software.',
      'Collaborate with the engineering team to identify and resolve bugs.',
      'Document and maintain technical documentation.',
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, Engineering, or a related field.',
      'Basic knowledge of software development and testing.',
    ],
    skills: [
      'Problem-solving',
      'Attention to detail',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Customer Success Analyst',
    location: 'Hyderabad',
    experience: '1 – 3 Years',
    posted: '9 months ago',
    department: 'Customer Success',
    type: 'Full-time',
    salary: 'INR 4 - 5 LPA',
    description: 'As a Customer Success Analyst, you will be responsible for ensuring our customers are fully utilizing our POS solutions and achieving their business goals.',
    responsibilities: [
      'Monitor customer usage and provide support to resolve issues.',
      'Conduct regular check-ins with customers to gather feedback and address concerns.',
      'Develop and maintain customer success plans.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Computer Science, or a related field.',
      'Experience in customer support or success roles.',
    ],
    skills: [
      'Customer service',
      'Communication',
      'Problem-solving',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Customer Success – Trainee',
    location: 'Hyderabad',
    experience: '0 – 1 Years',
    posted: '9 months ago',
    department: 'Customer Success',
    type: 'Internship',
    salary: 'INR 1.5 - 2.5 LPA',
    description: 'Join our Customer Success team as a Trainee to gain hands-on experience in supporting our customers and ensuring their success with our POS solutions.',
    responsibilities: [
      'Assist in monitoring customer usage and providing support to resolve issues.',
      'Participate in regular check-ins with customers to gather feedback and address concerns.',
      'Learn and contribute to the development of customer success plans.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Computer Science, or a related field.',
      'Basic knowledge of customer support or success roles.',
    ],
    skills: [
      'Customer service',
      'Communication',
      'Problem-solving',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Business Analyst',
    location: 'Hyderabad GMR Airport',
    experience: '2 – 3 Years',
    posted: '9 months ago',
    department: 'Business',
    type: 'Full-time',
    salary: 'INR 5 - 6 LPA',
    description: 'As a Business Analyst, you will be responsible for analyzing business processes and identifying opportunities for improvement to enhance the efficiency and effectiveness of our POS solutions.',
    responsibilities: [
      'Conduct business process analysis and identify areas for improvement.',
      'Develop and implement process improvements to enhance efficiency and effectiveness.',
      'Collaborate with cross-functional teams to ensure successful implementation of improvements.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Computer Science, or a related field.',
      'Experience in business analysis or process improvement roles.',
    ],
    skills: [
      'Business analysis',
      'Process improvement',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Hardware Analyst',
    location: 'Hyderabad',
    experience: '0 – 2 Years',
    posted: '9 months ago',
    department: 'Engineering',
    type: 'Full-time',
    salary: 'INR 3 - 4 LPA',
    description: 'Join our Engineering team as a Hardware Analyst to assist in the development and maintenance of our POS hardware solutions.',
    responsibilities: [
      'Assist in the development and testing of POS hardware.',
      'Collaborate with the engineering team to identify and resolve hardware issues.',
      'Document and maintain technical documentation.',
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, Engineering, or a related field.',
      'Basic knowledge of hardware development and testing.',
    ],
    skills: [
      'Problem-solving',
      'Attention to detail',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Sales Intern',
    location: 'Hyderabad',
    experience: '0 – 1 Years',
    posted: '9 months ago',
    department: 'Sales',
    type: 'Internship',
    salary: 'INR 1.5 - 2.5 LPA',
    description: 'Join our Sales team as an Intern to gain hands-on experience in selling our POS solutions to retailers and businesses.',
    responsibilities: [
      'Assist in the identification and qualification of potential customers.',
      'Support the sales team in the preparation of sales presentations and proposals.',
      'Participate in customer meetings and provide support in closing deals.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Marketing, or a related field.',
      'Basic knowledge of sales and marketing principles.',
    ],
    skills: [
      'Sales',
      'Marketing',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Sales Executive',
    location: 'Bangalore',
    experience: '0 – 2 Years',
    posted: '1 year ago',
    department: 'Sales',
    type: 'Full-time',
    salary: 'INR 4 - 5 LPA',
    description: 'As a Sales Executive, you will be responsible for selling our POS solutions to retailers and businesses, and building long-term relationships with our customers.',
    responsibilities: [
      'Identify and qualify potential customers.',
      'Prepare and deliver sales presentations and proposals.',
      'Close deals and build long-term relationships with customers.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Marketing, or a related field.',
      'Experience in sales roles.',
    ],
    skills: [
      'Sales',
      'Marketing',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Customer Support Executive',
    location: 'Hyderabad',
    experience: '0 – 1 Years',
    posted: '1 year ago',
    department: 'Support',
    type: 'Full-time',
    salary: 'INR 2.5 - 3.5 LPA',
    description: 'As a Customer Support Executive, you will be responsible for providing technical support to our customers and resolving issues with our POS solutions.',
    responsibilities: [
      'Monitor customer usage and provide support to resolve issues.',
      'Conduct regular check-ins with customers to gather feedback and address concerns.',
      'Document and maintain customer support records.',
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, Engineering, or a related field.',
      'Experience in customer support roles.',
    ],
    skills: [
      'Customer service',
      'Communication',
      'Problem-solving',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Business Analyst Trainee',
    location: 'Hyderabad',
    experience: '0 – 1 Years',
    posted: '12 months ago',
    department: 'Business',
    type: 'Internship',
    salary: 'INR 1.5 - 2.5 LPA',
    description: 'Join our Business team as a Trainee to gain hands-on experience in analyzing business processes and identifying opportunities for improvement to enhance the efficiency and effectiveness of our POS solutions.',
    responsibilities: [
      'Assist in conducting business process analysis and identifying areas for improvement.',
      'Learn and contribute to the development of process improvements to enhance efficiency and effectiveness.',
      'Participate in cross-functional team meetings to ensure successful implementation of improvements.',
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Computer Science, or a related field.',
      'Basic knowledge of business analysis or process improvement roles.',
    ],
    skills: [
      'Business analysis',
      'Process improvement',
      'Communication',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
  {
    title: 'Field Support Executive',
    location: 'Hyderabad',
    experience: '0 – 2 Years',
    posted: '12 months ago',
    department: 'Support',
    type: 'Full-time',
    salary: 'INR 3 - 4 LPA',
    description: 'As a Field Support Executive, you will be responsible for providing on-site technical support to our customers and resolving issues with our POS solutions.',
    responsibilities: [
      'Provide on-site technical support to customers.',
      'Conduct regular check-ins with customers to gather feedback and address concerns.',
      'Document and maintain customer support records.',
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, Engineering, or a related field.',
      'Experience in field support roles.',
    ],
    skills: [
      'Customer service',
      'Communication',
      'Problem-solving',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
    ],
  },
];

function JobCard({ job, index, onViewDetails }: { job: Job; index: number; onViewDetails: (job: Job) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-200/50 hover:border-[#2EA7E0]/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Hover gradient effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/10 via-cyan-50/50 to-transparent -z-10"
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="px-3 py-1 bg-[#2EA7E0]/10 text-[#2EA7E0] rounded-full text-xs sm:text-sm font-semibold">
              {job.department}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm font-medium">
              {job.type}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 group-hover:text-[#2EA7E0] transition-colors">
            {job.title}
          </h3>

          <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-[#2EA7E0] flex-shrink-0" />
              <span className="text-sm sm:text-base">{job.location}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Briefcase className="w-4 h-4 text-[#2EA7E0] flex-shrink-0" />
              <span className="text-sm sm:text-base">{job.experience}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{job.posted}</span>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => onViewDetails(job)}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="self-start lg:self-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#2EA7E0] to-cyan-500 text-white rounded-full font-semibold shadow-lg shadow-[#2EA7E0]/25 hover:shadow-xl hover:shadow-[#2EA7E0]/40 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />

      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NjY5NDUwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Office Background"
          className="w-full h-full object-cover"
        />
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0]/5 via-transparent to-cyan-500/5" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#2EA7E0]/20 to-cyan-400/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-[#2EA7E0]/15 rounded-full blur-3xl"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2EA7E0_1px,transparent_1px),linear-gradient(to_bottom,#2EA7E0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-5" />

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #2EA7E0 0px,
              #2EA7E0 1px,
              transparent 1px,
              transparent 60px
            )`
          }} />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/30 shadow-lg shadow-[#2EA7E0]/5">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={logoImage}
                alt="Nukkad Shops Logo"
                className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/"
                className="text-sm font-semibold tracking-wide text-slate-700 hover:text-[#2EA7E0] transition-colors px-4 py-2 rounded-lg hover:bg-white/60"
              >
                Home
              </Link>
              <Link
                to="/careers"
                className="text-sm font-semibold tracking-wide text-[#2EA7E0] bg-[#2EA7E0]/15 px-4 py-2 rounded-lg shadow-sm relative"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative max-w-[1440px] mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-normal text-slate-900 mb-4 sm:mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Join Our <span className="bg-gradient-to-r from-[#2EA7E0] to-cyan-500 bg-clip-text text-transparent">Team</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4 leading-relaxed"
          >
            We're on a mission to empower retailers across India with innovative POS solutions. Join our team of innovators, builders, and dreamers to make a real impact.
          </motion.p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto mb-12 sm:mb-16">
            {[
              { value: '10+', label: 'Open Positions' },
              { value: '3+', label: 'Office Locations' },
              { value: '100+', label: 'Team Members' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EA7E0] to-cyan-500 rounded-2xl lg:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-[#2EA7E0]/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#2EA7E0] to-cyan-500 bg-clip-text text-transparent mb-2 sm:mb-3"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-semibold">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 sm:mt-16"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex flex-col items-center gap-2 text-[#2EA7E0]"
            >
              <span className="text-xs sm:text-sm font-medium">Explore Opportunities</span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Job Openings Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[72px] font-normal text-slate-900 mb-4 sm:mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Open <span className="bg-gradient-to-r from-[#2EA7E0] to-cyan-500 bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mb-8 sm:mb-10">
              Find your perfect role and start your journey with us today.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by job title, location, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 bg-white/90 backdrop-blur-sm border border-slate-300/50 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2EA7E0]/50 focus:border-[#2EA7E0]/50 transition-all text-sm sm:text-base shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Jobs Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-base sm:text-lg text-slate-700 font-semibold">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
            </p>
          </motion.div>

          {/* Job Listings */}
          <div className="space-y-4 sm:space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} index={index} onViewDetails={handleViewDetails} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 sm:py-20"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
                </div>
                <p className="text-lg sm:text-xl text-slate-600">No jobs found matching your search.</p>
                <p className="text-sm sm:text-base text-slate-500 mt-2">Try adjusting your search criteria.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
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
                    href="https://linkedin.com/company/nukkadshops"
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
                    <Link to="/careers" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-[#2EA7E0] transition-colors" />
                      About Us
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
                      href="mailto:careers@nukkadshops.com"
                      className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-3 group"
                    >
                      <Mail className="w-5 h-5 text-[#2EA7E0] flex-shrink-0" />
                      <span>careers@nukkadshops.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+911234567890"
                      className="text-slate-400 hover:text-[#2EA7E0] transition-colors text-sm flex items-center gap-3 group"
                    >
                      <Phone className="w-5 h-5 text-[#2EA7E0] flex-shrink-0" />
                      <span>+91 123 456 7890</span>
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
    </div>
  );
}