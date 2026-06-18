"use client"

import { useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

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

const playlistText = "color-mix(in srgb, var(--color-motif-deep) 88%, #2A1F18)"
const playlistTextMuted = "color-mix(in srgb, var(--color-motif-deep) 72%, #2A1F18)"

const embedFrameStyle = {
  background:
    "linear-gradient(160deg, #F4E8D8 0%, var(--color-motif-silver) 48%, color-mix(in srgb, var(--color-motif-accent) 38%, var(--color-motif-silver)) 100%)",
  border: "1px solid color-mix(in srgb, var(--color-motif-deep) 22%, transparent)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 24px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
} as const

function styleSpotifyIframe(container: HTMLElement) {
  const iframe = container.querySelector("iframe")
  if (!iframe) return

  iframe.style.borderRadius = "10px"
  iframe.style.backgroundColor = "#ECD8BA"
  iframe.style.filter = "sepia(0.22) saturate(0.88) hue-rotate(-6deg) brightness(1.03)"
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

          EmbedController.addListener("ready", () => {
            styleSpotifyIframe(element)
          })

          window.setTimeout(() => styleSpotifyIframe(element), 400)

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
      className="relative bg-transparent py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-motif-accent/30 bg-motif-cream/95 backdrop-blur-sm shadow-[0_16px_60px_rgba(42,31,24,0.1)] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h2
              className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl leading-tight`}
              style={{ color: playlistText }}
            >
              {title}
            </h2>
            <div className="w-16 sm:w-20 h-px bg-motif-deep/25 mx-auto" />
            <p
              className={`${cormorant.className} text-base sm:text-lg md:text-xl italic leading-relaxed max-w-md mx-auto`}
              style={{ color: playlistTextMuted }}
            >
              {subtitle}
            </p>
          </div>

          <div
            className="rounded-xl p-1.5 sm:p-2 [&_iframe]:w-full [&_iframe]:min-h-[352px]"
            style={embedFrameStyle}
          >
            <div
              ref={embedRef}
              data-testid="embed-iframe"
              className="w-full min-h-[352px] overflow-hidden rounded-[10px]"
              aria-label={`${playlistName} — Spotify playlist`}
            />
          </div>

          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cinzel.className} inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-normal text-motif-cream bg-motif-deep rounded-sm border border-motif-deep transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
          >
            Open in Spotify
          </a>
        </div>
      </div>
    </Section>
  )
}
