import { Controller, Get, UseInterceptors, Post, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { AppService } from './app.service';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FileInterceptor("image"))
  @Post()
  async getHello(
    @UploadedFile() file: Express.Multer.File
  ): Promise<Record<string, any>> {
    return this.appService.getHello(file);
  }
}
