import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
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
        if (!task) throw new NotFoundException
        return task
    }
    @UsePipes(new ValidationPipe)
    @Post()
    async createTask(@Body() task : CreateTaskDto){
        const id =  await this.testService.createTask(task)
        return id
    }
    @Delete(':id')
    async deleteTask(@Param('id') id: string){
       const del =  await this.testService.deleteTask(id)
       if (!del) throw new NotFoundException
       return del
    }
    @Patch(':id')
    async modifyTask(@Param('id') id: string, @Body('task') task: string){
        const result = await this.testService.modifyTask(id, task)
        if (!result) throw new NotFoundException
        return result
    }
}