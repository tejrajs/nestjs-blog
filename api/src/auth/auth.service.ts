import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    // console.log('user', user)
    // console.log('isMatch', isMatch)
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async register(createUserDto: CreateUserDto) : Promise<User>{
    try{
      const user = new User();
      Object.assign(user, createUserDto);
  
      return await this.usersService.create(user);
    }catch(err){
      throw err
    }
  }
}