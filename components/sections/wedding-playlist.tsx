"use client"

import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"
import { Music2, ExternalLink } from "lucide-react"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, embedUrl, spotifyUrl } =
    siteConfig.playlist

  return (
    <Section
      id="playlist"
      className="relative overflow-hidden bg-transparent py-12 sm:py-16 md:py-20"
    >
      {/* Corner floral decoration */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-50 scale-y-[-1]"
          priority={false}
        />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-50 scale-x-[-1]"
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-motif-accent/30 bg-motif-cream shadow-[0_16px_60px_rgba(91,102,85,0.12)] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
          {/* Subtle accent overlay */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72"
              style={{
                background:
                  "radial-gradient(circle at center, color-mix(in srgb, var(--color-motif-accent) 8%, transparent), transparent 65%)",
              }}
            />
            <div
              className="absolute bottom-[-4rem] left-[-2rem] w-56 h-56"
              style={{
                background:
                  "radial-gradient(circle at center, color-mix(in srgb, var(--color-motif-soft) 12%, transparent), transparent 65%)",
              }}
            />
            <div className="absolute inset-[1px] rounded-[inherit] border border-motif-accent/10" />
          </div>

          <div className="relative text-center space-y-5 sm:space-y-6 md:space-y-7">
            {/* Icon badge */}
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-motif-accent/35 bg-white/60 shadow-[0_4px_20px_rgba(91,102,85,0.08)]">
                <Music2
                  className="w-6 h-6 sm:w-7 sm:h-7 text-motif-accent"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-motif-accent/80 animate-pulse" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2 sm:space-y-3">
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em]`}
                style={{ color: "var(--color-motif-deep)", opacity: 0.75 }}
              >
                {siteConfig.couple.groomNickname} &amp; {siteConfig.couple.brideNickname}
              </p>
              <h2
                className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-tight`}
                style={{ color: "var(--color-motif-deep)" }}
              >
                {title}
              </h2>
              <p
                className={`${cormorant.className} text-sm sm:text-base md:text-lg italic leading-relaxed max-w-md mx-auto`}
                style={{ color: "var(--color-motif-deep)", opacity: 0.88 }}
              >
                {subtitle}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-10 sm:w-16 md:w-20 bg-motif-accent/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-motif-accent" />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-motif-accent/40" />
            </div>

            {/* Playlist label */}
            <p
              className={`${cinzel.className} text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em]`}
              style={{ color: "var(--color-motif-accent)" }}
            >
              {playlistName}
            </p>

            {/* Spotify embed */}
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-motif-accent/20 via-transparent to-motif-soft/25 blur-sm pointer-events-none" />
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-motif-accent/25 bg-white/70 shadow-[0_8px_32px_rgba(91,102,85,0.1)] p-1 sm:p-1.5">
                <iframe
                  data-testid="embed-iframe"
                  src={embedUrl}
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px" }}
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${playlistName} — Spotify playlist`}
                  className="w-full border-0"
                />
              </div>
            </div>

            {/* Open in Spotify */}
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cormorant.className} inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] px-5 py-2.5 rounded-full border border-motif-accent/40 bg-white/55 text-motif-deep hover:bg-motif-accent/15 hover:border-motif-accent/60 transition-all duration-300 shadow-[0_4px_16px_rgba(91,102,85,0.06)] hover:shadow-[0_6px_24px_rgba(91,102,85,0.12)]`}
            >
              <span>Open in Spotify</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden />
            </a>

            <p
              className={`${cormorant.className} text-[0.7rem] sm:text-xs italic`}
              style={{ color: "var(--color-motif-deep)", opacity: 0.65 }}
            >
              Press play and let the soundtrack of our love accompany your visit
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
