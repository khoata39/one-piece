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
  const chTitle = currentChapter.attributes.title

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors shrink-0 text-sm">
          ← Danh sách
        </Link>

        <div className="text-center min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            Chapter {chNum}{chTitle ? `: ${chTitle}` : ""}
          </p>
          <p className="text-gray-400 text-xs">{chapters.length} chapters tiếng Việt</p>
        </div>

        <div className="flex gap-2 shrink-0">
          {prevChapter ? (
            <Link
              href={`/chapter/${prevChapter.id}`}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              ← Trước
            </Link>
          ) : (
            <span className="px-3 py-1.5 bg-gray-800 text-gray-600 text-sm rounded cursor-not-allowed">← Trước</span>
          )}
          {nextChapter ? (
            <Link
              href={`/chapter/${nextChapter.id}`}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors"
            >
              Sau →
            </Link>
          ) : (
            <span className="px-3 py-1.5 bg-gray-800 text-gray-600 text-sm rounded cursor-not-allowed">Sau →</span>
          )}
        </div>
      </div>
    </nav>
  )
}
