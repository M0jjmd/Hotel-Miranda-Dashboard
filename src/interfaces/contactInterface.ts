export interface ContactInterface {
    id?: number
    date: Date
    userId: number
    subject: string
    comment: string
    archive: boolean
}

// export interface ContactInterface {
//     _id?: string
//     date: Date
//     customer: {
//         userId?: string
//         name: string
//         email: string
//         phone: string
//     }
//     subject: string
//     comment: string
//     actions: {
//         archive: boolean
//     }
// }

// export interface UpdateArchiveStatusPayload {
//     id: string
//     archiveStatus: boolean
// }