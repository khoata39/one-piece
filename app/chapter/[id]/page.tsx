import { notFound } from "next/navigation"
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
  const [chapters, pages] = await Promise.all([getChapterList(), getChapterPages(id)])

  const idx = chapters.findIndex((c) => c.id === id)
  if (idx === -1) notFound()

  const chapter = chapters[idx]
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
      <div className="bg-gray-900 border-t border-gray-700 px-4 py-4">
        <div className="max-w-3xl mx-auto flex justify-between">
          {prevChapter ? (
            <a
              href={`/chapter/${prevChapter.id}`}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              ← Chapter {prevChapter.attributes.chapter}
            </a>
          ) : <span />}
          {nextChapter ? (
            <a
              href={`/chapter/${nextChapter.id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors"
            >
              Chapter {nextChapter.attributes.chapter} →
            </a>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
