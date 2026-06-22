const DEFAULT_SITE_URL = "https://onie-and-gen.weddinginvitationrsvp.com/"

/** Production/canonical origin — use for copied & shared links (not window.location). */
export function getCanonicalSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
  return siteUrl.replace(/\/$/, "")
}

export function getProposalLink(roleId: string): string {
  return `${getCanonicalSiteUrl()}/will-you-be-proposal/${roleId}`
}
