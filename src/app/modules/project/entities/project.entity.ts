import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Teamleader } from '../../teamleader/entities/teamleader.entity';
import { EmployeeProject } from './EmployeeProject.entity';

@Entity(ENUM_TABLE_NAMES.PROJECTS, { orderBy: { createdAt: 'DESC' } })
export class Project extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  teamleaderId?: string;

  @OneToOne(() => Teamleader, (teamleader) => teamleader.project)
  @JoinColumn()
  teamleader: Teamleader;

  @OneToMany(
    () => EmployeeProject,
    (employeeProject) => employeeProject.project,
  )
  employeeProjects: EmployeeProject[];
}
