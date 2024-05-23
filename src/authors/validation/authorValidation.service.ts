import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { CreateAuthorBody } from '../../types/authors';

@Injectable()
export class AuthorsValidationService {
    validateBookData = (
        { name, biography, dateOfBirth }: CreateAuthorBody,
        forOperation: "create" | "update"
    ) => {
        const missingFields = [];

        if (!name) missingFields.push('name');
        if (!biography) missingFields.push('biography');
        if (!dateOfBirth) missingFields.push('dateOfBirth');

        if (forOperation === "create" && missingFields.length > 0) {
            throw new HttpException(`Missing required fields: ${missingFields.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
        if (forOperation === "update" && missingFields.length === 3) {
            throw new HttpException('At least one of name, biography, dateOfBirth is required', HttpStatus.BAD_REQUEST);
        }
    };
}