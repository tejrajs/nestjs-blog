import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserStatusValidationPipes } from './pipes/user-status-validation-pipes';
import { UserStatus } from './enum/user.status';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) :Promise<User>{
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() :Promise<User[]>{
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<User>{
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) :Promise<User>{
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/:id/status')
  updatedTask(
        @Param('id') id:string, 
        @Body('status', UserStatusValidationPipes) status:UserStatus
      ):Promise<User>{
        return this.usersService.updateTask(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
