"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getLastRead, getReadChapters } from "@/lib/history"
import type { Chapter } from "@/types/mangadex"

interface ChapterListProps {
  chapters: Chapter[]
}

export default function ChapterList({ chapters }: ChapterListProps) {
  const [lastReadId, setLastReadId] = useState<string | null>(null)
  const [readChapters, setReadChapters] = useState<Set<string>>(new Set())

  useEffect(() => {
    const last = getLastRead()
    if (last) setLastReadId(last.chapterId)
    setReadChapters(getReadChapters())
  }, [])

  return (
    <div className="divide-y divide-gray-800/60">
      {chapters.map((ch) => {
        const isLastRead = ch.id === lastReadId
        const isRead = readChapters.has(ch.id)
        const chNum = ch.attributes.chapter
        const chTitle = ch.attributes.title
        const isExternal = !!ch.attributes.externalUrl

        return (
          <Link
            key={ch.id}
            href={`/chapter/${ch.id}`}
            className={`flex items-center justify-between px-4 min-h-[52px] py-2 active:bg-gray-800 transition-colors ${isRead && !isLastRead ? "opacity-50" : ""}`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {isLastRead && (
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">
                  Đang đọc
                </span>
              )}
              {isExternal && (
                <span className="text-xs bg-orange-600/80 text-white px-1.5 py-0.5 rounded shrink-0">
                  MangaPlus
                </span>
              )}
              <span className={`text-sm truncate ${isRead ? "text-gray-400" : "text-white"}`}>
                Ch.{chNum}{chTitle ? `: ${chTitle}` : ""}
              </span>
            </div>
            <span className="text-xs text-gray-600 shrink-0 ml-2">{isExternal ? "↗" : `${ch.attributes.pages}tr`}</span>
          </Link>
        )
      })}
    </div>
  )
}
