import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import CreatorEconomy from './pages/CreatorEconomy';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import ComingSoon from './pages/ComingSoon';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <CustomCursor />
      
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="creator-economy" element={<CreatorEconomy />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<Legal />} />
              <Route path="terms" element={<Legal />} />
              <Route path="guidelines" element={<Legal />} />
              <Route path="cookies" element={<Legal />} />
              <Route path="coming-soon" element={<ComingSoon />} />
              <Route path="download" element={<ComingSoon />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </AnimatePresence>
      )}
    </SmoothScroll>
  );
}

export default App;
