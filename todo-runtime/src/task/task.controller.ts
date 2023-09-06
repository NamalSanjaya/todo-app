import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // GET /task
  @UseGuards(JwtAuthGuard)
  @Get()
  async listTasks(@Request() req){
    return await this.taskService.listTasks(req.user.username)
  }

  // POST /task
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req, @Body() data: CreateTaskDto){
    return {
      "status": "success",
      "data": await this.taskService.addTask(req.user.username, data)
    }
  }

  // PUT /task/:id/check/
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateTask(@Param("id") taskId: string, @Request() req, @Body() data: CreateTaskDto){
    return {
      "status": "success",
      "data" : {"modifiedCount": await this.taskService.updateTask(taskId, req.user.username, data)}
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteTask(@Param("id") taskId: string, @Request() req){
    return {
      "status": "success",
      "data" : {
        "deleted_count": await this.taskService.removeTask(taskId, req.user.username),
        "id": taskId
      }
    }
  }
}
