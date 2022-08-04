import { Injectable} from "@nestjs/common";
import {Task} from "./task.interface"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./create-task.dto";

@Injectable()
export class TaskService{
    constructor(@InjectModel('Task') private readonly TaskModel: Model<Task>) {}
   

    async getAllTasks(){
        const tasks = await this.TaskModel.find().exec()
        return tasks.map((task) => ({
            id: task.id, task: task.task
        }))
    }
    async getTask(id: string): Promise<Task>{
        let task
        try{
            task = await this.TaskModel.findById(id)
        } catch(error){
            return null
        }
        if (!task) return null
        return {
            id: task.id, 
            task: task.task
        }
    }
    async createTask(task : CreateTaskDto): Promise<Task> {
        const newTask = new this.TaskModel({task: task.task})
        const result = await newTask.save()
        return {
            id: result.id,
            task: result.task
        }
    }
    async deleteTask(id: string) {
      let taskToDelete
        taskToDelete = await this.TaskModel.findByIdAndDelete(id)
        if (taskToDelete.deletedCount === 0) return null
        return `task ${id} deleted`
    } 
       
    async modifyTask(id, task): Promise<Task>{
        let modifyTask
        try{
            modifyTask = await this.TaskModel.findById(id)
            console.log(modifyTask)
        } catch(error){
            return null
        }
        modifyTask.task = task
        await modifyTask.save()
        return {
            id: modifyTask.id,
            task: modifyTask.task
        }
    }      
}