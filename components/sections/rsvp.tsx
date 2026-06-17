"use client"

import { useRef, useState } from "react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, User, Users, MessageSquare, ChevronDown, CalendarHeart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSiteConfig } from "@/hooks/use-site-config"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const RSVP_COLOR = "var(--color-motif-deep)"

interface RSVPFormProps {
  onSuccess?: () => void
}

function RSVPForm({ onSuccess }: RSVPFormProps) {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [guestsValue, setGuestsValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const guests = formData.get("guests") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.1335956832", guests)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSc995vPRKjJWpuu2ldGqUnZUbVzsKz2qvXtLY5Oz9ndQH71Ng/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "RSVP Sent! 💕",
        description: "We look forward to celebrating with you",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setGuestsValue("")
      setMessageValue("")
      formRef.current?.reset()

      setTimeout(() => setIsSubmitted(false), 1000)

      if (onSuccess) onSuccess()
      window.dispatchEvent(new Event("rsvpUpdated"))
    } catch {
      toast({
        title: "Unable to send RSVP",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field: string) =>
    `${cormorant.className} rsvp-form-input w-full border-2 rounded-xl py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base placeholder:italic transition-all duration-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg ${
      focusedField === field
        ? "border-motif-deep focus:border-motif-deep focus:ring-4 focus:ring-motif-deep/25 shadow-lg"
        : "border-motif-deep/40 hover:border-motif-deep/50"
    }`

  return (
    <div className="relative w-full max-w-md mx-auto px-3 sm:px-0">
      <style>{`
        .rsvp-form-input::placeholder,
        .rsvp-form-textarea::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="absolute -top-3 -left-3 w-8 h-8 bg-motif-deep/20 rounded-full blur-sm animate-pulse-slow" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-motif-deep/20 rounded-full blur-md animate-pulse-slow" />

      <Card
        className={`relative w-full border-2 border-motif-deep/40 bg-motif-cream backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-2xl ${
          isFocused ? "scale-[1.01] border-motif-deep" : "hover:border-motif-deep/60"
        } ${isSubmitted ? "animate-bounce" : ""}`}
        style={{
          boxShadow: "0 12px 30px color-mix(in srgb, var(--color-motif-deep) 15%, transparent)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-motif-deep/5 via-transparent to-transparent pointer-events-none" />

        {isSubmitted && (
          <div className="absolute inset-0 bg-motif-cream/90 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: RSVP_COLOR }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="font-semibold text-lg" style={{ color: RSVP_COLOR }}>
                RSVP Sent!
              </p>
            </div>
          </div>
        )}

        <CardContent className="relative p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10">
          <div className="text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4">
              <div className="absolute inset-0 bg-motif-deep/30 rounded-full blur-lg scale-150" />
              <div
                className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto shadow-lg"
                style={{ backgroundColor: RSVP_COLOR }}
              >
                <CalendarHeart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            <h3
              className={`${cinzel.className} text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2`}
              style={{ color: RSVP_COLOR }}
            >
              Confirm Your Attendance
            </h3>
            <p
              className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm`}
              style={{ color: RSVP_COLOR, opacity: 0.85 }}
            >
              Let {coupleDisplayName} know you&apos;ll be joining the celebration
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Full Name */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <label
                className={`${cormorant.className} block text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2`}
                style={{ color: RSVP_COLOR }}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === "name" ? "scale-110" : ""
                  }`}
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 13%, transparent)" }}
                >
                  <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ color: RSVP_COLOR }} />
                </div>
                Full Name *
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your full name"
                  className={inputClass("name")}
                  style={{ color: RSVP_COLOR }}
                />
                {nameValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Number of Guests */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <label
                className={`${cormorant.className} block text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2`}
                style={{ color: RSVP_COLOR }}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === "guests" ? "scale-110" : ""
                  }`}
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 13%, transparent)" }}
                >
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ color: RSVP_COLOR }} />
                </div>
                Number of Guests *
              </label>
              <div className="relative">
                <select
                  name="guests"
                  required
                  value={guestsValue}
                  onChange={(e) => setGuestsValue(e.target.value)}
                  onFocus={() => setFocusedField("guests")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClass("guests")} appearance-none cursor-pointer pr-10`}
                  style={{ color: guestsValue ? RSVP_COLOR : "#9CA3AF" }}
                >
                  <option value="">Select number of guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: RSVP_COLOR, opacity: 0.6 }}
                />
                {guestsValue && (
                  <div className="absolute right-9 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <label
                className={`${cormorant.className} block text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2`}
                style={{ color: RSVP_COLOR }}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === "message" ? "scale-110" : ""
                  }`}
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 13%, transparent)" }}
                >
                  <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ color: RSVP_COLOR }} />
                </div>
                Message (Optional)
              </label>
              <div className="relative">
                <Textarea
                  name="message"
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Any special requests or dietary restrictions?"
                  className={`${cormorant.className} rsvp-form-textarea w-full border-2 rounded-xl min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-xs sm:text-sm md:text-base placeholder:italic placeholder:leading-relaxed transition-all duration-300 resize-none bg-white shadow-sm hover:shadow-md focus:shadow-lg py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 ${
                    focusedField === "message"
                      ? "border-motif-deep focus:border-motif-deep focus:ring-4 focus:ring-motif-deep/25 shadow-lg"
                      : "border-motif-deep/40 hover:border-motif-deep/50"
                  }`}
                  style={{ color: RSVP_COLOR }}
                />
                {messageValue && (
                  <div className="absolute right-3 top-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !guestsValue}
              className={`${cormorant.className} w-full text-motif-cream py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-4 sm:px-5 md:px-6 lg:px-7 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-motif-deep`}
              style={{
                backgroundColor: RSVP_COLOR,
                color: "var(--color-motif-cream)",
                boxShadow:
                  "0 6px 20px color-mix(in srgb, var(--color-motif-deep) 30%, transparent), 0 2px 8px color-mix(in srgb, var(--color-motif-deep) 15%, transparent)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "var(--color-motif-accent)"
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px color-mix(in srgb, var(--color-motif-deep) 35%, transparent), 0 3px 10px color-mix(in srgb, var(--color-motif-deep) 20%, transparent)"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = RSVP_COLOR
                e.currentTarget.style.boxShadow =
                  "0 6px 20px color-mix(in srgb, var(--color-motif-deep) 30%, transparent), 0 2px 8px color-mix(in srgb, var(--color-motif-deep) 15%, transparent)"
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  Submit RSVP
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function RSVP({ onSuccess }: RSVPFormProps) {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  return (
    <Section id="rsvp" className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-motif-deep/10 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute top-20 right-20 w-20 h-20 bg-motif-accent/15 rounded-full blur-xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-motif-deep/8 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-motif-accent/12 rounded-full blur-lg animate-pulse-slow" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-motif-deep/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-motif-accent/25 to-transparent" />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none transform scale-x-[-1]"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none rotate-180"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none transform rotate-180 scale-x-[-1]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="space-y-2 sm:space-y-2.5">
            <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-motif-cream`}>
              Join us in celebration
            </p>
            <h2 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-motif-cream`}>
              RSVP
            </h2>
          </div>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 mt-2 text-motif-cream`}>
            We reserved seats for you. Kindly confirm your attendance for {coupleDisplayName}&apos;s wedding.
          </p>
        </div>

        {/* Deadline info card */}
        <div className="max-w-xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-3 sm:px-0">
          <div
            className="bg-motif-cream/95 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.15)] border-2 border-motif-deep/40 text-center"
          >
            <h3
              className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3`}
              style={{ color: RSVP_COLOR }}
            >
              We Reserved Seats for You
            </h3>
            <p
              className={`${cormorant.className} text-xs sm:text-sm md:text-base leading-relaxed`}
              style={{ color: RSVP_COLOR, opacity: 0.85 }}
            >
              The favor of your reply is kindly requested on or before{" "}
              <span
                className="font-semibold px-2 py-0.5 rounded-lg inline-block mt-1"
                style={{
                  color: RSVP_COLOR,
                  backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
                }}
              >
                {siteConfig.details.rsvp.deadline}
              </span>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex justify-center">
          <div className="relative max-w-xl w-full">
            <RSVPForm onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </Section>
  )
}
