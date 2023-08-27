import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { Repository } from 'typeorm';
import { UpdateDepartmentDTO } from '../dtos/update.dto';
import { CreateDepartmentDTO } from '../dtos/create.dto';

@Injectable()
export class DepartmentSerivce {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async findAll(relations?: string[]) {
    return this.departmentRepository.find({
      relations,
    });
  }
  async findOne(id: string) {
    return this.departmentRepository.findOne({
      where: {
        id,
      },
    });
  }
  async createOne(payload: CreateDepartmentDTO) {
    return this.departmentRepository.save(payload);
  }
  async updateOne(id: string, payload: UpdateDepartmentDTO) {
    const isDepartmentExist = await this.findOne(id);
    if (!isDepartmentExist) {
      throw new BadRequestException('department not found');
    }
    return this.departmentRepository.update(id, payload);
  }
  async deleteOne(id: string) {
    return this.departmentRepository.delete(id);
  }
}
