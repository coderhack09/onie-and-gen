"use client"

import { useState, useEffect } from "react"
import { RefreshCw, TrendingUp, Users, Calendar } from "lucide-react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

interface RSVPGuest {
  id: string
  timestamp: string
  name: string
  email: string
  guestCount: number
  message: string
}

const CARDS_PER_VIEW = 4

// Colors sourced from globals.css @theme inline — edit there to update everywhere
const BOOK_ACCENT = "var(--color-motif-deep)"    // sage green — primary
const BOOK_DARK = "var(--color-motif-deep)"      // headings / names
const BOOK_DARKER = "var(--color-motif-deep)"  // body text (steel blue depth)

function LineDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      <div className="w-6 sm:w-10 h-px opacity-40" style={{ backgroundColor: BOOK_ACCENT }} />
      <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: BOOK_ACCENT }} />
      <div className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: BOOK_ACCENT }} />
      <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: BOOK_ACCENT }} />
      <div className="w-6 sm:w-10 h-px opacity-40" style={{ backgroundColor: BOOK_ACCENT }} />
    </div>
  )
}

function GuestCard({
  guest,
  index,
  justEntered,
}: {
  guest: RSVPGuest
  index: number
  justEntered: boolean
}) {
  const getInitials = (name: string): string => {
    const words = name.trim().split(" ")
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Recently"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const hasMessage = guest.message && guest.message.trim() !== ""

  return (
    <Card
      className={`relative overflow-hidden rounded-lg border border-motif-deep/20 bg-motif-cream transition-shadow duration-200 hover:shadow-sm ${justEntered ? "animate-guest-roll-in" : ""}`}
      style={{
        ...(justEntered
          ? {
              animationDelay: `${index * 120}ms`,
              backfaceVisibility: "hidden" as const,
            }
          : {}),
      }}
    >
      <div
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
        style={{ backgroundColor: BOOK_ACCENT, opacity: 0.35 }}
      />
      <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-motif-deep/20 to-transparent" />

      <CardContent className="py-2 px-2.5 sm:py-2 sm:px-3 pl-3 sm:pl-3.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: BOOK_ACCENT }}
          >
            <span className={`${cormorant.className} text-white font-semibold text-xs sm:text-sm`}>
              {getInitials(guest.name)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3
                className={`${cinzel.className} text-xs sm:text-sm font-semibold leading-tight truncate`}
                style={{ color: BOOK_DARK }}
              >
                {guest.name}
              </h3>
              <span
                className={`${cormorant.className} text-[10px] sm:text-xs whitespace-nowrap flex-shrink-0`}
                style={{ color: BOOK_DARKER, opacity: 0.75 }}
              >
                {guest.guestCount} {guest.guestCount === 1 ? "guest" : "guests"}
              </span>
            </div>

            <div className="flex items-center gap-1 mt-0.5">
              <Calendar className="h-2.5 w-2.5 flex-shrink-0 opacity-60" style={{ color: BOOK_ACCENT }} />
              <span
                className={`${cormorant.className} text-[9px] sm:text-[10px] opacity-70`}
                style={{ color: BOOK_DARKER }}
              >
                {formatDate(guest.timestamp)}
              </span>
            </div>

            {hasMessage && (
              <p
                className={`${cormorant.className} text-[10px] sm:text-xs mt-1 leading-snug line-clamp-2 italic`}
                style={{ color: BOOK_DARKER, opacity: 0.8 }}
              >
                {guest.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function BookOfGuests() {
  const [totalGuests, setTotalGuests] = useState(0)
  const [rsvpCount, setRsvpCount] = useState(0)
  const [confirmedGuests, setConfirmedGuests] = useState<RSVPGuest[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showIncrease, setShowIncrease] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [justEntered, setJustEntered] = useState(false)

  const fetchGuests = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true)
    
    try {
      const response = await fetch("/api/rsvp-guests", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch RSVP guests")
      }

      const data: RSVPGuest[] = await response.json()
      const attendingGuests = Array.isArray(data) ? data : []

      const sortedGuests = [...attendingGuests].sort((a, b) => {
        const dateA = new Date(a.timestamp || 0).getTime()
        const dateB = new Date(b.timestamp || 0).getTime()
        return dateB - dateA
      })

      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        return sum + (guest.guestCount || 1)
      }, 0)
      
      // Show increase animation if count went up
      if (totalGuestCount > totalGuests && totalGuests > 0) {
        setShowIncrease(true)
        setTimeout(() => setShowIncrease(false), 2000)
      }
      
      setTotalGuests(totalGuestCount)
      setRsvpCount(attendingGuests.length)
      setConfirmedGuests(sortedGuests)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
    } finally {
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500)
      }
    }
  }

  // Get visible guests (max 4 cards) for carousel
  const getVisibleGuests = () => {
    if (confirmedGuests.length <= CARDS_PER_VIEW) return confirmedGuests
    const visible: RSVPGuest[] = []
    for (let i = 0; i < CARDS_PER_VIEW; i++) {
      const index = (currentIndex + i) % confirmedGuests.length
      visible.push(confirmedGuests[index])
    }
    return visible
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up automatic polling every 30 seconds for real-time updates
    const pollInterval = setInterval(() => {
      fetchGuests()
    }, 30000) // 30 seconds

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests(true)
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      clearInterval(pollInterval)
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [totalGuests])

  // Auto-rotate carousel every 5 seconds when more than 4 guests
  useEffect(() => {
    if (confirmedGuests.length <= CARDS_PER_VIEW) return
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + CARDS_PER_VIEW
          return next >= confirmedGuests.length ? 0 : next
        })
        setIsTransitioning(false)
        setJustEntered(true)
        setTimeout(() => setJustEntered(false), 1100)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [confirmedGuests.length])

  return (
    <div
      id="guests"
      className="relative z-10 py-3 sm:py-5 md:py-7 overflow-hidden isolate"
    >
      {/* Background — warm brown */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: 'var(--color-motif-cream)' }}
      />

      {/* Flower decoration — warm brown tint */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-y-[-1]"
          priority={false}
          // style={{ filter: DECO_FILTER_BOOK }}
        />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-x-[-1] scale-y-[-1]"
          priority={false}
          // style={{ filter: DECO_FILTER_BOOK }}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
          priority={false}
          // style={{ filter: DECO_FILTER_BOOK }}
        />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-x-[-1]"
          priority={false}
          // style={{ filter: DECO_FILTER_BOOK }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-2 sm:mb-3 px-2 sm:px-3">
        <LineDivider className="mb-2" />
        <p
          className={`${cormorant.className} text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.22em] mb-1`}
          style={{ color: BOOK_DARK, opacity: 0.8 }}
        >
          Our Cherished Guests
        </p>
        <h2
          className="leading-none mb-1.5"
          style={{
            fontFamily: "var(--font-brittany), cursive",
            fontSize: "clamp(1.75rem, 8vw, 3.5rem)",
            color: "var(--color-motif-deep)",
            letterSpacing: "0.01em",
          }}
        >
          Book of Guests
        </h2>
        <p
          className={`${cormorant.className} text-[10px] sm:text-xs font-light max-w-md mx-auto leading-snug px-2`}
          style={{ color: BOOK_DARKER, opacity: 0.85 }}
        >
          Meet the cherished souls joining us in celebration
        </p>
        <LineDivider className="mt-2" />
      </div>

      {/* Guests content */}
      <div className="relative max-w-2xl mx-auto px-3 sm:px-4">
        {/* Stats card */}
        <div className="mb-2 sm:mb-3">
          <div
            className="relative overflow-hidden rounded-lg border border-motif-deep/20"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 96%, white)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-motif-deep/25 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-motif-deep/15 to-transparent" />

            <button
              onClick={() => fetchGuests(true)}
              disabled={isRefreshing}
              className="absolute top-1.5 right-1.5 p-1 rounded-full transition-all duration-300 disabled:opacity-50 z-10 hover:scale-105 border border-motif-deep/12"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 6%, white)" }}
              title="Refresh counts"
            >
              <RefreshCw
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-500 ${isRefreshing ? "animate-spin" : "hover:rotate-180"}`}
                style={{ color: BOOK_ACCENT }}
              />
            </button>

            <div className="relative flex flex-col items-center py-3 px-3 sm:py-3.5 sm:px-4">
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <h3
                  className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-500 ${showIncrease ? "scale-110" : ""}`}
                  style={{ color: BOOK_DARK }}
                >
                  {totalGuests}
                </h3>
                {showIncrease && (
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-bounce" style={{ color: BOOK_ACCENT }} />
                )}
                <p className={`${cormorant.className} text-xs sm:text-sm font-medium`} style={{ color: BOOK_DARK }}>
                  {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                </p>
              </div>

              <div className="w-10 h-px my-1.5 bg-gradient-to-r from-transparent via-motif-deep/30 to-transparent" />

              <p className={`${cormorant.className} text-[10px] sm:text-xs`} style={{ color: BOOK_DARKER, opacity: 0.8 }}>
                {rsvpCount} {rsvpCount === 1 ? "RSVP entry" : "RSVP entries"}
              </p>
            </div>
          </div>
        </div>

        <LineDivider className="mb-2 sm:mb-2.5" />

        {/* Guest List Display */}
        {confirmedGuests.length > 0 ? (
          <div>
            <div className="text-center mb-2">
              <p className={`${cormorant.className} text-[9px] sm:text-[10px] uppercase tracking-[0.18em]`} style={{ color: BOOK_DARK, opacity: 0.65 }}>
                Recently Confirmed
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className={`space-y-1.5 sm:space-y-2 ${isTransitioning ? "animate-guest-roll-out" : ""}`}>
                {getVisibleGuests().map((guest, index) => (
                  <GuestCard
                    key={`${guest.id}-${currentIndex}-${index}`}
                    guest={guest}
                    index={index}
                    justEntered={justEntered}
                  />
                ))}
              </div>

              {confirmedGuests.length > CARDS_PER_VIEW && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {Array.from({ length: Math.ceil(confirmedGuests.length / CARDS_PER_VIEW) }).map((_, idx) => {
                    const pageIndex = Math.floor(currentIndex / CARDS_PER_VIEW)
                    const isActive = pageIndex === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setIsTransitioning(true)
                          setTimeout(() => {
                            setCurrentIndex(idx * CARDS_PER_VIEW)
                            setIsTransitioning(false)
                            setJustEntered(true)
                            setTimeout(() => setJustEntered(false), 1100)
                          }, 600)
                        }}
                        className="h-1.5 rounded-full transition-all duration-300 hover:opacity-90"
                        style={{
                          width: isActive ? "1.25rem" : "0.375rem",
                          backgroundColor: isActive ? BOOK_ACCENT : "color-mix(in srgb, var(--color-motif-deep) 28%, transparent)",
                        }}
                        aria-label={`Go to page ${idx + 1}`}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-5 sm:py-6 px-3">
            <LineDivider className="mb-3" />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: BOOK_ACCENT }}
            >
              <Users className="h-5 w-5 text-white" />
            </div>
            <h3 className={`${cinzel.className} text-sm sm:text-base font-semibold mb-1`} style={{ color: BOOK_DARK }}>
              Awaiting Our First Guest
            </h3>
            <p className={`${cormorant.className} text-[10px] sm:text-xs leading-snug`} style={{ color: BOOK_DARKER, opacity: 0.75 }}>
              Be among the first to RSVP — your name will appear here once confirmed.
            </p>
            <LineDivider className="mt-3" />
          </div>
        )}

      </div>
    </div>
  )
}