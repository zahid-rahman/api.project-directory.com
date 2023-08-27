import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity, OneToOne } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity(ENUM_TABLE_NAMES.TEAMLEADERS, { orderBy: { createdAt: 'DESC' } })
export class Teamleader extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => Project, (project) => project.teamleader)
  project: Project;
}
