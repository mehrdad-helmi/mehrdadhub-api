import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  public connectionTest(){
    return {
      greeting:'Welcome to the Mehrdadhub API 😊',
      apiVersion:this.configService.get('minorVersion'),
      environment:this.configService.get('NODE_ENV')
    };
  }
}
