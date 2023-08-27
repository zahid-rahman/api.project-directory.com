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
import { CreateProjectDTO } from '../dtos/create.dto';
import { UpdateProjectDTO } from '../dtos/update.dto';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
  RELATIONS = ['teamleader', 'employeeProjects.employee'];
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  async getAll() {
    return this.projectService.findAll(this.RELATIONS);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.projectService.findOne(id, this.RELATIONS);
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreateProjectDTO) {
    const result = await this.projectService.createOne(body);
    return new SuccessResponse('project created successfully', result);
  }

  @Patch(':id')
  async updateOne(@Body() body: UpdateProjectDTO, @Param('id') id: string) {
    await this.projectService.updateOne(id, body);
    return new SuccessResponse('project updated successfully', null);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.projectService.deleteOne(id);
    return new SuccessResponse('project deleted successfully', null);
  }

  @Delete('/soft-delete/:id')
  async softDeleteOne(@Param('id') id: string) {
    await this.projectService.softDeleteOne(id);
    return new SuccessResponse('project deleted successfully', null);
  }
}
