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
import { SuccessResponse } from 'src/app/types/successResponse';
import { EmployeeService } from '../services/employee.service';
import { UpdateEmployeeDTO } from '../dtos/update.dto';
import { CreateEmployeeDTO } from '../dtos/create.dto';

@Controller('employees')
export class EmployeeController {
  RELATIONS = ['department'];
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  async getAll() {
    return this.employeeService.findAll(this.RELATIONS);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreateEmployeeDTO) {
    const result = await this.employeeService.createOne(body);
    return new SuccessResponse('employee created successfully', result);
  }

  @Patch(':id')
  async updateOne(@Body() body: UpdateEmployeeDTO, @Param('id') id: string) {
    await this.employeeService.updateOne(id, body);
    return new SuccessResponse('employee updated successfully', null);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.employeeService.deleteOne(id);
    return new SuccessResponse('employee deleted successfully', null);
  }

  @Delete('/soft-delete/:id')
  async softDeleteOne(@Param('id') id: string) {
    await this.employeeService.softDeleteOne(id);
    return new SuccessResponse('employee deleted successfully', null);
  }
}
