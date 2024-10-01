export interface ContactInterface {
    id?: number
    date: Date
    subject: string
    comment: string
    archive: boolean
}

export interface UpdateArchiveStatusPayload {
    id: string
    archiveStatus: boolean
}