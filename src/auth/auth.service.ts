import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private  userService:UserService,
    private jwtService:JwtService
    ){}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      email, password
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
    async generateJwt(data:{id:number, email:string, fullName:string}){
    const payload = { email: data.email, fullName:data.fullName, sub: data.id,}
    return {
      token: await this.jwtService.sign(payload)
    }
  }

  async login(user: UserEntity) {
    const{password, ...userData} = user
    return {
      ...userData,
      token: await this.generateJwt(userData)
    };
  }

  async registration(createUserDto: CreateUserDto){
    try {
      const {password, ...user} = await this.userService.create(createUserDto)
      console.log(this.generateJwt(user))
      return{
        ...user,
        token: await this.jwtService.sign(user)
      }
    } catch (error) {
      throw new ForbiddenException("User is Exists")
    }
  }

}

