import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Play,
  RefreshCw,
  Smartphone,
} from 'lucide-react';
import {
  ANDROID_APK_URL,
  API_BASE_URL,
  PLAY_STORE_URL,
  PUBLIC_PRIVACY_VALUES,
  REEL_ID_PATTERN,
  buildAndroidIntentLink,
} from '../constants';

interface ReelCreator {
  id?: string;
  name?: string | null;
  username?: string | null;
  avatar?: string | null;
  isVerified?: boolean;
}

interface ReelData {
  id: string;
  mediaUrl?: string | null;
  thumbnailUrl?: string | null;
  mediaType?: string | null;
  description?: string | null;
  musicName?: string | null;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  privacy?: string | null;
  ageRestricted?: boolean;
  copyrightFlag?: boolean;
  createdAt?: string;
  muxPlaybackId?: string | null;
  creator?: ReelCreator | null;
}

type PageStatus = 'loading' | 'ready' | 'invalid' | 'missing' | 'error';

function parseCloudflareSource(reel: ReelData): { account: string; playbackId: string } | null {
  const candidates = [reel.mediaUrl, reel.thumbnailUrl].filter(
    (value): value is string => typeof value === 'string' && value.length > 0,
  );
  for (const candidate of candidates) {
    const match = candidate.match(/customer-([a-z0-9]+)\.cloudflarestream\.com\/([a-f0-9]{32})/i);
    if (match) {
      return { account: match[1], playbackId: match[2] };
    }
  }
  if (reel.muxPlaybackId && /^[a-f0-9]{32}$/i.test(reel.muxPlaybackId)) {
    return { account: 'nrjk258tgvwut2jn', playbackId: reel.muxPlaybackId };
  }
  return null;
}

