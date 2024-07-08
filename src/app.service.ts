import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public connectionTest(){
    return 'Welcome to the Mehrdadhub API 😊';
  }
}
