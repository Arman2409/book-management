import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

import { titleMinLength } from '../../../../configs/books';
import validateDateFormat from '../../../../helpers/validateDate';
import type { CreateBookBody, UpdateBookBody } from "../../../../types/books";

@Injectable()
export class BooksValidationService {
    validateBookData = ({ authorId, isbn, title, publishedDate }: CreateBookBody | UpdateBookBody, forOperation: "create" | "update") => {
        const missingFields = [];

        // Check if fields are present 
        if (!authorId) missingFields.push('authorId');
        if (!title) missingFields.push('title');
        if (!isbn) missingFields.push('isbn');
        if (!publishedDate) missingFields.push('publishedDate');

        // Check if fields are valid
        if (title &&  title.length < titleMinLength) {
            throw new HttpException(`The length of biography must be at least ${titleMinLength} characters`, HttpStatus.BAD_REQUEST);
        }
        if(isbn && isbn.toString().length !== 13){
            throw new HttpException("isbn must be 13 digits", HttpStatus.BAD_REQUEST);
        }
        if(publishedDate && !validateDateFormat(publishedDate)) {
            throw new HttpException("Invalid date", HttpStatus.BAD_REQUEST);
        }

        // Check for quantity of missing fields 
        if (forOperation === "create" && missingFields.length > 0) {
            throw new HttpException(`Missing required fields: ${missingFields.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
        if (forOperation === "update" && missingFields.length === 4) {
            throw new HttpException('At least one of authorId, title, isbn, publishedDate is required', HttpStatus.BAD_REQUEST);
        }   
      };
}