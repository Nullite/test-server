import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskSchema } from './task/task.interface';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [MongooseModule.forRoot('mongodb://localhost/tasks'), MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}])]
})
export class AppModule {}
