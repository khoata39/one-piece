import { notFound, redirect } from "next/navigation"
import { getChapterList, getChapterPages } from "@/lib/mangadex"
import Navbar from "@/components/Navbar"
import ChapterReader from "@/components/ChapterReader"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const chapters = await getChapterList()
  const chapter = chapters.find((c) => c.id === id)
  if (!chapter) return {}
  return {
    title: `One Piece - Chapter ${chapter.attributes.chapter ?? ""}`,
  }
}

export default async function ChapterPage({ params }: Props) {
  const { id } = await params
  const chapters = await getChapterList()

  const idx = chapters.findIndex((c) => c.id === id)
  if (idx === -1) notFound()

  const chapter = chapters[idx]

  // MangaPlus chapters — redirect thẳng ra ngoài
  if (chapter.attributes.externalUrl) {
    redirect(chapter.attributes.externalUrl)
  }

  const pages = await getChapterPages(id)
  const prevChapter = idx > 0 ? chapters[idx - 1] : null
  const nextChapter = idx < chapters.length - 1 ? chapters[idx + 1] : null

  return (
    <div className="bg-black min-h-screen">
      <Navbar
        currentChapter={chapter}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        chapters={chapters}
      />
      <ChapterReader chapter={chapter} pages={pages} />
      {/* Bottom nav */}
      <div className="bg-gray-900 border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex justify-between gap-3">
          {prevChapter ? (
            <a
              href={`/chapter/${prevChapter.id}`}
              className="flex-1 min-h-[48px] flex items-center justify-center bg-gray-700 active:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              ← Ch.{prevChapter.attributes.chapter}
            </a>
          ) : <span className="flex-1" />}
          {nextChapter ? (
            <a
              href={`/chapter/${nextChapter.id}`}
              className="flex-1 min-h-[48px] flex items-center justify-center bg-blue-600 active:bg-blue-500 text-white text-sm font-medium rounded transition-colors"
            >
              Ch.{nextChapter.attributes.chapter} →
            </a>
          ) : <span className="flex-1" />}
        </div>
      </div>
    </div>
  )
}
