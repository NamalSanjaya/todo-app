import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Task {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    isChecked: boolean;

    @Prop()
    username: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task)
