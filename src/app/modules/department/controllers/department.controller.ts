import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentSerivce } from '../services/department.service';
import { CreateDepartmentDTO } from '../dtos/create.dto';
import { UpdateDepartmentDTO } from '../dtos/update.dto';
import { SuccessResponse } from 'src/app/types/successResponse';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentSerivce) {}
  @Get()
  async getAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreateDepartmentDTO) {
    const result = await this.departmentService.createOne(body);
    return new SuccessResponse('teamleader created successfully', result);
  }

  @Patch(':id')
  async updateOne(@Body() body: UpdateDepartmentDTO, @Param('id') id: string) {
    await this.departmentService.updateOne(id, body);
    return new SuccessResponse('department updated successfully', null);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.departmentService.deleteOne(id);
    return new SuccessResponse('department deleted successfully', null);
  }
}
