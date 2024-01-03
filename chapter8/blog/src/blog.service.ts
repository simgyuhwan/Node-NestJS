import { PostDto } from './blog.model';
// import { BlogFileRepository, BlogRepository } from './blog.repository';
import { BlogMongoRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  async createPost(postDto: PostDto) {
    return await this.blogRepository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  delete(id: string) {
    this.blogRepository.deletePost(id);
  }

  updatePost(id: string, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}