import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository:Repository<PostEntity>
  ){}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find({
      order:{
        createdAt:'DESC'
      }
    })
  }

  async popular(){
  const qb = this.postRepository.createQueryBuilder('post')
    qb.orderBy('views', 'DESC')
    qb.limit(10)
    const [items, total] = await qb.getManyAndCount()
    return {items, total}
  }

  async search(searchPostDto: SearchPostDto) {

    const qb = this.postRepository.createQueryBuilder('post')
    qb.limit(searchPostDto.limit || 0)
    qb.take(searchPostDto.take || 10)
    
    if(searchPostDto.views){
      qb.orderBy('views', searchPostDto.views)
    }

    if(searchPostDto.body){
      qb.where(`post.body ILIKE '%${searchPostDto.body}%'`)
    }

    if(searchPostDto.title){
      qb.where(`post.title LIKE '%${searchPostDto.title}%'`)
    }

    if(searchPostDto.tags){
      qb.where(`post.tags ILIKE :tags`)
    }

    qb.setParameters({
      tags: `%${searchPostDto.tags}%` 
    }) 

    const [items, total] = await qb.getManyAndCount()
    return {items, total}
  }

  findOne(id: number) {
    const find = this.postRepository.findOne(id)
   if(!find){
     throw new NotFoundException('post not found')
   }
    return find
  }

 update(id: number, updatePostDto: UpdatePostDto) {
   const find = this.postRepository.findOne(id)
   if(!find){
     throw new NotFoundException('post not found')
   }
    return this.postRepository.update(id, updatePostDto)
  }

  remove(id: number) {
    const find = this.postRepository.findOne(id)
    if(!find){
      throw new NotFoundException('post not found')
    }
    return this.postRepository.delete(id)
  }
}
