import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, FileText, Lock, Scale, Shield, ShieldAlert } from 'lucide-react';

type PolicyEntry = {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const policies: PolicyEntry[] = [
  {
    title: 'Community Guidelines',
    description:
      'Rules for content and conduct on Popli, covering child safety, respect, prohibited activity, reporting, and appeals.',
    path: '/community-guidelines',
    icon: FileText
  },
  {
    title: 'Child Safety Policy',
    description:
      'Child Sexual Abuse and Exploitation (CSAE) reporting policy: how to report, what to include, and how reports are handled.',
    path: '/child-safety-policy',
    icon: ShieldAlert
  },
  {
    title: 'Abuse Prevention Policy',
    description:
      'Protecting against exploitative content: our policies, people, practices, product controls, and partnerships.',
    path: '/abuse-prevention-policy',
    icon: Shield
  },
  {
    title: 'Privacy Policy',
    description:
      'How Popli Technologies Private Limited collects, uses, stores, shares, and protects your information.',
    path: '/privacy-policy',
    icon: Lock
  },
  {
    title: 'Terms and Conditions',
    description:
      'The terms that govern access to and use of the Popli platform, including eligibility, payments, and disputes.',
    path: '/terms',
    icon: Scale
  },
  {
    title: 'Cookie Policy',
    description: 'Our notice on cookies and related data practices.',
    path: '/cookies',
    icon: FileText
  }
];

const Legal: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative"
    >
      <Helmet>
        <title>Legal | Popli</title>
        <meta
          name="description"
          content="Popli legal policies and terms: community guidelines, child safety, abuse prevention, privacy policy, and terms and conditions."
        />
      </Helmet>

      {/* Background Gradient */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <header className="mb-12 border-b border-glass-border pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Legal</h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
            Policies, terms, and guidelines for the Popli platform. Choose a document below to read it
            in full.
          </p>
        </header>

        <nav aria-label="Legal documents">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <li key={policy.path}>
                  <Link
                    to={policy.path}
                    className="group flex h-full flex-col rounded-2xl border border-glass-border bg-dark-surface/70 p-6 transition-colors duration-300 hover:border-primary/40"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-dark-surface-2 text-primary">
                        <Icon size={20} />
                      </span>
                      <h2 className="text-lg md:text-xl font-display font-semibold text-white">
                        {policy.title}
                      </h2>
                    </div>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed flex-grow">
                      {policy.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                      <span>Read policy</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default Legal;
