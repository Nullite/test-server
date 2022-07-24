import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TaskService} from "./task.service";
import { Task } from "./task.interface";

@Controller('tasks')
export class TaskController{
    constructor (private testService : TaskService){}
    @Get()
    getAllTasks(): Task[]{
        return this.testService.getAllTasks()
    }
    @Get(':id')
    getTask(@Param('id') id: string): string{
        return this.testService.getTask(id)
    }
    @Post()
    createTask(@Body('task') task : string): Task{
        return this.testService.createTask(task)
    }
    @Delete()
    deleteTask(@Body('id') id: string){
        return this.testService.deleteTask(id)
    }
    @Patch()
    modifyTask(@Body('id') id: string, @Body('task') task : string){
        return this.testService.modifyTask(id, task)
    }
}