import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Generate from './pages/Generate';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-white selection:bg-brand-purple/30 selection:text-brand-purple">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
          </Routes>
        </main>
        
        <footer className="py-12 border-t border-white/5 bg-brand-black/50 text-center text-gray-500 text-sm">
          <p>© 2024 ShadowFrames. Powered by AI Artistry.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
