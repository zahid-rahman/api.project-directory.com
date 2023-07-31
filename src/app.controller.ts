import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

@Controller('users')
export class AppController {
  @Get('')
  getUser() {
    return {
      message: 'get all',
      name: 'zahid',
      company: 'programming-hero',
      designation: 'software engineer',
    };
  }

  @Post()
  store(@Req() req: Request) {
    return {
      message: 'created',
      request: req.body,
    };
  }

  @Patch(':id')
  patch(@Req() req: Request, @Param(':id') id: string) {
    return {
      message: 'updated',
      request: req.body,
      userId: id,
    };
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return {
      message: 'get by id',
      userId: id,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return {
      message: 'delete',
      userId: id,
    };
  }
}
