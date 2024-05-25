import type { Book, CreateBookBody } from "../../types/books";

export const testCreateBookData: CreateBookBody = {
    authorId: 111111111111,
    title: 'Test Book',
    isbn: '1234567890123',
    publishedDate: new Date('1901-11-11')
};

export const testBookData: Book = {
    ...testCreateBookData,
    id: 111111111111,
};