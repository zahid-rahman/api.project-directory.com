import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { EmployeeProject } from '../../project/entities/EmployeeProject.entity';

@Entity(ENUM_TABLE_NAMES.EMPLOYEES, { orderBy: { createdAt: 'DESC' } })
export class Employee extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  departmentId?: string;

  @Column({ nullable: true })
  officeIdNumber?: string;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  @OneToMany(
    () => EmployeeProject,
    (employeeProject) => employeeProject.employee,
  )
  employeeProjects: EmployeeProject[];
}
