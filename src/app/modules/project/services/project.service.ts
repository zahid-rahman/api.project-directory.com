import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDTO } from '../dtos/create.dto';
import { UpdateProjectDTO } from '../dtos/update.dto';
import { asyncForEach } from 'src/shared/common.utils';
import { Employee } from '../../employee/entities/employee.entity';
import { EmployeeProject } from '../entities/EmployeeProject.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly employeeRepository: Repository<Project>,
    private readonly dataSource: DataSource,
  ) {}
  async findAll(relations?: string[]) {
    return this.employeeRepository.find({
      relations,
    });
  }
  async findOne(id: string, relations?: string[]) {
    return this.employeeRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }
  async createOne(payload: CreateProjectDTO) {
    let createdProject = null;
    const { employees, ...rest } = payload;
    const projectPayload = { ...rest };
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //create project
      createdProject = await queryRunner.manager.save(
        Object.assign(new Project(), projectPayload),
      );

      if (!createdProject) {
        throw new BadRequestException('Project not crated successfully');
      }
      //create employee
      if (employees && employees.length > 0) {
        await asyncForEach(employees, async (employee: any) => {
          const modifiedEmployeePayload = { ...employee };
          const isEmployeeExist = await queryRunner.manager.findOne(Employee, {
            where: {
              officeIdNumber: modifiedEmployeePayload.officeId,
            },
          });

          if (!isEmployeeExist) {
            throw new BadRequestException(
              `this ${modifiedEmployeePayload.officeId} id not an employee. cound't find this`,
            );
          }
          const employeeProjectObject = {
            projectId: createdProject.id,
            employeeId: isEmployeeExist.id,
          };
          const createdEmployeeProject = await queryRunner.manager.save(
            Object.assign(new EmployeeProject(), employeeProjectObject),
          );

          if (!createdEmployeeProject) {
            throw new BadRequestException('something went wrong');
          }
        });
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new BadRequestException(error.message || 'something went wrong');
    }
  }
  async updateOne(id: string, payload: UpdateProjectDTO) {
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
