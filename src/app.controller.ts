import { PublicRoute }     from '@mehrdadhub/auth';
import { ResponseMessage }     from '@mehrdadhub/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags }         from '@nestjs/swagger';
import { AppService }      from './app.service';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @ResponseMessage('Connection established successfully 📫')
  @Get('connection-test')
  @PublicRoute()
  connectionTest() {
    return this.appService.connectionTest();
  }
}
