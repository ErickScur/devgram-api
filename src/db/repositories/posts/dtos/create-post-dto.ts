// DTO -> DATA TRANSFER OBJECT
export interface CreatePostDTO {
    content: string
    authorId: number
    image?: string
}