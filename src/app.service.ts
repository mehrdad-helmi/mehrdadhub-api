import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  public connectionTest(){
    return `Welcome to the Mehrdadhub API (version@${this.configService.get('minorVersion')} 😊`;
  }
}
