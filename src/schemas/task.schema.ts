import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

@Schema({ timestamps: true })
export class Task {
  _id: any;
  
  @Prop()
  path: string;

  @Prop()
  error: Error;

  @Prop({ default: TaskStatus.PENDING })
  status: TaskStatus;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
