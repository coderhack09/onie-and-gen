"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

export function Registry() {
  const siteConfig = useSiteConfig()
  const gcashQr = Object.values(siteConfig.giftRegistry ?? {})
  const [activeQr, setActiveQr] = useState(gcashQr[0]?.id ?? "")
  const activeItem = gcashQr.find((i) => i.id === activeQr) ?? gcashQr[0]

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
        </div>
        
        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-motif-cream mb-2 sm:mb-3 md:mb-4">
        Cash Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-motif-cream/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
        With all that we have, we've been truly blessed.
Your presence and prayers are all that we request,
But if you desire to give nonetheless,
Monetary gift is the one we suggest.

        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
  {/* GCASH QR toggle */}


      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-motif-cream/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-motif-cream/90 italic text-center">
            With love,
            <br />
            {siteConfig.couple.brideNickname} and {siteConfig.couple.groomNickname}
          </p>
        </div>
      </div>
    </Section>
  );
}
