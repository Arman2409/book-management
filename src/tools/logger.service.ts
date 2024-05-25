import { Injectable, Logger } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from "fs";

import { maxErrorMessageLength } from '../../configs/global';
import adjustString from '../../helpers/adjustString';

@Injectable()
export class CustomLogger {
    private readonly logger = new Logger();

    constructor() {
        if (!existsSync('logs')) {
            mkdirSync('logs', { recursive: true });
        }
    }

    error(message: string) {
        this.logger.error(adjustString(message, maxErrorMessageLength));
        appendFileSync('./logs/errors.log', `${new Date().toISOString()} - ${message} \n`);
    }

    info(message: string) {
        this.logger.log(message);
    }
}