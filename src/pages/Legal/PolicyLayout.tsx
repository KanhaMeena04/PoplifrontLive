import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared layout and content model for Popli legal / policy documents.
 *
 * Content blocks are plain typed data (never raw HTML), so document text is
 * rendered safely by React. Inline emphasis is expressed with a lightweight
 * `**bold**` marker that is parsed into <strong> elements at render time.
 */

export type PolicyListItem = {
  text: string;
  children?: string[];
};

export type ContactLine = {
  label: string;
  value: string;
  href?: string;
};

export type PolicyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'nestedOl'; items: PolicyListItem[] }
  | { type: 'notice'; text: string }
  | { type: 'meta'; lines: string[] }
  | { type: 'contact'; title: string; lines: ContactLine[] };

export type PolicyLayoutProps = {
  /** Document title, rendered as the page <h1>. */
  title: string;
  /** Optional shorter title used for the browser tab / meta title. */
  pageTitle?: string;
  /** Author / attribution line shown under the title (from the source document). */
  byline?: string;
  /** Meta description for search engines, taken from the document's own text. */
  metaDescription: string;
  /** Canonical path of the current document, used to omit it from the footer nav. */
  currentPath: string;
  blocks: PolicyBlock[];
};

/** Canonical links to every policy document. Shared by the landing page and footer navs. */
export const POLICY_LINKS: Array<{ label: string; path: string }> = [
  { label: 'Community Guidelines', path: '/community-guidelines' },
  { label: 'Child Safety Policy', path: '/child-safety-policy' },
  { label: 'Abuse Prevention Policy', path: '/abuse-prevention-policy' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms and Conditions', path: '/terms' }
];

/**
 * Parses the lightweight `**bold**` marker into React nodes.
 * Plain text stays plain; no HTML is ever injected.
 */
export const renderInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="text-white font-semibold">
        {part}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
};

const renderBlock = (block: PolicyBlock, index: number): React.ReactNode => {
  switch (block.type) {
    case 'p':
      return (
        <p key={index} className="mb-5 text-base md:text-lg leading-relaxed">
          {renderInline(block.text)}
        </p>
      );

    case 'h2':
      return (
        <h2
          key={index}
          className="mt-12 first:mt-0 mb-4 text-2xl md:text-3xl font-display font-semibold text-white"
        >
          {renderInline(block.text)}
        </h2>
      );

    case 'h3':
      return (
        <h3
          key={index}
          className="mt-8 mb-3 text-xl md:text-2xl font-display font-semibold text-white/90"
        >
          {renderInline(block.text)}
        </h3>
      );

    case 'ul':
      return (
        <ul
          key={index}
          className="mb-5 list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed marker:text-primary"
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol
          key={index}
          className="mb-5 list-decimal pl-6 space-y-3 text-base md:text-lg leading-relaxed marker:text-primary"
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ol>
      );

    case 'nestedOl':
      return (
        <ol
          key={index}
          className="mb-5 list-decimal pl-6 space-y-4 text-base md:text-lg leading-relaxed marker:text-primary"
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderInline(item.text)}
              {item.children && item.children.length > 0 && (
                <ul className="mt-3 list-disc pl-6 space-y-2 text-sm md:text-base text-white/70 marker:text-primary">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>{renderInline(child)}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      );

    case 'notice':
      return (
        <aside
          key={index}
          aria-label="Important notice"
          className="my-6 rounded-r-xl border-l-4 border-primary bg-primary/5 px-5 py-4"
        >
          <p className="text-base md:text-lg leading-relaxed text-white/90">
            {renderInline(block.text)}
          </p>
        </aside>
      );

    case 'meta':
      return (
        <div
          key={index}
          className="mt-10 rounded-2xl border border-glass-border bg-dark-surface/60 px-6 py-5 space-y-2 text-sm md:text-base text-white/70"
        >
          {block.lines.map((line, lineIndex) => (
            <p key={lineIndex} className="leading-relaxed">
              {renderInline(line)}
            </p>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div
          key={index}
          className="my-6 rounded-2xl border border-glass-border bg-dark-surface/70 px-6 py-5"
        >
          <p className="text-lg font-display font-semibold text-white mb-4">
            {renderInline(block.title)}
          </p>
          <dl className="space-y-3">
            {block.lines.map((line) => (
              <div
                key={line.label}
                className="flex flex-col sm:flex-row sm:items-start sm:gap-3"
              >
                <dt className="sm:w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/50 pt-0.5">
                  {line.label}:
                </dt>
                <dd className="text-white/90 break-words leading-relaxed">
                  {line.href ? (
                    <a
                      href={line.href}
                      className="text-primary hover:text-white transition-colors"
                    >
                      {line.value}
                    </a>
                  ) : (
                    line.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      );

    default:
      return null;
  }
};

const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  title,
  pageTitle,
  byline,
  metaDescription,
  currentPath,
  blocks
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative"
    >
      <Helmet>
        <title>{pageTitle ?? title} | Popli</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Background Gradient */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <nav aria-label="Legal policies" className="mb-8">
          <Link
            to="/legal"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>All policies</span>
          </Link>
        </nav>

        <header className="mb-10 border-b border-glass-border pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
          {byline && (
            <p className="mt-4 text-base md:text-lg text-white/60 font-medium">
              {byline}
            </p>
          )}
        </header>

        <article className="text-white/80 font-sans">{blocks.map(renderBlock)}</article>

        <nav aria-label="Policy documents" className="mt-14 border-t border-glass-border pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
            All Policies
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POLICY_LINKS.filter((link) => link.path !== currentPath).map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block rounded-xl border border-glass-border bg-dark-surface/60 px-4 py-3 text-sm md:text-base text-white/70 hover:text-white hover:border-primary/40 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default PolicyLayout;
