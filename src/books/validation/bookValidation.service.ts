import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

import type { CreateBookBody, UpdateBookBody } from "../../../types/books";

@Injectable()
export class BooksValidationService {
    validateBookData = ({ authorId, isbn, title, publishedDate }: CreateBookBody | UpdateBookBody, forOperation: "create" | "update") => {
        const missingFields = [];

        if (!authorId) missingFields.push('authorId');
        if (!title) missingFields.push('title');
        if (!isbn || isbn.toString().length !== 13) missingFields.push('isbn (must be 13 digits)');
        if (!publishedDate) missingFields.push('publishedDate');

        // Check if validation is being called for book creation
        if (forOperation === "create" && missingFields.length > 0) {
            throw new HttpException(`Missing required fields: ${missingFields.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
        // Check if validation is being called for book updating 
        if (forOperation === "update" && missingFields.length === 4) {
            throw new HttpException('At least one of authorId, title, isbn, publishedDate is required', HttpStatus.BAD_REQUEST);
        }   
      };
}