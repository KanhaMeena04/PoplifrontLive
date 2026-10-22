import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import CreatorEconomy from './pages/CreatorEconomy';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import CommunityGuidelines from './pages/Legal/CommunityGuidelines';
import ChildSafetyPolicy from './pages/Legal/ChildSafetyPolicy';
import AbusePreventionPolicy from './pages/Legal/AbusePreventionPolicy';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsAndConditions from './pages/Legal/TermsAndConditions';
import CookiesPolicy from './pages/Legal/CookiesPolicy';
import ComingSoon from './pages/ComingSoon';
import ReelPage from './pages/ReelPage';

import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="creator-economy" element={<CreatorEconomy />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="legal" element={<Legal />} />
            <Route path="guidelines" element={<CommunityGuidelines />} />
            <Route path="community-guidelines" element={<CommunityGuidelines />} />
            <Route path="child-safety-policy" element={<ChildSafetyPolicy />} />
            <Route path="abuse-prevention-policy" element={<AbusePreventionPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="cookies" element={<CookiesPolicy />} />
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="download" element={<ComingSoon />} />
            <Route path="reel/:id" element={<ReelPage />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;