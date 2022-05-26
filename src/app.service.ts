import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import * as md5 from 'md5';
import * as fs from 'fs';
import { resolve } from 'path';
import { Task, TaskDocument, TaskStatus } from './schemas/task.schema';
import { ImageDocument, Image } from './schemas/image.schema';

const AVAILABLE_RES = [800, 1024];

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async getTask(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async createTasks(file): Promise<Record<string, any>> {
    const res = await Promise.all(
      AVAILABLE_RES.map((resolution) =>
        this.newTask(resolution, file.originalname, file.buffer),
      ),
    );

    return res;
  }

  private async newTask(resolution, name, buffer) {
    const task = await this.taskModel.create({
      path: resolve(`output/${name}/${resolution}`),
    });
    this.processImage(task, resolution, name, buffer);
    return task;
  }

  async processImage(task, res: number, name: string, file: Buffer) {
    try {
      const tempDir = resolve(`temp/${name}${res}`);
      const tempPath = tempDir + "/image";
      // ? create the temp folder to store the image temporaly
      this.createFolders(tempDir);

      const created = await sharp(file).resize(res).jpeg().toFile(tempPath);
      const hash = md5(tempPath);
      const dir = resolve(`output/${name}/${res}`);
      const path = dir + `/${hash}.jpg`;
      //? create the final folder for the image
      this.createFolders(dir);
      fs.renameSync(tempPath, path);
      await this.imageModel.create({
        path,
        md5: hash,
        task: task._id,
        resolution: `${created.width}x${created.height}`,
      });
      task.path = path;
      task.status = TaskStatus.DONE;
      fs.rmdirSync(tempDir)
    } catch (err) {
      console.error(err)
      task.error= err.message;
      task.status = TaskStatus.ERROR
    } finally {
      task.save()
    }
  }

  private async createFolders(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
}
