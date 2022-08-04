import { IsString } from "class-validator";

export class CreateTaskDto{
    @IsString({message: 'task must be string type only'})
    task: string
}