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
      <div className="bg-gradient-to-b from-gray-800 to-gray-950 px-4 py-8">
        <div className="max-w-3xl mx-auto flex gap-6">
          <div className="shrink-0">
            <Image
              src={coverUrl}
              alt={title}
              width={160}
              height={230}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
          <div className="flex flex-col justify-end gap-3">
            <div>
              <p className="text-blue-400 text-sm font-medium uppercase tracking-wider mb-1">Manga</p>
              <h1 className="text-3xl font-bold">{title}</h1>
            </div>
            <div className="flex gap-3 text-sm text-gray-400">
              <span>{chapters.length} chapters (Tiếng Việt)</span>
              <span>•</span>
              <span className="capitalize">{manga.attributes.status}</span>
            </div>
            {chapters.length > 0 && (
              <a
                href={`/chapter/${chapters[0].id}`}
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-fit"
              >
                Đọc từ đầu
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="max-w-3xl mx-auto px-4 py-4">
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>
      )}

      {/* Chapter list */}
      <div className="max-w-3xl mx-auto mt-4">
        <div className="px-4 py-3 border-b border-gray-800">
          <h2 className="font-semibold text-gray-200">Danh sách chapter</h2>
        </div>
        <ChapterList chapters={chapters} />
      </div>
    </main>
  )
}
