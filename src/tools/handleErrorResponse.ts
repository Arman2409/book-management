import { HttpException, HttpStatus } from "@nestjs/common";

import adjustString from "../../helpers/adjustString";
import type { CustomLogger } from "./logger.service";

const handleErrorResponse = (error: Error, logger: CustomLogger) => {
    const { message = "Error creating book", status = HttpStatus.INTERNAL_SERVER_ERROR } = {...error};
    if(status === HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error(adjustString(message, 100)); 
    }
    throw new HttpException(adjustString(message, 100), status );
}

export default handleErrorResponse;