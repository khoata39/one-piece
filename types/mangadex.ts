export interface MangaAttributes {
  title: { en?: string; "ja-ro"?: string; [key: string]: string | undefined }
  description: { en?: string; vi?: string; [key: string]: string | undefined }
  status: string
  lastVolume: string | null
  lastChapter: string | null
}

export interface CoverAttributes {
  fileName: string
  volume: string | null
}

export interface Relationship {
  id: string
  type: string
  attributes?: CoverAttributes & Record<string, unknown>
}

export interface Manga {
  id: string
  type: "manga"
  attributes: MangaAttributes
  relationships: Relationship[]
}

export interface ChapterAttributes {
  title: string | null
  volume: string | null
  chapter: string | null
  translatedLanguage: string
  publishAt: string
  pages: number
  externalUrl: string | null
}

export interface Chapter {
  id: string
  type: "chapter"
  attributes: ChapterAttributes
  relationships: Relationship[]
}

export interface ChapterPages {
  baseUrl: string
  chapter: {
    hash: string
    data: string[]
    dataSaver: string[]
  }
}
