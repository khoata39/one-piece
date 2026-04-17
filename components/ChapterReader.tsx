"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { saveProgress } from "@/lib/history"
import type { Chapter, ChapterPages } from "@/types/mangadex"

interface ChapterReaderProps {
  chapter: Chapter
  pages: ChapterPages
}

export default function ChapterReader({ chapter, pages }: ChapterReaderProps) {
  const { baseUrl, chapter: pageData } = pages
  const imageUrls = pageData.data.map(
    (file) => `${baseUrl}/data/${pageData.hash}/${file}`
  )

  const savedRef = useRef(false)

  useEffect(() => {
    if (!savedRef.current) {
      saveProgress(chapter.id, chapter.attributes.chapter, chapter.attributes.title)
      savedRef.current = true
    }
  }, [chapter])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
      {imageUrls.map((url, i) => (
        <div key={i} className="w-full max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={`Trang ${i + 1}`}
            loading={i < 3 ? "eager" : "lazy"}
            className="w-full h-auto block"
          />
        </div>
      ))}

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors text-lg"
        aria-label="Lên đầu trang"
      >
        ↑
      </button>
    </div>
  )
}
