import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  public connectionTest(){
    return {
      data:'Welcome to the Mehrdadhub API 😊',
      apiVersion:this.configService.get('minorVersion'),
      environment:this.configService.get('NODE_ENV'),
      serverTime:DateTime.now().toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS)
    };
  }
}
