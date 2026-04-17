const LAST_READ_KEY = "op_last_read"
const READ_CHAPTERS_KEY = "op_read_chapters"

export interface ReadProgress {
  chapterId: string
  chapterNumber: string | null
  chapterTitle: string | null
  timestamp: number
}

export function saveProgress(chapterId: string, chapterNumber: string | null, chapterTitle: string | null) {
  const progress: ReadProgress = { chapterId, chapterNumber, chapterTitle, timestamp: Date.now() }
  localStorage.setItem(LAST_READ_KEY, JSON.stringify(progress))

  const readSet = getReadChaptersRaw()
  readSet.add(chapterId)
  localStorage.setItem(READ_CHAPTERS_KEY, JSON.stringify(Array.from(readSet)))
}

export function getLastRead(): ReadProgress | null {
  try {
    const raw = localStorage.getItem(LAST_READ_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getReadChaptersRaw(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_CHAPTERS_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function getReadChapters(): Set<string> {
  return getReadChaptersRaw()
}
