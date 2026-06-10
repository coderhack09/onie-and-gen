"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";
import { siteConfig } from '@/content/site';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

export function LoveStory() {
  return (
    <div className="min-h-screen bg-motif-cream overflow-x-hidden">


      <div className="text-center text-motif-medium z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <h1
           className="lighten-regular text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight"
           style={{ fontFamily: "var(--font-playlist-script), cursive", color: 'var(--color-motif-deep)' }}
          >
          Our Love Story
          </h1>

        <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight text-motif-medium mb-1`}>
        “11 Years of Love, Now Forever”
        </p>
      </div>

      {/* SECTION 1: Top - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="From Friends to Lovers"
        imageSrc="/mobile-background/couple (2).webp"
        text={
          <>
            <p className="mb-4">
            From classmates and friends to BF & GF for 11 years… now we say “I Do”! We first met sa PLV—same school pero different courses. From being classmates and friends, Mark couldn’t help but notice Cristie—especially her beautiful smile. 😍 During usual class days, her reporting, and even exams, she was all he could focus on! 😅
            </p>
           
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (1).webp"
        // title="Became a Couple (2019)"
        text={
          <>
            <p>
            He even changed his course just to survive being around her. Hehehe. After graduation, we went on different paths and focused on our careers—Cristie working abroad and Mark staying in the country—but fate kept us connected.
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (3).webp"
        // title="The Proposal (2025)"
        text={
          <>
            <p>
            In 2014, Mark finally approached Cristie—reconnecting as friends first, then slowly courting her. After one year of patience and persistence, on April 27, 2015, they officially became boyfriend and girlfriend. ❤️
            </p>
           
          </>
        }
      />
            {/* SECTION 4: Middle - Light */}
            <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (4).webp"
        // title="Became a Couple (2019)"
        text={
          <>
            <p>
            For 11 years, we navigated calls across time zones, nights apart, and countless sacrifices—but our love only grew stronger. Every challenge tested our patience, every distance deepened our trust, and every moment apart made us value each other even more.
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (5).webp"
        // title="The Proposal (2025)"
        text={
          <>
            <p>
            Through all the ups and downs, laughter and tears, we supported each other, celebrated the happy moments, and held each other through the saddest ones. And now, after 11 wonderful years together, we can’t wait to celebrate our marriage and the next chapter of our journey with you! 🎉💖
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