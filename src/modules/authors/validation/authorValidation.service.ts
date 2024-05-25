import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { biographyMinLength } from '../../../../configs/authors';
import validateDateFormat from '../../../../helpers/validateDate';
import type {
  CreateAuthorBody,
  UpdateAuthorBody,
} from '../../../../types/authors';

@Injectable()
export class AuthorsValidationService {
  validateBookData = (
    { name, biography, birthDate }: CreateAuthorBody | UpdateAuthorBody,
    forOperation: 'create' | 'update',
  ) => {
    const missingFields = [];

    // Check if fields are present
    if (!name) missingFields.push('name');
    if (!biography) missingFields.push('biography');
    if (!birthDate) missingFields.push('dateOfBirth');

    // Check if fields are valid
    if (biography && biography.length < biographyMinLength) {
      throw new HttpException(
        `The length of biography must be at least ${biographyMinLength} characters`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (birthDate && !validateDateFormat(birthDate)) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }

    // Check for quantity of missing fields
    if (forOperation === 'create' && missingFields.length > 0) {
      throw new HttpException(
        `Missing required fields: ${missingFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (forOperation === 'update' && missingFields.length === 3) {
      throw new HttpException(
        'At least one of name, biography, dateOfBirth is required',
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
