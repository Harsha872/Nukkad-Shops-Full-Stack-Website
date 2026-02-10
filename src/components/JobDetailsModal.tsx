import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Briefcase, Clock, Share2, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface JobDetails {
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

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobDetails | null;
}

export function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${job.title} at Nukkad Shops`,
      text: `Check out this job opportunity: ${job.title} in ${job.location}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store application in localStorage
    const applicationData = {
      ...formData,
      jobTitle: job.title,
      resumeFileName: resumeFile?.name || '',
      appliedAt: new Date().toISOString(),
    };

    const existingApplications = JSON.parse(localStorage.getItem('job_applications') || '[]');
    existingApplications.push(applicationData);
    localStorage.setItem('job_applications', JSON.stringify(existingApplications));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      onClose();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        currentCompany: '',
        expectedSalary: '',
        noticePeriod: '',
        linkedIn: '',
        portfolio: '',
        coverLetter: '',
      });
      setResumeFile(null);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#2EA7E0] to-cyan-500 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 text-white flex-shrink-0">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                <div className="max-w-5xl mx-auto pr-12">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                      {job.type}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                    {job.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>

                  {/* Share Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full font-medium transition-all flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Job</span>
                  </motion.button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Job Details */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Job Description */}
                      <section>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-[#2EA7E0] to-cyan-500 rounded-full" />
                          Job Description
                        </h3>
                        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                          {job.description}
                        </p>
                      </section>

                      {/* Responsibilities */}
                      <section>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-[#2EA7E0] to-cyan-500 rounded-full" />
                          Key Responsibilities
                        </h3>
                        <ul className="space-y-3">
                          {job.responsibilities.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2EA7E0] mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Qualifications */}
                      <section>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-[#2EA7E0] to-cyan-500 rounded-full" />
                          Required Qualifications
                        </h3>
                        <ul className="space-y-3">
                          {job.qualifications.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                              <CheckCircle className="w-5 h-5 text-[#2EA7E0] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Skills */}
                      <section>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-[#2EA7E0] to-cyan-500 rounded-full" />
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 sm:px-4 py-2 bg-[#2EA7E0]/10 text-[#2EA7E0] rounded-full font-medium text-xs sm:text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* Benefits */}
                      <section>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-[#2EA7E0] to-cyan-500 rounded-full" />
                          Benefits & Perks
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2EA7E0] mt-2 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-8">
                        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                            Apply Now
                          </h3>

                          {submitSuccess ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-8"
                            >
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-2">
                                Application Submitted!
                              </h4>
                              <p className="text-slate-600 text-sm">
                                We'll review your application and get back to you soon.
                              </p>
                            </motion.div>
                          ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                              {/* Full Name */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="Enter your full name"
                                />
                              </div>

                              {/* Email */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="your.email@example.com"
                                />
                              </div>

                              {/* Phone */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="+91 1234567890"
                                />
                              </div>

                              {/* Education */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Highest Education *
                                </label>
                                <select
                                  name="education"
                                  value={formData.education}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                >
                                  <option value="">Select education</option>
                                  <option value="High School">High School</option>
                                  <option value="Diploma">Diploma</option>
                                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                                  <option value="Master's Degree">Master's Degree</option>
                                  <option value="PhD">PhD</option>
                                </select>
                              </div>

                              {/* Total Experience */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Total Experience *
                                </label>
                                <select
                                  name="experience"
                                  value={formData.experience}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                >
                                  <option value="">Select experience</option>
                                  <option value="Fresher">Fresher (0 years)</option>
                                  <option value="0-1 Years">0-1 Years</option>
                                  <option value="1-2 Years">1-2 Years</option>
                                  <option value="2-3 Years">2-3 Years</option>
                                  <option value="3-5 Years">3-5 Years</option>
                                  <option value="5+ Years">5+ Years</option>
                                </select>
                              </div>

                              {/* Current Company */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Current Company
                                </label>
                                <input
                                  type="text"
                                  name="currentCompany"
                                  value={formData.currentCompany}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="Company name"
                                />
                              </div>

                              {/* Notice Period */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Notice Period
                                </label>
                                <select
                                  name="noticePeriod"
                                  value={formData.noticePeriod}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                >
                                  <option value="">Select notice period</option>
                                  <option value="Immediate">Immediate</option>
                                  <option value="15 Days">15 Days</option>
                                  <option value="1 Month">1 Month</option>
                                  <option value="2 Months">2 Months</option>
                                  <option value="3 Months">3 Months</option>
                                </select>
                              </div>

                              {/* LinkedIn */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  LinkedIn Profile
                                </label>
                                <input
                                  type="url"
                                  name="linkedIn"
                                  value={formData.linkedIn}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="https://linkedin.com/in/yourprofile"
                                />
                              </div>

                              {/* Portfolio */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Portfolio/Website
                                </label>
                                <input
                                  type="url"
                                  name="portfolio"
                                  value={formData.portfolio}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all text-sm"
                                  placeholder="https://yourportfolio.com"
                                />
                              </div>

                              {/* Resume Upload */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Upload Resume *
                                </label>
                                <div className="relative">
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    required
                                    className="hidden"
                                    id="resume-upload"
                                  />
                                  <label
                                    htmlFor="resume-upload"
                                    className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#2EA7E0] transition-all cursor-pointer flex items-center justify-center gap-2 text-slate-600 hover:text-[#2EA7E0] text-sm"
                                  >
                                    <Upload className="w-5 h-5" />
                                    <span>
                                      {resumeFile ? resumeFile.name : 'Choose file (PDF, DOC, DOCX)'}
                                    </span>
                                  </label>
                                </div>
                              </div>

                              {/* Cover Letter */}
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Cover Letter
                                </label>
                                <textarea
                                  name="coverLetter"
                                  value={formData.coverLetter}
                                  onChange={handleChange}
                                  rows={4}
                                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2EA7E0]/20 focus:border-[#2EA7E0] transition-all resize-none text-sm"
                                  placeholder="Tell us why you're a great fit for this role..."
                                />
                              </div>

                              {/* Submit Button */}
                              <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className="w-full bg-gradient-to-r from-[#2EA7E0] to-cyan-500 text-white py-3.5 rounded-full font-semibold shadow-lg shadow-[#2EA7E0]/30 hover:shadow-xl hover:shadow-[#2EA7E0]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                  </span>
                                ) : (
                                  'Submit Application'
                                )}
                              </motion.button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
