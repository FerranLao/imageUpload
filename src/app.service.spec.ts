import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';

describe('AppService', () => {
  let service: AppService;
  let mockTaskModel;
  const mockedTask = {
    path: 'a/valid/path',
    status: 'PENDING',
    _id: '628e76afe3e78c11b91ce7b8',
    createdAt: '2022-05-25T18:34:23.384Z',
    updatedAt: '2022-05-25T18:34:23.384Z',
    __v: 0,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AppService,
        { provide: getModelToken(Task.name), useValue: Model },
        { provide: getModelToken(Image.name), useValue: Model },
      ],
    }).compile();
    mockTaskModel = app.get<Model<Task>>(getModelToken(Task.name));
    service = app.get<AppService>(AppService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('getTask', () => {
    it('should be defined', () => {
      expect(service.getTask).toBeTruthy();
    });

    it('should return the mongoObject', async () => {
      jest.spyOn(mockTaskModel, 'findById').mockResolvedValueOnce(mockedTask);
      const result = await service.getTask('validId');
      expect(mockTaskModel.findById).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject(mockedTask);
    });

    it('should throw an error if anyThing fails', async () => {
      try {
        jest
          .spyOn(mockTaskModel, 'findById')
          .mockRejectedValueOnce(new Error('FAILED'));
        await service.getTask('validId');
      } catch (err) {
        expect(err.message).toBe('FAILED');
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
