import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Check, X, Download, DollarSign, Gift, Trophy, Star } from 'lucide-react';
import EarnRoadmapSection from '../components/EarnRoadmapSection';
import RadialFeaturesSection from '../components/RadialFeaturesSection';
import { ANDROID_APK_URL } from '../constants';

const fourWaysToEarn = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'VIEW EARNINGS',
    points: [
      '₹5 per 1,000 genuine views',
      'Automatic. Every video. Forever.',
      'No minimum views to start.'
    ]
  },
  {
    icon: <Gift className="w-7 h-7" />,
    title: 'VIRTUAL GIFTING',
    points: [
      'Fans send virtual gifts while watching',
      'You convert gifts to real money',
      'Fans show love. You earn instantly.'
    ]
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: 'WEEKLY CHALLENGES',
    points: [
      'Brand-sponsored competitions',
      'Win ₹1,000 to ₹50,000 per challenge',
      'Best dance/cooking/comedy video wins'
    ]
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'CREATOR SUBSCRIPTIONS',
    points: [
      'Fans pay monthly for exclusive content',
      'Recurring income every single month',
      'Build your loyal paying fanbase'
    ]
  }
];

const comparisonData = [
  { feature: 'Earn from Day 1', ig: false, yt: false, popli: true },
  { feature: 'Followers needed', ig: '10,000', yt: '1,000', popli: '0' },
  { feature: 'Views needed', ig: '-', yt: '4000hrs', popli: '0' },
  { feature: 'Guaranteed rate', ig: false, yt: false, popli: '₹5/1K' },
  { feature: 'Works on 3G', ig: 'Limited', yt: 'Limited', popli: true },
  { feature: 'Hindi interface', ig: false, yt: false, popli: true },
  { feature: 'Tier 2/3 focus', ig: false, yt: false, popli: true },
];

const appFeatures = [
  {
    title: 'Earnings Dashboard',
    description: 'See your ₹ growing in real-time as your views increase.',
    icon: 'LineChart'
  },
  {
    title: 'View Breakdown',
    description: 'Clear analytics showing valid vs rejected views.',
    icon: 'PieChart'
  },
  {
    title: 'KYC & Withdrawal',
    description: 'Instantly withdraw your earnings directly via UPI or Bank.',
    icon: 'Landmark'
  },
  {
    title: 'Creator Levels',
    description: 'Progress from Starter to Elite and unlock higher perks.',
    icon: 'Award'
  },
  {
    title: 'Fraud Protection',
    description: 'Advanced algorithms ensure only real, genuine views count.',
    icon: 'ShieldCheck'
  },
  {
    title: '10-Second Validation',
    description: 'Views are validated and counted after 10 seconds of watch time.',
    icon: 'Clock'
  },
  {
    title: 'Hourly Updates',
    description: 'Earnings and view counts are refreshed every hour.',
    icon: 'RefreshCw'
  },
  {
    title: 'Infinite Reels',
    description: 'Endless stream of high-quality, entertaining content curated just for you.',
    icon: 'Video'
  },
  {
    title: 'Nearby Feed',
    description: 'Discover talented creators and trending videos from your own city.',
    icon: 'MapPin'
  },
  {
    title: 'Creator Profile',
    description: 'Build your brand with customizable profiles, analytics, and portfolios.',
    icon: 'UserCircle'
  },
  {
    title: 'Trending Videos',
    description: 'Stay updated with what\'s going viral across the nation.',
    icon: 'TrendingUp'
  }
];

const Features: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative bg-dark"
    >
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-24 mt-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight text-white"
          >
            Everything You Need to <span className="text-gradient">Create and Earn</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Built specifically for Indian creators.<br />
            Works on 3G. Works on basic phones.<br />
            Works in Hindi.
          </motion.p>
        </div>

        <div className="mb-32">
          <EarnRoadmapSection ways={fourWaysToEarn} />
        </div>

        <div className="mb-32 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Why Creators Choose Popli</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50" />
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-dark-surface/90">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/20">
                    <th className="p-6 text-white/60 font-medium uppercase tracking-wider">Feature</th>
                    <th className="p-6 text-center text-white/60 font-medium uppercase tracking-wider">Instagram</th>
                    <th className="p-6 text-center text-white/60 font-medium uppercase tracking-wider">YouTube</th>
                    <th className="p-6 text-center text-primary font-bold uppercase tracking-wider text-xl">POPLI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-6 text-white font-medium text-lg">{row.feature}</td>

                      <td className="p-6 text-center">
                        {row.ig === true ? <Check className="mx-auto text-green-500" /> :
                          row.ig === false ? <X className="mx-auto text-red-500" /> :
                            <span className="text-white/60 font-mono">{row.ig}</span>}
                      </td>

                      <td className="p-6 text-center bg-white/[0.01]">
                        {row.yt === true ? <Check className="mx-auto text-green-500" /> :
                          row.yt === false ? <X className="mx-auto text-red-500" /> :
                            <span className="text-white/60 font-mono">{row.yt}</span>}
                      </td>

                      <td className="p-6 text-center bg-primary/5">
                        {row.popli === true ? <Check className="mx-auto text-green-500" size={28} /> :
                          row.popli === false ? <X className="mx-auto text-red-500" /> :
                            <span className="text-primary font-bold text-xl">{row.popli}</span>}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <RadialFeaturesSection features={appFeatures} />
        </div>

        <div className="text-center pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href={ANDROID_APK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="premium-button text-xl px-12 py-5 inline-flex items-center justify-center gap-3 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              <Download className="w-7 h-7 text-[#fbc343]" />
              Download for Android
            </a>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Features;