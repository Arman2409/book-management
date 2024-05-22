import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/_services/prisma.service'; // Replace with actual path
import { BooksService } from '../../src/books/books.service';

describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService], // Include both services
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a book', async () => {
    const newBook = {
      title: 'Test Book',
      isbn: '1234567890123',
      publishedDate: new Date(),
    };

    // Mock Prisma method (replace with actual implementation)
    jest.spyOn(prisma.books, 'create').mockResolvedValueOnce(newBook);

    const createdBook = await service.createBook(newBook);
    expect(createdBook).toEqual(newBook);
  });

  it('should get a book by id', async () => {
    const existingBookId = 1;
    const existingBook = {
      id: existingBookId,
      title: 'Another Test Book',
      isbn: '9876543210987',
      publishedDate: new Date(),
      author: { id: 1, name: 'John Doe' }, // Example author data
    };

    // Mock Prisma method (replace with actual implementation)
    jest.spyOn(prisma.books, 'findUnique').mockResolvedValueOnce(existingBook);

    const foundBook = await service.getBook(existingBookId);
    expect(foundBook).toEqual(existingBook);
  });

  // Add similar tests for other methods (getAllBooks, updateBook, deleteBook)

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
});

