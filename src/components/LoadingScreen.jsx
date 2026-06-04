import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative"
      >
        <Logo className="w-24 h-24" />
        <div className="absolute inset-0 bg-brand-purple/20 blur-2xl -z-10 animate-pulse" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <h2 className="text-xl font-black tracking-[0.4em] text-white uppercase italic">
          Forging <span className="text-brand-purple">Shadows</span>
        </h2>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-purple shadow-[0_0_10px_#8b5cf6]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
