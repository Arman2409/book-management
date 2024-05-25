import { HttpException, HttpStatus } from "@nestjs/common";

import { maxErrorMessageLength } from '../../configs/global';
import adjustString from "../../helpers/adjustString";
import type { CustomLogger } from "./services/logger.service";

const handleErrorResponse = (error: Error, logger: CustomLogger) => {
    const { message = "Error Occured" } = error;
    const { status = HttpStatus.INTERNAL_SERVER_ERROR } = {...error};
    
    // Log to the console server related errors
    if(status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error(message);
    }
    throw new HttpException(adjustString(message, maxErrorMessageLength), status);
}

export default handleErrorResponse;