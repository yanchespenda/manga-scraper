export interface Sites {
    website: string
    siteId: string
    mangaId: boolean
    chapterId: boolean
    images: boolean
}

export interface IListSupport {
    sites?: Array<Sites>
}
