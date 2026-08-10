import React, { useState } from 'react';

const EarningsCalculator: React.FC = () => {
  const [views, setViews] = useState(10000);
  const [videos, setVideos] = useState(3);
  
  const monthlyEarnings = Math.floor((views * videos * 4) / 1000 * 5);

  const formatNumber = (num: number) => {
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section className="py-24 relative bg-dark-surface">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Calculate Your Earnings
          </h2>
          <p className="text-white/60 text-lg">See how much you can make with Popli.</p>
        </div>
        
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
          
          <div className="space-y-12">
            {/* Views Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-white/80 font-medium text-lg">Views per video</label>
                <span className="text-2xl font-bold text-white">{formatNumber(views)}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="1000000" 
                step="1000"
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                className="w-full h-3 bg-dark rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>1K</span>
                <span>1M</span>
              </div>
            </div>

            {/* Videos Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-white/80 font-medium text-lg">Videos per week</label>
                <span className="text-2xl font-bold text-white">{videos}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="7" 
                step="1"
                value={videos}
                onChange={(e) => setVideos(Number(e.target.value))}
                className="w-full h-3 bg-dark rounded-lg appearance-none cursor-pointer accent-pink"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>1</span>
                <span>7</span>
              </div>
            </div>
            
            {/* Result Box */}
            <div className="mt-12 bg-dark/50 border border-white/10 rounded-2xl p-8 text-center shadow-lg">
              <p className="text-white/70 mb-2 font-medium">Your estimated monthly earnings:</p>
              <div className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
                ₹{monthlyEarnings.toLocaleString()}
              </div>
              <p className="text-sm text-white/80 bg-white/10 inline-block px-4 py-2 rounded-full font-mono">
                {formatNumber(views)} views × {videos} videos/week = ₹{monthlyEarnings.toLocaleString()}/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsCalculator;
