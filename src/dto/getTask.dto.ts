import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}