function formatCount(value?: number): string {
  if (!value || value <= 0) return '0';
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

function creatorLabelOf(reel: ReelData): string {
  return (
    (reel.creator?.name || '').trim() ||
    (reel.creator?.username ? `@${reel.creator.username}` : 'A Popli creator')
  );
}

const ReelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<PageStatus>('loading');
  const [reel, setReel] = useState<ReelData | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reelId = typeof id === 'string' ? id.trim() : '';

  useEffect(() => {
    if (!REEL_ID_PATTERN.test(reelId)) {
      setStatus('invalid');
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    setStatus('loading');

    fetch(`${API_BASE_URL}/reels/${encodeURIComponent(reelId)}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 404) {
          setStatus('missing');
          return null;
        }
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        return response.json();
      })
      .then((data: ReelData | null) => {
        if (!data) return;
        const isPublic =
          PUBLIC_PRIVACY_VALUES.includes(data.privacy || '') &&
          !data.ageRestricted &&
          !data.copyrightFlag;
        if (!isPublic || !data.id) {
          setStatus('missing');
          return;
        }
        setReel(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'))
      .finally(() => clearTimeout(timer));

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [reelId, attempt]);

  useEffect(() => {
    if (status === 'ready' && reel) {
      document.title = `${creatorLabelOf(reel)} on Popli`;
    }
  }, [status, reel]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  const renderMedia = () => {
    if (!reel) return null;
    const thumbnail =
      typeof reel.thumbnailUrl === 'string' && reel.thumbnailUrl.startsWith('https')
        ? reel.thumbnailUrl
        : undefined;

    if ((reel.mediaType || 'VIDEO') === 'PHOTO') {
      if (thumbnail || (reel.mediaUrl || '').startsWith('https')) {
        return (
          <img
            src={thumbnail || (reel.mediaUrl as string)}
            alt={reel.description || 'Popli post'}
            className="w-full h-full object-contain bg-black"
          />
        );
      }
      return null;
    }

    const cloudflare = parseCloudflareSource(reel);
    if (cloudflare) {
      return (
        <iframe
          src={`https://customer-${cloudflare.account}.cloudflarestream.com/${cloudflare.playbackId}/iframe?muted=true&autoplay=true&controls=true&loop=true&poster=${encodeURIComponent(thumbnail || '')}`}
          title="Popli reel player"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full border-0 bg-black"
        />
      );
    }

    if ((reel.mediaUrl || '').startsWith('https')) {
      return (
        <video
          src={reel.mediaUrl as string}
          poster={thumbnail}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain bg-black"
        />
      );
    }

    if (thumbnail) {
      return (
        <img
          src={thumbnail}
          alt={reel.description || 'Popli reel'}
          className="w-full h-full object-contain bg-black"
        />
      );
    }

    return null;
  };

  const renderMessage = (title: string, message: string, action?: React.ReactNode) => (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-dark">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full p-10 md:p-12 rounded-[2.5rem] border border-glass-border text-center relative z-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-surface-2 border border-glass-border mb-6">
          <AlertTriangle className="text-primary" size={28} />
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">{title}</h1>
        <p className="text-white/60 leading-relaxed mb-8">{message}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-sm font-medium transition-all"
          >
            <ArrowLeft size={16} /> Back to Website
          </a>
          {action}
        </div>
      </motion.div>
    </div>
  );

  if (status === 'invalid') {
    return renderMessage('Invalid link', 'This reel link is not valid. Please check the link and try again.');
  }

  if (status === 'missing') {
    return renderMessage(
      'This reel is unavailable',
      'This reel may have been deleted, made private, or the link may be broken.',
    );
  }

  if (status === 'error') {
    return renderMessage(
      "Couldn't load this reel",
      'Something went wrong while fetching the reel. Please check your connection and try again.',
      <button
        onClick={retry}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 text-sm font-semibold transition-all"
      >
        <RefreshCw size={16} /> Retry
      </button>,
    );
  }

  if (status === 'loading' || !reel) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-white/50 text-sm tracking-wide">Loading reel…</p>
        </div>
      </div>
    );
  }

  const creatorLabel = creatorLabelOf(reel);
  const handle = reel.creator?.username ? `@${reel.creator.username}` : '';

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden bg-dark">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-3xl rounded-[2rem] border border-glass-border overflow-hidden relative z-10"
      >
        <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-0">
          <div className="relative bg-black md:aspect-[9/16] max-h-[70vh] min-h-[320px] flex items-center justify-center overflow-hidden">
            {renderMedia() || (
              <div className="flex flex-col items-center gap-3 text-white/40 p-6 text-center">
                <Play size={40} />
                <span className="text-sm">Preview unavailable</span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              {reel.creator?.avatar ? (
                <img
                  src={reel.creator.avatar}
                  alt={creatorLabel}
                  className="w-11 h-11 rounded-full object-cover border border-glass-border"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-dark-surface-2 border border-glass-border flex items-center justify-center text-primary font-bold">
                  {creatorLabel.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold truncate">{creatorLabel}</span>
                  {reel.creator?.isVerified && <BadgeCheck className="text-primary shrink-0" size={16} />}
                </div>
                {handle && <p className="text-white/50 text-sm truncate">{handle}</p>}
              </div>
            </div>

            {reel.description && (
              <p className="text-white/85 leading-relaxed mb-5 whitespace-pre-wrap break-words">
                {reel.description}
              </p>
            )}

            <div className="flex items-center gap-5 text-white/50 text-sm mb-6">
              <span className="inline-flex items-center gap-1.5">
                <Eye size={16} /> {formatCount(reel.viewsCount)} views
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart size={16} /> {formatCount(reel.likesCount)} likes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle size={16} /> {formatCount(reel.commentsCount)} comments
              </span>
            </div>

            <div className="mt-auto space-y-3">
              <a
                href={buildAndroidIntentLink(reel.id)}
                className="premium-button w-full inline-flex items-center justify-center gap-2"
              >
                <Smartphone size={18} />
                <span>Open in Popli App</span>
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={ANDROID_APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-secondary flex-1 inline-flex items-center justify-center gap-2 !rounded-2xl text-sm"
                >
                  <Download size={16} />
                  <span>Download APK</span>
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-secondary flex-1 inline-flex items-center justify-center gap-2 !rounded-2xl text-sm"
                >
                  <Play size={16} />
                  <span>Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReelPage;
