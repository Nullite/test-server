import { Injectable } from "@nestjs/common";
import {Task} from "./task.interface"

@Injectable()
export class TaskService{
    private tasks: Task[] = [
        {id: 0, task: "task not found"},
        {id: 1, task: "task 1"},
        {id: 2, task: "task 2"}
    ]
    getAllTasks(): Task[]{
        return this.tasks.slice(1, this.tasks.length)
    }
    getTask(id: string): string{
        const task = this.tasks.find(t => t.id === +id)
        return task ? task.task : this.tasks[0].task
    }
    createTask(task : string): Task{
        const id = this.tasks[this.tasks.length - 1].id + 1
        const newTask = {id: id, task: task + " " + id}
        this.tasks.push(newTask)
        return newTask
    }
    deleteTask(id : string): string{
        const ID : number = +id
        if(ID && this.tasks[ID]){
            this.tasks.splice(ID, 1)
            for (let i = ID; i < this.tasks.length; ++i){
                this.tasks[i].id--
            }
            return "deleted"
        } 
        else return this.tasks[0].task
    }
    modifyTask(id: string, task : string) : any{
        const ID : number = +id
        if (ID && this.tasks[ID]){
            this.tasks[ID].task = task + " " + ID
            return this.tasks[ID]
        }
        else return this.tasks[0].task   
    }
}