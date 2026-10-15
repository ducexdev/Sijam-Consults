'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '9/16';
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title = 'Video presentation',
  autoPlay = false,
  loop = false,
  muted = false,
  className,
  aspectRatio = '16/9',
}) => {
  const ytId = getYouTubeId(src);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [hasError, setHasError] = useState(false);

  if (ytId) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-black shadow-2xl',
          aspectRatio === '16/9' && 'aspect-video',
          aspectRatio === '4/3' && 'aspect-[4/3]',
          aspectRatio === '9/16' && 'aspect-[9/16]',
          className
        )}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`}
          title={title}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-black group select-none shadow-xl',
        aspectRatio === '16/9' && 'aspect-video',
        aspectRatio === '4/3' && 'aspect-[4/3]',
        aspectRatio === '9/16' && 'aspect-[9/16]',
        className
      )}
    >
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#1A1040] text-white">
          {poster && (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-25"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <AlertCircle className="w-10 h-10 text-[#F45A2A] mb-2" />
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-xs text-slate-300 mt-1 max-w-sm">
              Video media playback is currently unavailable. Contact our Kaduna office or WhatsApp team for the direct demonstration stream.
            </p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            onError={() => setHasError(true)}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
            aria-label={title}
          />

          {/* ── PAUSED STATE: always-visible play button + video badge ── */}
          {!isPlaying && (
            <>
              {/* Subtle dark scrim so play button pops on any thumbnail */}
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />

              {/* VIDEO TESTIMONIAL badge — top left — removes all ambiguity */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Video Testimonial
              </div>

              {/* Glowing central play button — always visible, not gated on isLoaded */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 m-auto w-18 h-18 w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-[#4DA5EC] to-[#257CFF] text-white flex items-center justify-center shadow-[0_0_45px_rgba(37,124,255,0.75)] hover:shadow-[0_0_60px_rgba(37,124,255,0.95)] transition-all duration-300 hover:scale-110 cursor-pointer z-20 border-2 border-white/30"
              >
                <Play className="w-8 h-8 ml-1 fill-white drop-shadow-lg" />
              </button>

              {/* Mute toggle — bottom right */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer border border-white/20"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </>
          )}

          {/* ── PLAYING STATE: hover-to-reveal controls ── */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Pause video"
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:bg-black/80 transition cursor-pointer border border-white/20"
                >
                  <Pause className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="w-9 h-9 rounded-full bg-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
