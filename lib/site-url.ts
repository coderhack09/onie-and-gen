/** This project's production hostname — must match the Vercel/custom domain. */
export const PROJECT_SITE_HOST = "onie-and-gen.weddinginvitationrsvp.com"

const DEFAULT_SITE_URL = `https://${PROJECT_SITE_HOST}/`

function normalizeOrigin(url: string): string {
  return url.replace(/\/$/, "")
}

/**
 * Returns the canonical site origin for metadata and shared links.
 * Ignores NEXT_PUBLIC_SITE_URL when it points at another couple's domain
 * (common when the env var was copied from a template project).
 */
export function getCanonicalSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (envUrl) {
    try {
      const host = new URL(envUrl).hostname
      if (host === PROJECT_SITE_HOST) {
        return normalizeOrigin(envUrl)
      }
    } catch {
      // Fall through to default when env value is malformed.
    }
  }
  return normalizeOrigin(DEFAULT_SITE_URL)
}

/** Prefer the browser origin when already on this site's domain. */
export function getProposalLink(roleId: string): string {
  if (typeof window !== "undefined") {
    const { hostname, origin, protocol } = window.location
    if (
      hostname === PROJECT_SITE_HOST ||
      (hostname === "localhost" && protocol.startsWith("http"))
    ) {
      return `${origin}/will-you-be-proposal/${roleId}`
    }
  }
  return `${getCanonicalSiteUrl()}/will-you-be-proposal/${roleId}`
}
