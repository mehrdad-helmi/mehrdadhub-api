import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangeImageDto, CreateTaskDto, UpdateTaskDto }      from './dto';
import { TaskService }                                       from './task.service';
import { Payload } from '@mehrdadhub/auth';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto,@Payload('userId') userId:number) {
    return this.taskService.create(createTaskDto,userId);
  }

  @Get()
  findAll(@Payload('userId') userId:number) {
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Payload('userId') userId:number) {
    return this.taskService.findOne(+id,userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@Payload('userId') userId:number) {
    return this.taskService.update(+id, updateTaskDto,userId);
  }
  
  @Patch(':id/image')
  changeImage(@Param('id') id: string, @Body() changeImageDto: ChangeImageDto,@Payload('userId') userId:number) {
    return this.taskService.changeImage(+id, changeImageDto.imgUrl,userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Payload('userId') userId:number) {
    return this.taskService.remove(+id,userId);
  }
}
