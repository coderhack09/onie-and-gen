"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from '@/content/site';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
})

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

export function LoveStory() {
  return (
    <div className="min-h-screen bg-motif-cream overflow-x-hidden">

      <div className="text-center z-0 relative px-6 pt-14 sm:pt-18 md:pt-20 pb-4">
        {/* Eyebrow label */}
        <p
          className={`${cinzel.className} text-[0.55rem] sm:text-[0.6rem] tracking-[0.45em] uppercase mb-4 sm:mb-5`}
          style={{ color: 'var(--color-motif-medium)', letterSpacing: '0.42em' }}
        >
          Our Story
        </p>

        {/* Main title — Great Vibes script */}
        <h1
          className="text-[34px] sm:text-[42px] md:text-[52px] lg:text-[60px] xl:text-[68px] leading-[1.15] mb-3 sm:mb-4"
          style={{
            fontFamily: "var(--font-brittany), cursive",
            color: 'var(--color-motif-deep)',
            textShadow: '0 2px 12px rgba(166,132,106,0.22), 0 1px 0 rgba(166,132,106,0.08)',
          }}
        >
          A Love Story Anchored in Grace
        </h1>

        {/* Thin rule */}
        <div className="w-16 sm:w-20 h-[1px] bg-motif-silver opacity-45 mx-auto mb-4 sm:mb-5" />

        {/* Sub-tagline — Cormorant italic */}
        <p
          className={`${cormorant.className} text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] font-light leading-relaxed mb-2`}
          style={{ color: 'var(--color-motif-medium)', fontStyle: 'italic', letterSpacing: '0.03em' }}
        >
          A journey of faith, healing, and a love shaped by God&apos;s perfect timing.
        </p>
      </div>

      {/* SECTION 1: Top - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="WHEN THEIR PATHS FIRST CROSSED"
        imageSrc="/mobile-background/couple (19).png"
        text={
          <>
            <p className="mb-4">
            Their story began at a time when life felt uncertain.
            </p>
            <p>
            She was not whole, carrying pain, frustration, and a quiet distance from the Lord. Yet in that very season, she met Onie.
            </p>
            <p>
            A year older, and single at the time, Onie chose to love Gen fully. Not just the good parts, but even the broken pieces. He embraced her for who she was, and for everything she carried.
            </p>
            <p>
            And in that space of acceptance, something beautiful began to grow.
            </p>
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (8).png"
        title="A LOVE TRANSFORMED BY FAITH"
        text={
          <>
            <p className="mb-4">
            Their relationship did not begin in perfect conditions. It was shaped in the middle of real-life struggles, where love had to be patient, understanding, and forgiving.
            </p>
            <p>
            But something beautiful unfolded along the way, Onie came to know the Lord. And together, they made a decision that would define their relationship which is to honor God, and to build a love that reflects His will.
            </p>
            <p>
            It wasn’t perfect.
            <br />
            But it was real.
            <br />
            And it was surrendered.
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (10).png"
        title="THE WAITING SEASON & THE TEST OF FAITH"
        text={
          <>
            <p className="mb-4">
            In 2019, they stepped out in faith and began a long and difficult journey toward freedom and restoration. Delays, waiting, and painful seasons tested them deeply, but through every moment, God remained faithful.
            </p>
            <p>
            For her, this season was deeply painful. It meant revisiting the past, memories that reopened wounds and brought moments of heaviness and struggle.
            </p>
            <p>
            But even there… God was present.
            </p>
            <p>
            He was gently teaching her to let go, to trust, and to place everything in His hands.
            </p>
          </>
        }
      />
            {/* SECTION 4: Middle - Light */}
            <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (25).png"
        title="HELD TOGETHER BY GRACE"
        text={
          <>
            <p className="mb-4">
            Through every challenge, they held on, not just to each other, but to God.
            </p>
            <p>
            They prayed together.
            <br />
            They waited together.
            <br />
            They trusted God together.
            </p>
            <p>
            And through every season, it was not their strength that sustained them, but His grace.
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (6).png"
        title="A PROMISE FULFILLED IN GOD'S TIME"
        text={
          <>
            <p className="mb-4">
            Now, after 15 years of shared joys and trials, they stand not just as two people in love…
            </p>
            <p>
            …but as a testimony.
            </p>
            <p>
            A testimony of faith.
Of healing.
Of a love that endured, surrendered, and was made whole in God’s perfect time.
            </p>
            <p>
            Because when love is placed in God’s hands,
every delay has a purpose…
and every promise is fulfilled according to His will.
            </p>
          </>
        }
      />
      {/* Footer Decoration */}
      <div className="bg-motif-cream pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-motif-deep z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-motif-cream bg-motif-deep rounded-sm border border-motif-deep transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:text-motif-cream hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-motif-soft opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>
    </div>
  );
}
