import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEmployeeDTO } from '../dtos/update.dto';
import { CreateEmployeeDTO } from '../dtos/create.dto';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async findAll(relations?: string[]) {
    return this.employeeRepository.find({
      relations,
    });
  }
  async findOne(id: string) {
    return this.employeeRepository.findOne({
      where: {
        id,
      },
    });
  }
  async createOne(payload: CreateEmployeeDTO) {
    const modifiedPayload = { ...payload };
    modifiedPayload['officeIdNumber'] = Math.floor(
      100000 + Math.random() * 900000,
    );
    return this.employeeRepository.save(modifiedPayload);
  }
  async updateOne(id: string, payload: UpdateEmployeeDTO) {
    const isEmployeeExist = await this.findOne(id);
    if (!isEmployeeExist) {
      throw new BadRequestException('employee not found');
    }
    return this.employeeRepository.update(id, payload);
  }
  async deleteOne(id: string) {
    return this.employeeRepository.delete(id);
  }
  async softDeleteOne(id: string) {
    return this.employeeRepository.softDelete(id);
  }
}
