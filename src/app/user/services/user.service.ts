import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  getUser() {
    return {
      message: 'get all',
      name: 'zahid',
      company: 'programming-hero',
      designation: 'software engineer',
    };
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  update(updateUserDto: UpdateUserDto, param: { id: number }) {
    return {
      body: updateUserDto,
      param,
    };
  }

  getUserById(id) {
    return {
      id,
      name: 'zahid',
      company: 'programming-hero',
      designation: 'software engineer',
    };
  }

  delete(id) {
    return {
      id,
      message: 'delete user',
    };
  }
}
