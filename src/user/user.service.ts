import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  //connect to entity
  constructor(
    @InjectRepository(UserEntity)//Здесь хоантся код для userRepository
    private readonly userRepository: Repository<UserEntity>//crud is enabled in userRepository
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findById(id: number) {
    return this.userRepository.findOne(id)
  }

  findByCond(cond: LoginUserDto) {
    return this.userRepository.findOne(cond)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const find = this.userRepository.findOne(id)
    if(!find){
      throw new NotFoundException('user not found')
    }
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
