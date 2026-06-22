import type { Metadata } from "next"
import { siteConfig } from "@/content/site"
import {
  getOgImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/og-image"
import { getCanonicalSiteUrl } from "@/lib/site-url"

export const PROPOSAL_OG_IMAGE_URL = getOgImageUrl()

const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`

export function buildProposalMetadata(options?: {
  roleTitle?: string
  path?: string
}): Metadata {
  const roleTitle = options?.roleTitle
  const path = options?.path ?? "/will-you-be-proposal"
  const canonicalBase = getCanonicalSiteUrl()
  const url = `${canonicalBase}${path}`
  const ogImageUrl = getOgImageUrl(canonicalBase)
  const ogImageAlt = roleTitle
    ? `Will you be our ${roleTitle}? — ${coupleNames} Wedding Proposal`
    : `${coupleNames} Wedding Proposal`

  const title = roleTitle
    ? `Will You Be Our ${roleTitle}?`
    : "Will You Be Part of Our Wedding?"

  const description = roleTitle
    ? `${coupleNames} lovingly invite you to be their ${roleTitle}. Open this special proposal and share your heartfelt response.`
    : `${coupleNames} have a special wedding proposal for you. Open your link to view the invitation and respond.`

  const ogTitle = `${title} | ${coupleNames}`

  return {
    metadataBase: new URL(canonicalBase),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: `${coupleNames} Wedding`,
      locale: "en_PH",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: "image/jpeg",
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
  }
}
