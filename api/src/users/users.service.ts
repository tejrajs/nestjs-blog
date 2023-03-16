import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserStatus } from './enum/user.status';

@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User) private readonly repo: Repository<User>){}

  async create(createUserDto: CreateUserDto) : Promise<User>{
    try{
      const user = new User();
      Object.assign(user, createUserDto);
      
      this.repo.create(user);
      return await this.repo.save(user);
    }catch(err){
      throw err
    }
  }

  async findAll() : Promise<User[]>{
    return await this.repo.find();
  }

  async findOne(id: number) : Promise<User>{
    try {
      const user = await this.repo.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('user not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findUser(username: string) : Promise<User>{
    try {
      const user = await this.repo.findOneBy({ username: username,  status: UserStatus.ACTIVE});
      if (!user) {
        throw new BadRequestException('user not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User>{
    try {
      const user = await this.findOne(id);

      Object.assign(user, updateUserDto);
      return this.repo.save(user);
    } catch (err) {
      throw err;
    }
  }

  async updateTask(id: number, status: UserStatus) : Promise<User>{
    try {
      const user = await this.findOne(id);
      user.status = status;
      Object.assign(user, status);
      return this.repo.save(user);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      await this.repo.remove(user);
      return { success: true, user };
    } catch (err) {
      throw err;
    }
  }
}
