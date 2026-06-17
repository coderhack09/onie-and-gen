import MasonryGallery from "@/components/masonry-gallery"
import { getSiteConfig } from "@/lib/site-config"
import Image from "next/image"
import { Cinzel, Cormorant_Garamond } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const GALLERY_DECO_FILTER = ""

// All local couple photos — desktop (landscape) + mobile (portrait)
const desktopImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/desktop-background/couple (${i + 1}).png`,
  category: "desktop" as const,
  width: 1200,
  height: 900,
  orientation: "landscape" as const,
}))

const mobileImages = Array.from({ length: 25 }, (_, i) => ({
  src: `/mobile-background/couple (${i + 1}).png`,
  category: "mobile" as const,
  width: 900,
  height: 1200,
  orientation: "portrait" as const,
}))

type GalleryImage = {
  src: string
  category: "desktop" | "mobile" | "front" | "gallery"
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

// Interleave desktop and mobile so the masonry grid looks balanced
function interleave(a: GalleryImage[], b: GalleryImage[]): GalleryImage[] {
  const result: GalleryImage[] = []
  const max = Math.max(a.length, b.length)
  for (let i = 0; i < max; i++) {
    if (i < a.length) result.push(a[i])
    if (i < b.length) result.push(b[i])
  }
  return result
}

const allImages = interleave(desktopImages, mobileImages)

export default async function GalleryPage() {
  const siteConfig = await getSiteConfig()

  return (
    <main className="min-h-screen relative overflow-hidden bg-motif-cream">
      {/* Layered background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background:
              "linear-gradient(165deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-soft) 13%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 5%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 15%, var(--color-motif-soft) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Corner flower decorations */}
      {[
        "absolute left-0 top-0 scale-y-[-1]",
        "absolute right-0 top-0 scale-x-[-1] scale-y-[-1]",
        "absolute left-0 bottom-0",
        "absolute right-0 bottom-0 scale-x-[-1]",
      ].map((cls, i) => (
        <div key={i} className={`${cls} z-0 pointer-events-none`}>
          <Image
            src="/decoration/flower-decoration-left-bottom-corner2.png"
            alt=""
            width={300}
            height={300}
            className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-25"
            priority={false}
            style={{ filter: GALLERY_DECO_FILTER }}
          />
        </div>
      ))}

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="h-px w-8 sm:w-12 md:w-16 rounded-full bg-motif-accent/60" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-50 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="h-px w-8 sm:w-12 md:w-16 rounded-full bg-motif-accent/60" />
          </div>

          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-2 sm:mb-3 md:mb-4 text-motif-deep`}
          >
            Our Love Story Gallery
          </h1>
          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed px-2 text-motif-medium`}
          >
            Every photograph tells a story of {siteConfig.couple.groomNickname} &amp; {siteConfig.couple.brideNickname}&apos;s journey to forever
          </p>

          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-50 bg-motif-accent" />
            <span className="w-1.5 h-1.5 rounded-full opacity-80 bg-motif-accent" />
          </div>
        </div>

        <MasonryGallery images={allImages} />
      </section>
    </main>
  )
}
