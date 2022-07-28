import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true }
})

export interface Task {
    id: string,
    task: string
}