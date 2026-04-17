"use client"

import Link from "next/link"
import type { Chapter } from "@/types/mangadex"

interface NavbarProps {
  currentChapter: Chapter
  prevChapter: Chapter | null
  nextChapter: Chapter | null
  chapters: Chapter[]
}

export default function Navbar({ currentChapter, prevChapter, nextChapter, chapters }: NavbarProps) {
  const chNum = currentChapter.attributes.chapter

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 px-3 py-2">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        <Link
          href="/"
          className="text-gray-400 active:text-white transition-colors shrink-0 text-sm min-h-[44px] flex items-center px-1"
        >
          ←
        </Link>

        <div className="text-center min-w-0 flex-1">
          <p className="text-white font-semibold text-sm truncate">
            Chapter {chNum}
          </p>
          <p className="text-gray-500 text-xs">{chapters.length} chap · Tiếng Việt</p>
        </div>

        <div className="flex gap-1.5 shrink-0">
          {prevChapter ? (
            <Link
              href={`/chapter/${prevChapter.id}`}
              className="min-h-[44px] min-w-[64px] flex items-center justify-center bg-gray-700 active:bg-gray-600 text-white text-sm rounded transition-colors px-3"
            >
              ← Trước
            </Link>
          ) : (
            <span className="min-h-[44px] min-w-[64px] flex items-center justify-center bg-gray-800 text-gray-600 text-sm rounded px-3">
              ← Trước
            </span>
          )}
          {nextChapter ? (
            <Link
              href={`/chapter/${nextChapter.id}`}
              className="min-h-[44px] min-w-[64px] flex items-center justify-center bg-blue-600 active:bg-blue-700 text-white text-sm rounded transition-colors px-3"
            >
              Sau →
            </Link>
          ) : (
            <span className="min-h-[44px] min-w-[64px] flex items-center justify-center bg-gray-800 text-gray-600 text-sm rounded px-3">
              Sau →
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}
