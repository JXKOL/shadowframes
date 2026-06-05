import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Auth = ({ mode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');

  return (
    <div className="pt-24 pb-20 px-6 flex items-center justify-center min-h-[80vh]">
      <SEO 
        title={isLogin ? "Login - Access Your Collection" : "Sign Up - Join the Forge"} 
        description="Access your ShadowFrames account to manage your AI anime art collection, save favorites, and unlock premium features."
      />
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tighter mb-2">
              {isLogin ? 'WELCOME' : 'JOIN'} <span className="text-brand-purple">SHADOW</span>
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Log in to access your frames.' : 'Start generating exclusive anime art.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-brand-black border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-brand-black border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-brand-black border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>

            <button className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 glow-purple hover:bg-brand-purple/80 transition-all mt-6">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-brand-black px-2 text-gray-500">Or continue with</span></div>
          </div>

          <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <Shield className="w-5 h-5" /> GitHub
          </button>

          <p className="text-center mt-8 text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-brand-purple font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
