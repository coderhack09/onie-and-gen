"use client"

import { useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"
import { Music2, ExternalLink } from "lucide-react"


const DECO_FILTER_WHITE = ""
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void
  }
}

interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

interface SpotifyEmbedController {
  addListener: (
    event: string,
    handler: (event: {
      data: { isPaused?: boolean; isBuffering?: boolean }
    }) => void
  ) => void
  destroy: () => void
}

const SPOTIFY_IFRAME_API_SRC =
  "https://open.spotify.com/embed/iframe-api/v1"

let spotifyIFrameAPI: SpotifyIFrameAPI | null = null
const pendingSpotifyCallbacks: Array<(api: SpotifyIFrameAPI) => void> = []
let spotifyScriptLoading = false

function loadSpotifyIframeApi(callback: (api: SpotifyIFrameAPI) => void) {
  if (spotifyIFrameAPI) {
    callback(spotifyIFrameAPI)
    return
  }

  pendingSpotifyCallbacks.push(callback)

  if (spotifyScriptLoading) return
  spotifyScriptLoading = true

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    spotifyIFrameAPI = IFrameAPI
    pendingSpotifyCallbacks.splice(0).forEach((cb) => cb(IFrameAPI))
  }

  if (document.querySelector(`script[src="${SPOTIFY_IFRAME_API_SRC}"]`)) {
    return
  }

  const script = document.createElement("script")
  script.src = SPOTIFY_IFRAME_API_SRC
  script.async = true
  document.body.appendChild(script)
}

function getSpotifyUri(embedUrl: string): string | null {
  const match = embedUrl.match(/embed\/(playlist|album|track|episode)\/([^?]+)/)
  if (!match) return null
  return `spotify:${match[1]}:${match[2]}`
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function SoundWaveBars() {
  return (
    <div
      className="flex items-end justify-center gap-[3px] h-4 opacity-50"
      aria-hidden
    >
      {[0.45, 0.75, 1, 0.65, 0.85, 0.55].map((scale, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-motif-accent animate-pulse"
          style={{
            height: `${scale * 100}%`,
            animationDelay: `${i * 120}ms`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  )
}

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, embedUrl, spotifyUrl } =
    siteConfig.playlist
  const { pauseMusic, resumeMusic } = useAudio()
  const embedRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const spotifyUri = getSpotifyUri(embedUrl)

  useEffect(() => {
    const element = embedRef.current
    if (!element || !spotifyUri) return

    let resumeTimer: ReturnType<typeof setTimeout> | null = null

    const clearResumeTimer = () => {
      if (resumeTimer) {
        clearTimeout(resumeTimer)
        resumeTimer = null
      }
    }

    loadSpotifyIframeApi((IFrameAPI) => {
      IFrameAPI.createController(
        element,
        {
          uri: spotifyUri,
          width: "100%",
          height: "352",
        },
        (EmbedController) => {
          controllerRef.current = EmbedController

          EmbedController.addListener("playback_started", () => {
            clearResumeTimer()
            pauseMusic()
          })

          EmbedController.addListener("playback_update", (event) => {
            if (event.data.isPaused) {
              clearResumeTimer()
              resumeTimer = setTimeout(() => {
                resumeMusic()
                resumeTimer = null
              }, 400)
            } else {
              clearResumeTimer()
              pauseMusic()
            }
          })
        }
      )
    })

    return () => {
      clearResumeTimer()
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [spotifyUri, pauseMusic, resumeMusic])

  return (
    <Section
      id="playlist"
      className="relative overflow-hidden bg-transparent py-12 sm:py-16 md:py-20"
    >
      {/* Corner floral decoration - white */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleY(-1)", filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1)", filter: DECO_FILTER_WHITE }}
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
            {/* Icon badge with vinyl ring */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 -m-3 rounded-full border border-dashed border-motif-accent/25 animate-[spin_24s_linear_infinite]"
                  aria-hidden
                />
                <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-motif-accent/35 bg-white/70 shadow-[0_4px_20px_rgba(91,102,85,0.1)] backdrop-blur-sm">
                  <Music2
                    className="w-6 h-6 sm:w-7 sm:h-7 text-motif-accent"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#1DB954]/80 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2 sm:space-y-3">
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em]`}
                style={{ color: "var(--color-motif-deep)", opacity: 0.75 }}
              >
                {siteConfig.couple.groomNickname} &amp;{" "}
                {siteConfig.couple.brideNickname}
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
              <SoundWaveBars />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-motif-accent/40" />
            </div>

            {/* Playlist label */}
            <div className="space-y-1">
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-motif-deep/55`}
              >
                Now playing
              </p>
              <p
                className={`${cinzel.className} text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em]`}
                style={{ color: "var(--color-motif-accent)" }}
              >
                {playlistName}
              </p>
            </div>

            {/* Spotify embed */}
            <div className="relative mx-auto max-w-xl group">
              <div className="absolute -inset-2 rounded-[1.25rem] bg-gradient-to-br from-[#1DB954]/15 via-motif-accent/10 to-motif-soft/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-motif-accent/25 bg-gradient-to-b from-white/90 to-white/60 shadow-[0_10px_40px_rgba(91,102,85,0.12)] p-1.5 sm:p-2 transition-shadow duration-500 group-hover:shadow-[0_14px_48px_rgba(91,102,85,0.16)]">
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-motif-accent/30 to-transparent" />
                <div
                  ref={embedRef}
                  data-testid="embed-iframe"
                  className="w-full min-h-[352px] overflow-hidden rounded-[12px]"
                  aria-label={`${playlistName} — Spotify playlist`}
                />
              </div>
            </div>

            {/* Open in Spotify */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cormorant.className} inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] px-6 py-3 rounded-full border border-[#1DB954]/35 bg-[#1DB954]/10 text-motif-deep hover:bg-[#1DB954]/20 hover:border-[#1DB954]/55 transition-all duration-300 shadow-[0_4px_16px_rgba(29,185,84,0.08)] hover:shadow-[0_8px_28px_rgba(29,185,84,0.16)]`}
              >
                <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
                <span>Open in Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden />
              </a>

              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs italic max-w-xs sm:max-w-sm leading-relaxed`}
                style={{ color: "var(--color-motif-deep)", opacity: 0.65 }}
              >
                Press play and let the soundtrack of our love accompany your
                visit
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
