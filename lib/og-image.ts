import { getCanonicalSiteUrl } from "@/lib/site-url"

export const OG_IMAGE_PATH = "/Details/linkPreview.jpg"
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export function getOgImageUrl(baseUrl?: string): string {
  const canonical = baseUrl ?? getCanonicalSiteUrl()
  return `${canonical}${OG_IMAGE_PATH}`
}
