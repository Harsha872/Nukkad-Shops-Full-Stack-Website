import { lazy, Suspense, useState, useEffect } from 'react';

const Hero = lazy(() => import('./Hero').then(module => ({ default: module.Hero })));
const AppleProductShowcase = lazy(() => import('./AppleProductShowcase').then(module => ({ default: module.AppleProductShowcase })));
const Industries = lazy(() => import('./Industries').then(module => ({ default: module.Industries })));
const Features = lazy(() => import('./Features').then(module => ({ default: module.Features })));
const Metrics = lazy(() => import('./Metrics').then(module => ({ default: module.Metrics })));
const Testimonials = lazy(() => import('./Testimonials').then(module => ({ default: module.Testimonials })));
const Partners = lazy(() => import('./Partners').then(module => ({ default: module.Partners })));
const FAQ = lazy(() => import('./FAQ').then(module => ({ default: module.FAQ })));
const CallToAction = lazy(() => import('./CallToAction').then(module => ({ default: module.CallToAction })));
const Footer = lazy(() => import('./Footer').then(module => ({ default: module.Footer })));
const Navigation = lazy(() => import('./Navigation').then(module => ({ default: module.Navigation })));
const BrochurePopup = lazy(() => import('./BrochurePopup').then(module => ({ default: module.BrochurePopup })));

export function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Open popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />

      {/* Add padding-top to account for fixed navigation */}
      <main className="pt-14">
        <div id="home">
          <Hero onOpenBrochure={() => setIsPopupOpen(true)} />
        </div>
        <div id="products">
          <AppleProductShowcase />
        </div>
        <div id="industries">
          <Industries />
        </div>
        <div id="features">
          <Features />
        </div>
        <Metrics />
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="partners">
          <Partners />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="demo">
          <CallToAction />
        </div>
        <Footer />
      </main>

      {/* Brochure Download Popup */}
      <BrochurePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}