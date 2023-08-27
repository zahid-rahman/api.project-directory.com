import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity(ENUM_TABLE_NAMES.DEPARTMENTS, { orderBy: { createdAt: 'DESC' } })
export class Department extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
