import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { GetTaskDto } from './dto/getTask.dto';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async getTaskbyId(@Param() {id}: GetTaskDto) {
    return this.appService.getTask(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async newTask(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Record<string, any>> {
    return this.appService.createTasks(file);
  }
}
