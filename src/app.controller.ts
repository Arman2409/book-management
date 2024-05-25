import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRunning(): string {
    return 'Server Running';
  }
}
