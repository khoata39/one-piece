import type { Manga, Chapter, ChapterPages } from "@/types/mangadex"

const BASE_URL = "https://api.mangadex.org"
const COVER_BASE = "https://uploads.mangadex.org"
const ONE_PIECE_ID = "a1c7c817-4e59-43b7-9365-09675a149a6f"

export async function getMangaInfo(): Promise<{ manga: Manga; coverUrl: string }> {
  const res = await fetch(`${BASE_URL}/manga/${ONE_PIECE_ID}?includes[]=cover_art`, {
    next: { revalidate: 3600 },
  })
  const json = await res.json()
  const manga: Manga = json.data

  const coverRel = manga.relationships.find((r) => r.type === "cover_art")
  const fileName = coverRel?.attributes?.fileName ?? ""
  const coverUrl = `${COVER_BASE}/covers/${ONE_PIECE_ID}/${fileName}.512.jpg`

  return { manga, coverUrl }
}

export async function getChapterList(): Promise<Chapter[]> {
  const chapters: Chapter[] = []
  let offset = 0
  const limit = 500

  while (true) {
    const params = new URLSearchParams({
      "translatedLanguage[]": "vi",
      "order[chapter]": "asc",
      limit: limit.toString(),
      offset: offset.toString(),
    })

    const res = await fetch(`${BASE_URL}/manga/${ONE_PIECE_ID}/feed?${params}`, {
      next: { revalidate: 3600 },
    })
    const json = await res.json()

    if (!json.data || json.data.length === 0) break
    chapters.push(...json.data)

    if (chapters.length >= json.total) break
    offset += limit
  }

  // Deduplicate: keep one chapter per chapter number (latest publishAt)
  const seen = new Map<string, Chapter>()
  for (const ch of chapters) {
    const key = ch.attributes.chapter ?? ch.id
    const existing = seen.get(key)
    if (!existing || ch.attributes.publishAt > existing.attributes.publishAt) {
      seen.set(key, ch)
    }
  }

  return Array.from(seen.values()).sort((a, b) => {
    const n1 = parseFloat(a.attributes.chapter ?? "0")
    const n2 = parseFloat(b.attributes.chapter ?? "0")
    return n1 - n2
  })
}

export async function getChapterPages(chapterId: string): Promise<ChapterPages> {
  const res = await fetch(`${BASE_URL}/at-home/server/${chapterId}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`at-home API error: ${res.status}`)
  const json = await res.json()
  if (!json.chapter) throw new Error("No chapter data in at-home response")
  return json
}
