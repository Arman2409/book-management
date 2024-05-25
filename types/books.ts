export interface Book extends CreateBookBody {
    id: number;
}

export interface CreateBookBody {
    title: string;
    isbn: string;
    publishedDate: Date;
    authorId: number;
}

export interface UpdateBookBody extends Partial<CreateBookBody> {}