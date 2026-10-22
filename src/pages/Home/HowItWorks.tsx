import React from 'react';
import { motion } from 'framer-motion';

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-primary">
    <path d="M12 16V4m0 0L8 8m4-4l4 4" />
    <path d="M3 16v1a3 3 0 003 3h12a3 3 0 003-3v-1" />
  </svg>
);

const ViewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-primary">
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EarnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-primary">
    <path d="M9 8h6M9 12h6M9 16h4" />
    <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path d="M15 8a2 2 0 00-2-2h-2v4h2a2 2 0 002-2z" />
  </svg>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <UploadIcon />,
      title: "UPLOAD",
      description: "Create a short video (15-60s).\nUpload on Popli app. Free. Instant."
    },
    {
      id: 2,
      icon: <ViewsIcon />,
      title: "GET VIEWS",
      description: "People discover your video.\nEvery 10s genuine view counts."
    },
    {
      id: 3,
      icon: <EarnIcon />,
      title: "EARN MONEY",
      description: "₹5 per 1,000 views credited hourly.\nWithdraw via UPI anytime."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 hiw-card-marquee">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-white/60 text-lg">Three simple steps to start earning.</p>
        </div>

        <div className="relative overflow-hidden w-[100vw] left-1/2 -ml-[50vw] [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)] py-10">
          <motion.div
            className="flex items-center gap-8 pl-8 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8">
                {steps.map((step) => (
                  <div key={`${step.id}-${i}`} className="relative group min-w-[350px]">
                    <div className="glass-card p-10 h-[320px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                        {step.icon}
                      </div>
                      
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-dark-surface border border-white/10 shadow-lg flex items-center justify-center font-mono text-sm text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        0{step.id}
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-white/60 whitespace-pre-line leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;