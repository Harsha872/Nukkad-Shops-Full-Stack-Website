import { useEffect, lazy, Suspense } from 'react';
const HomePage = lazy(() => import('./components/HomePage').then(module => ({ default: module.HomePage })));
const Careers = lazy(() => import('./components/Careers').then(module => ({ default: module.Careers })));
const DeviceDetails = lazy(() => import('./components/DeviceDetails').then(module => ({ default: module.DeviceDetails })));
import { ScrollToTop } from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  // ✅ Load HubSpot script once when app starts
  useEffect(() => {
    // Prevent duplicate script load
    if (document.getElementById("hs-script-loader")) return;

    const script = document.createElement("script");
    script.id = "hs-script-loader";
    script.src = "//js-na2.hs-scripts.com/243714442.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    console.log("HubSpot script loaded");

    return () => {
      // Optional cleanup (usually not required)
      // document.body.removeChild(script);
    };
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2EA7E0]"></div></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/device/:deviceId" element={<DeviceDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
