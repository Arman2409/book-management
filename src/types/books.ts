export interface Book {
    id: number;
    title: string;
    isbn: string;
    publishedDate: Date;
    authorId: number;
}

export interface CreateBookBody {
    title: string;
    isbn: string;
    publishedDate: Date;
    authorId: number;
}