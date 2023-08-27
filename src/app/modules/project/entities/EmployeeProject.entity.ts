import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Teamleader } from '../../teamleader/entities/teamleader.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Project } from './project.entity';

@Entity(ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS, { orderBy: { createdAt: 'DESC' } })
export class EmployeeProject extends BaseEntity {
  @Column({ nullable: true })
  employeeId?: string;

  @Column({ nullable: true })
  projectId?: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeProjects)
  @JoinColumn([{ name: 'employeeId', referencedColumnName: 'id' }])
  employee: Employee;

  @ManyToOne(() => Project, (project) => project.employeeProjects)
  @JoinColumn([{ name: 'projectId', referencedColumnName: 'id' }])
  project: Project;
}
