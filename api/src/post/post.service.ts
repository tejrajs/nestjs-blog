import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>){}

  async create(createPostDto: CreatePostDto) :Promise<Post>{
    try{
      const slug = createPostDto.title.split(" ").join("-").toLowerCase();

      const post = new Post();
      post.slug = slug;
      Object.assign(post, createPostDto);
  
      this.repo.create(post);
      return await this.repo.save(post);
    }catch(err){
      throw err
    }
  }

  async findAll() : Promise<Post[]>{
    return await this.repo.find();
  }

  async findOne(id: number) : Promise<Post>{
    try {
      const post = await this.repo.findOneBy({ id });
      if (!post) {
        throw new BadRequestException('post not found');
      }
      return post;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) : Promise<Post>{
    try {
      const slug = updatePostDto.title.split(" ").join("-").toLowerCase();

      const post = await this.findOne(id);

      post.slug = slug;
      Object.assign(post, updatePostDto);
      return this.repo.save(post);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const post = await this.findOne(id);
      await this.repo.remove(post);
      return { success: true, post };
    } catch (err) {
      throw err;
    }
  }
}
