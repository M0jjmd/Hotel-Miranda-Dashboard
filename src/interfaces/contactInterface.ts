export interface Contact {
    id: string
    date: string
    customer: {
        name: string
        email: string
        phone: string
    };
    subject: string
    comment: string
    actions: {
        archive: boolean
    }
}

export interface UpdateArchiveStatusPayload {
    id: string
    archiveStatus: boolean
}