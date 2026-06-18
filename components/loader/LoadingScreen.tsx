'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSiteConfig } from '@/hooks/use-site-config';
import Image from 'next/image';


interface LoadingScreenProps {
  onComplete: () => void;
}

const DATE_BOX_COUNT = 3;
const MAIN_BW_IMAGE = '/mobile-background/couple (17).png';
const DESKTOP_BW_IMAGE = '/frontboxes/desktop.png';
const STAGGER_DELAY_MS = 4000; // Each box appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = DATE_BOX_COUNT * STAGGER_DELAY_MS + 3000;

// Motif RGB values for layered glass effects (matches globals.css)
const motifRgb = {
  deep: '140, 104, 78',
  medium: '160, 158, 133',
  accent: '185, 143, 101',
  cream: '255, 255, 255',
  silver: '216, 198, 174',
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const siteConfig = useSiteConfig();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

    // Live countdown: days, hours, minutes until wedding
  const countdown = useMemo(() => {
    const weddingDate = new Date(siteConfig.wedding.date);
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  // Wedding date derived from siteConfig.wedding.date
  const debutDateObj = new Date(siteConfig.wedding.date);
  const debutMonthName = debutDateObj
    .toLocaleString('default', { month: 'short' })
    .toUpperCase(); // e.g. "MAY"
  const debutDay = String(debutDateObj.getDate()).padStart(2, '0'); // e.g. "09"
  const debutYear = String(debutDateObj.getFullYear()); // e.g. "2026"

  const countdownNumbers = [debutMonthName, debutDay, debutYear]; // e.g. May, 09, 2026
  const countdownLabels = ['Month', 'Day', 'Year']; // should return Month, Day, Year

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    Array.from({ length: DATE_BOX_COUNT }).forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const productionCredit = '';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {/* Mobile background */}
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          priority
        />
        {/* Desktop background (md and above) */}
        <Image
          src={DESKTOP_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay — darkens top & bottom so text is legible */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(78, 59, 49, 0.75) 0%,
              rgba(78, 59, 49, 0.35) 18%,
              transparent 35%,
              transparent 62%,
              rgba(78, 59, 49, 0.45) 80%,
              rgba(78, 59, 49, 0.80) 100%
            )`,
          }}
        />
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: headline + hashtag + countdown (readable over photo, no container) */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col items-center mb-4 sm:mb-5">
              <span
                style={{
                  fontFamily: 'var(--font-brittany)',
                  color: 'var(--color-motif-cream)',
                  fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
                  lineHeight: 1.1,
                  textShadow: '0 2px 18px rgba(0,0,0,0.55), 0 0 32px var(--color-motif-accent)',
                }}
              >
                Save the Date
              </span>
              <span
                className="text-center whitespace-nowrap mt-3"
                style={{
                  fontFamily: '"Cinzel", serif',
                  color: 'var(--color-motif-cream)',
                  fontSize: 'clamp(1.25rem, 5.5vw, 2rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                  opacity: 0.92,
                  fontWeight: 700,
                }}
              >
                {countdown.days} more days to go
              </span>
            </div>

          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[8vh]" />

        {/* Middle: Three frosted glass date boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-5 sm:py-7 flex-shrink-0 w-full max-w-4xl mx-auto">
          {Array.from({ length: DATE_BOX_COUNT }).map((_, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 w-full max-w-[42vw] sm:max-w-[190px] md:max-w-[220px] lg:max-w-[260px] aspect-[3/4] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] backdrop-blur-2xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(32px) scale(0.92)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  background: `linear-gradient(
                    155deg,
                    rgba(${motifRgb.deep}, 0.42) 0%,
                    rgba(${motifRgb.medium}, 0.2) 38%,
                    rgba(${motifRgb.silver}, 0.14) 62%,
                    rgba(${motifRgb.accent}, 0.32) 100%
                  )`,
                  border: `1.5px solid rgba(${motifRgb.cream}, 0.45)`,
                  boxShadow: isVisible
                    ? `0 28px 64px rgba(${motifRgb.deep}, 0.5),
                       0 10px 28px rgba(0, 0, 0, 0.28),
                       inset 0 2px 0 rgba(${motifRgb.cream}, 0.6),
                       inset 0 -3px 12px rgba(${motifRgb.deep}, 0.22),
                       0 0 0 1px rgba(${motifRgb.accent}, 0.2),
                       0 0 40px rgba(${motifRgb.accent}, 0.15)`
                    : 'none',
                }}
              >
                {/* Inner frosted panel */}
                <div
                  className="absolute inset-[6px] sm:inset-2 rounded-[1.25rem] sm:rounded-[1.5rem] pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      180deg,
                      rgba(${motifRgb.cream}, 0.14) 0%,
                      rgba(${motifRgb.silver}, 0.06) 50%,
                      rgba(${motifRgb.deep}, 0.1) 100%
                    )`,
                    border: `1px solid rgba(${motifRgb.cream}, 0.22)`,
                    boxShadow: `inset 0 1px 24px rgba(${motifRgb.cream}, 0.12)`,
                  }}
                />

                {/* Top light bloom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(
                      ellipse 90% 55% at 50% -5%,
                      rgba(${motifRgb.cream}, 0.35) 0%,
                      rgba(${motifRgb.accent}, 0.12) 40%,
                      transparent 72%
                    )`,
                  }}
                />

                {/* Bottom depth vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      to top,
                      rgba(${motifRgb.deep}, 0.35) 0%,
                      transparent 55%
                    )`,
                  }}
                />

                {/* Wedding date — centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 z-10">
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black select-none leading-none text-center"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: 'var(--color-motif-cream)',
                      textShadow: `0 2px 12px rgba(0,0,0,0.55), 0 0 28px rgba(${motifRgb.accent}, 0.35)`,
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <div
                    className="w-7 sm:w-9 h-px my-1.5 sm:my-2"
                    style={{
                      background: `linear-gradient(
                        90deg,
                        transparent,
                        rgba(${motifRgb.accent}, 0.9),
                        transparent
                      )`,
                    }}
                  />
                  <span
                    className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.28em] uppercase"
                    style={{
                      color: 'var(--color-motif-cream)',
                      opacity: 0.88,
                      textShadow: '0 1px 6px rgba(0,0,0,0.45)',
                    }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center w-full pt-3 pb-6 sm:pb-8 px-6 flex-shrink-0 gap-1">
          <p
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: '"Cinzel", serif',
              color: 'var(--color-motif-cream)',
              opacity: 0.7,
            }}
          >
            Almost ready for
          </p>
          <div
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--font-playlist-script)',
              color: 'var(--color-motif-cream)',
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              fontWeight: 400,
            }}
          >
            {coupleNames}
          </div>
          {productionCredit && (
            <p
              className="text-[10px] font-sans tracking-wider"
              style={{ color: 'var(--color-motif-cream)', 
                // opacity: 0.7 
              }}
            >
              {productionCredit}
            </p>
          )}

          {/* Divider */}
          <div
            className="w-16 h-px my-2"
            style={{ backgroundColor: 'var(--color-motif-cream)', opacity: 0.3 }}
          />

          {/* Preparing message + progress bar */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{
              fontFamily: '"Cinzel", serif',
              color: 'var(--color-motif-cream)',
              // opacity: 0.65,
            }}
          >
            Crafting your invitation experience
          </p>
          <div className="w-full max-w-[200px] sm:max-w-xs mx-auto">
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{
                  width: `${progress}%`,
                  backgroundColor: 'var(--color-motif-accent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};