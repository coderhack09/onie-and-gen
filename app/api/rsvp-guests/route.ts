import { siteConfig } from "@/content/site"
import { NextResponse } from "next/server"

const RSVP_SCRIPT_URL = siteConfig.googleAPI.rsvp

export interface RSVPGuest {
  id: string
  timestamp: string
  name: string
  email: string
  guestCount: number
  message: string
}

export async function GET() {
  try {
    const response = await fetch(RSVP_SCRIPT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch RSVP guests")
    }

    const data = await response.json()
    const possibleRows = (data && (data.GoogleSheetData ?? data.rows ?? data.values ?? data)) as unknown

    if (!Array.isArray(possibleRows)) {
      console.warn("Unexpected RSVP payload shape; expected an array", data)
      return NextResponse.json([], { status: 200 })
    }

    const rows = possibleRows as (string | number)[][]
    if (rows.length === 0) {
      return NextResponse.json([], { status: 200 })
    }

    const [header, ...entries] = rows
    if (!Array.isArray(header)) {
      return NextResponse.json([], { status: 200 })
    }

    const idxTime = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("timestamp"))
    const idxName = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("name"))
    const idxEmail = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("email"))
    const idxGuests = header.findIndex(
      (h) => typeof h === "string" && (h.toLowerCase().includes("guest") || h.toLowerCase().includes("number"))
    )
    const idxMessage = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("message"))

    const parsed: RSVPGuest[] = entries
      .filter((row) => Array.isArray(row))
      .map((row, index) => {
        const guestCountRaw = idxGuests >= 0 ? row[idxGuests] : 1
        const guestCount = Number(guestCountRaw) || 1

        return {
          id: `${row[idxTime] ?? index}-${row[idxName] ?? index}`,
          timestamp: String(row[idxTime >= 0 ? idxTime : 0] ?? ""),
          name: String(row[idxName >= 0 ? idxName : 1] ?? "").trim(),
          email: String(row[idxEmail >= 0 ? idxEmail : 2] ?? "").trim(),
          guestCount,
          message: String(row[idxMessage >= 0 ? idxMessage : 4] ?? "").trim(),
        }
      })
      .filter((guest) => guest.name)
      .reverse()

    return NextResponse.json(parsed, { status: 200 })
  } catch (error) {
    console.error("Error fetching RSVP guests:", error)
    return NextResponse.json(
      { error: "Failed to fetch RSVP guests", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
