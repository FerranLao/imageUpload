import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(file): Promise<Record<string, any>> {
    return { message: 'Hello World!' };
  }
}
