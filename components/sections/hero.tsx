"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

// Wedding palette: deep brown, medium brown, sage-gold, cream, terracotta
// --champagne-gold: #D6BFA3;
// --soft-beige: #F5EFE6;
// --warm-beige: #E8DCCB;
// --soft-brown: #8B6F5A;
// --deep-brown: #4E3B31;
// --champagne-light: #F2E4D3;

const palette = {
  deepBrown: "#4E3B31",   // primary text, strong accents
  mediumBrown: "#8B6F5A", // secondary text, borders
  sageGold: "#A2976A",   // subtle accents, dividers
  cream: "#F5EFE6", // background, soft surfaces
  terracotta: "#8F553D", // CTAs, highlights
  champagneGold: "#D6BFA3",
  champagneLight: "#F2E4D3",
} as const

// Corner florals tinted to match deep brown
const DECO_FILTER = "brightness(0) saturate(100%) invert(18%) sepia(35%) saturate(1200%) hue-rotate(15deg) brightness(92%) contrast(88%)"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  const ceremonyDay = siteConfig.ceremony.day ?? "Saturday"
  const ceremonyTime = siteConfig.ceremony.time
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyVenue = siteConfig.ceremony.venue
  const groomName = siteConfig.couple.groomNickname ?? siteConfig.couple.groom
  const brideName = siteConfig.couple.brideNickname ?? siteConfig.couple.bride

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: palette.cream }}
    >
      {/* Layered background: soft gradient + subtle texture feel */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background: `linear-gradient(165deg, ${palette.cream} 0%, ${palette.sageGold}18 40%, ${palette.mediumBrown}08 70%, ${palette.deepBrown}06 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${palette.terracotta} 0%, transparent 60%)` }}
        />
      </div>

      {/* Date watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(5.5rem,18vw,12rem)] font-extralight tracking-[0.25em] opacity-[0.07]"
          style={{ fontFamily: '"Cinzel", serif', color: palette.deepBrown }}
        >
         
        </span>
      </div>

      {/* Corner floral decoration */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleX(-1)", filter: DECO_FILTER }}
          priority={false}
        />
      </div>

      <div className="relative z-10 w-full container mx-auto px-5 sm:px-8 md:px-10 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 pb-20 sm:pb-24">
        <div
          className={`w-full max-w-xl text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Invitation line — refined copy */}
          <p
            className={`${cinzel.className} text-sm sm:text-base uppercase tracking-[0.28em] sm:tracking-[0.32em] font-light`}
            style={{ color: palette.deepBrown }}
          >
            WITH GRATEFUL HEARTS, TOGETHER WITH OUR FAMILIES, WE WARMLY INVITE YOU  TO CELEBRATE WITH US AS WE SAY “I DO”
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8" aria-hidden>
            <span
              className="h-px w-12 sm:w-16 rounded-full"
              style={{ backgroundColor: palette.sageGold }}
            />
            <span
              className="text-[0.7rem] sm:text-[0.8rem] tracking-[0.38em] uppercase"
              style={{ color: palette.mediumBrown }}
            >
              at the celebration of a love so dearly cherished
            </span>
            <span
              className="h-px w-12 sm:w-16 rounded-full"
              style={{ backgroundColor: palette.sageGold }}
            />
          </div>

          {/* Couple names — hero focal point */}
          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight`}
            style={{ color: palette.deepBrown }}
          >
            <span className="block">
              <span className="inline-block align-baseline text-[clamp(3.25rem,7vw,4.75rem)] leading-none">
                {groomName[0]}
              </span>
              <span className="inline-block align-baseline text-[clamp(2.25rem,5.2vw,3.25rem)] ml-1 tracking-[0.18em]">
                {groomName.slice(1)}
              </span>
            </span>
            <span
              className="block text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.35em] my-2 sm:my-3"
              style={{ color: palette.terracotta }}
            >
              &amp;
            </span>
            <span className="block">
              <span className="inline-block align-baseline text-[clamp(3.25rem,7vw,4.75rem)] leading-none">
                {brideName[0]}
              </span>
              <span className="inline-block align-baseline text-[clamp(2.25rem,5.2vw,3.25rem)] ml-1 tracking-[0.18em]">
                {brideName.slice(1)}
              </span>
            </span>
          </h1>

          {/* Venue & occasion */}
          <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-2.5" style={{ color: palette.deepBrown }}>
            <p className={`${cinzel.className} text-sm sm:text-base uppercase tracking-[0.18em] leading-relaxed max-w-sm mx-auto`}>
              {siteConfig.ceremony.location}
            </p>
            <p className={`${cinzel.className} text-xs sm:text-sm uppercase tracking-[0.22em]`}>
              Ceremony &amp; Reception
            </p>
          </div>

          {/* Date & time — clear hierarchy */}
          <div
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t"
            style={{ borderColor: `${palette.sageGold}50`, color: palette.deepBrown }}
          >
            <p className={`${cinzel.className} text-sm sm:text-base uppercase tracking-[0.2em] font-medium`}>
              {ceremonyDay} · {ceremonyTime}
            </p>
            <p className={`${cinzel.className} text-xs sm:text-sm uppercase tracking-[0.24em] mt-1.5`} style={{ color: palette.deepBrown }}>
              {ceremonyDate}
            </p>
          </div>

          {/* CTA — champagne gold with warm hover */}
          <div className="mt-10 sm:mt-12">
            <a
              href="#rsvp"
              className={`${cinzel.className} inline-block px-10 sm:px-14 py-3.5 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.22em] rounded-sm border-2 border-[#D6BFA3] bg-[#D6BFA3] text-[#4E3B31] shadow-[0_4px_14px_rgba(78,59,49,0.15)] transition-all duration-300 hover:border-[#4E3B31] hover:bg-[#4E3B31] hover:text-[#F5EFE6] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(78,59,49,0.21)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E3B31]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5EFE6]`}
            >
              Confirm your attendance (RSVP)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}