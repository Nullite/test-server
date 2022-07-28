import { Injectable, NotFoundException } from "@nestjs/common";
import {Task} from "./task.interface"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

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
            throw new NotFoundException ("task is not found")
        }
        if (!task) throw new NotFoundException ("task is not found")
        return {
            id: task.id, 
            task: task.task
        }
    }
    async createTask(task : string): Promise<Task> {
        const newTask = new this.TaskModel({task: task})
        const result = await newTask.save()
        return {
            id: result.id,
            task: result.task
        }
    }
    async deleteTask(id: string) {
      let taskToDelete
      try{
        taskToDelete = await this.TaskModel.deleteOne({id: id})
    } catch(error){
        throw new NotFoundException ("task is not found")
    }
        return `task ${id} deleted`
    } 
       
    async modifyTask(id, task): Promise<Task>{
        let modifyTask
        try{
            modifyTask = await this.TaskModel.findById(id)
        } catch(error){
            throw new NotFoundException ("task is not found")
        }
        modifyTask.task = task
        const result = await modifyTask.save()
        return {
            id: modifyTask.id,
            task: modifyTask.task
        }
    }      
}