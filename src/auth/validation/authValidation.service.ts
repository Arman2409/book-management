import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthValidationService {
    private readonly minPasswordLength = 8;

    private readonly emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    public validateEmail(email: string): void {
        const isValid = this.emailRegex.test(email);
        if(!isValid) {
            throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST);
        }
    }

    public validatePassword(password: string): void {
        const isValid = password.length >= this.minPasswordLength && // Minimum length check
            /[0-9]+/.test(password)    // Contains a number
        if (!isValid) {
            throw new HttpException(`Password should be at least ${this.minPasswordLength} characters length and include numbers`, HttpStatus.BAD_REQUEST);
        }
    }

}