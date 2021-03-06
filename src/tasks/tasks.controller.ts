import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
        if(Object.keys(filterDTO).length) {
            return this.taskService.getTasksWithFilters(filterDTO);
        }
        else {
            return this.taskService.getAllTasks();
        }
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.taskService.createTask(createTaskDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
            return this.taskService.updateTaskStatus(id, status);
    }
}
