import { BaseEntity } from 'src/app/base/base.entity';
import { ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import { Column, Entity } from 'typeorm';

@Entity(ENUM_TABLE_NAMES.DEPARTMENTS, { orderBy: { createdAt: 'DESC' } })
export class Department extends BaseEntity {
  @Column({ nullable: true })
  name?: string;
}
