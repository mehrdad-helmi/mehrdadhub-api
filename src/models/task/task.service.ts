import { MHEntityEnums, OwnershipException } from '@mehrdadhub/common';
import { MESSAGES } from '@mehrdadhub/locales/en';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';



@Injectable()
export class TaskService {
  
  constructor(private readonly prisma:PrismaService) {}
  
  create(createTaskDto: CreateTaskDto,userId:number) {
    return this.prisma.task.create({
      data:{
        ...createTaskDto,
        user:{
          connect:{
            id:userId
          }
        }
      }
    });
  }

  findAll(userId:number) {
    return this.prisma.task.findMany({
      where:{
        userId
      },
      include:{
        subTasks:true,
        parentTask:true
      }
    });
  }

  async findOne(id: number,userId:number) {
    const task = await this.prisma.task.findUnique({
      where:{
        id,
        userId
      },
      include:{
        subTasks:true,
        parentTask:true
      }
    });
    
    if(!task)
      throw new NotFoundException(MESSAGES.COMMON.NOT_FOUND)
    
    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto,userId:number) {
    const task = await this.prisma.task.findUnique({
      where:{
        id
      }
    })
    
    if(!task)
      throw new NotFoundException(MESSAGES.COMMON.NOT_FOUND)
    
    if(task.userId!==userId)
      throw new OwnershipException(MHEntityEnums.TASK)
    
    return this.prisma.task.update({
      where:{
        id
      },
      data:updateTaskDto
    })
  }
  
  async changeImage(id:number,imgUrl:string,userId:number){
    const task = await this.prisma.task.findUnique({
      where:{
        id
      }
    })
    
    if(!task)
      throw new NotFoundException(MESSAGES.COMMON.NOT_FOUND)
    
    if(task.userId!==userId)
      throw new OwnershipException(MHEntityEnums.TASK)
    
    return this.prisma.task.update({
			where: {
				id,
			},
			data: { imgUrl },
		});
  }

  async remove(id: number,userId:number) {
    const task = await this.prisma.task.findUnique({
      where:{
        id
      }
    })
    
    if(!task)
      throw new NotFoundException(MESSAGES.COMMON.NOT_FOUND)
    
    if(task.userId!==userId)
      throw new OwnershipException(MHEntityEnums.TASK)
    
    return this.prisma.task.delete({
      where:{
        id
      }
    })
  }
}
