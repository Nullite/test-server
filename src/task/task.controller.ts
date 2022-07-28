import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TaskService} from "./task.service";

@Controller('tasks')
export class TaskController{
    constructor (private testService : TaskService){}
    @Get()
    async getAllTasks(){
        const tasks = await this.testService.getAllTasks()
        return tasks
          
    }
    @Get(':id')
    async getTask(@Param('id') id: string){
        const task = await this.testService.getTask(id)
        return task
    }
    @Post()
    async createTask(@Body('task') task : string){
        const id =  await this.testService.createTask(task)
        return id
    }
    @Delete(':id')
    async deleteTask(@Param('id') id: string){
        return this.testService.deleteTask(id)
    }
    @Patch(':id')
    async modifyTask(@Param('id') id: string, @Body('task') task: string){
        const result = await this.testService.modifyTask(id, task)
        return result
    }
}