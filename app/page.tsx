import Image from "next/image"
import { getMangaInfo, getChapterList } from "@/lib/mangadex"
import ChapterList from "@/components/ChapterList"

export default async function HomePage() {
  const [{ manga, coverUrl }, chapters] = await Promise.all([
    getMangaInfo(),
    getChapterList(),
  ])

  const title = manga.attributes.title["en"] ?? manga.attributes.title["ja-ro"] ?? "One Piece"
  const description =
    manga.attributes.description["vi"] ??
    manga.attributes.description["en"] ??
    ""

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-950 px-4 py-6">
        <div className="max-w-3xl mx-auto flex gap-4">
          <div className="shrink-0">
            <Image
              src={coverUrl}
              alt={title}
              width={110}
              height={160}
              className="rounded-lg shadow-2xl w-[110px] h-auto sm:w-[150px]"
              priority
            />
          </div>
          <div className="flex flex-col justify-end gap-2 min-w-0">
            <div>
              <p className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Manga</p>
              <h1 className="text-xl sm:text-3xl font-bold leading-tight">{title}</h1>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-400">
              <span>{chapters.length} chapters (Tiếng Việt)</span>
              <span>•</span>
              <span className="capitalize">{manga.attributes.status}</span>
            </div>
            {chapters.length > 0 && (
              <a
                href={`/chapter/${chapters[0].id}`}
                className="inline-block bg-blue-600 active:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-fit mt-1"
              >
                Đọc từ đầu
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="max-w-3xl mx-auto px-4 py-3">
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>
      )}

      {/* Chapter list */}
      <div className="max-w-3xl mx-auto mt-2">
        <div className="px-4 py-3 border-b border-gray-800">
          <h2 className="font-semibold text-gray-200">Danh sách chapter</h2>
        </div>
        <ChapterList chapters={chapters} />
      </div>
    </main>
  )
}
