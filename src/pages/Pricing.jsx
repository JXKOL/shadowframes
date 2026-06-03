import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for exploring and casual downloads.',
      features: ['5 AI Generations / month', 'Standard Quality', 'Personal Use Only', 'Watermarked Downloads'],
      icon: <Zap className="w-6 h-6" />,
      buttonText: 'Get Started',
      featured: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/mo',
      description: 'The most popular choice for anime enthusiasts.',
      features: ['Unlimited Generations', '8K Ultra HD Quality', 'Commercial Rights', 'No Watermarks', 'Early Access to New Models'],
      icon: <Sparkles className="w-6 h-6 text-brand-purple" />,
      buttonText: 'Go Pro',
      featured: true
    },
    {
      name: 'Elite',
      price: '$24.99',
      period: '/mo',
      description: 'For creators and professional collectors.',
      features: ['Priority Generation', 'Custom Model Training', 'API Access', 'Dedicated Support', 'Exclusive NFT Minting'],
      icon: <Crown className="w-6 h-6 text-brand-red" />,
      buttonText: 'Join Elite',
      featured: false
    }
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tighter mb-4">
          CHOOSE YOUR <span className="text-brand-purple">FRAME</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Unlock the full potential of AI-driven anime art. Select a plan that fits your creative needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-3xl border transition-all ${
              plan.featured 
                ? 'bg-brand-purple/5 border-brand-purple glow-purple scale-105 z-10' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block">
              {plan.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
            </div>
            <p className="text-sm text-gray-500 mb-8">{plan.description}</p>
            
            <ul className="space-y-4 mb-10">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-brand-purple shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.featured 
                ? 'bg-brand-purple text-white hover:bg-brand-purple/80 glow-purple' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}>
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
