import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from "mongoose"

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>
    ){}

    async listTasks(username: string): Promise<Task[]> {
        return await this.taskModel.find({"username": username})
    }

    async addTask(username: string, data: CreateTaskDto): Promise<Task> {
        data.username = username
        const res = await this.taskModel.insertMany([data])
        let newTask = new Task
        if(res.length == 0) return newTask
        newTask.title = res[0].title
        newTask.description = res[0].description
        newTask.isChecked = res[0].isChecked
        newTask.id = res[0].id
        newTask.username = username
        return newTask
    }

    async removeTask(id: string, username: string): Promise<number>{
        const res = await this.taskModel.deleteOne({_id:  new mongoose.Types.ObjectId(id), username: username})
        return res.deletedCount
    }

    async updateTask(id: string, username: string, data: CreateTaskDto): Promise<number>{
        const res = await this.taskModel.updateOne({
            _id: new mongoose.Types.ObjectId(id),
            username: username
        }, {$set: data})
        return res.modifiedCount;
    }
}
