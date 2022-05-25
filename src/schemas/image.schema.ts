import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Task } from "./task.schema";

@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  resolution: string;

  @Prop({ required: true })
  md5: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Task" })
  task: Task;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);
