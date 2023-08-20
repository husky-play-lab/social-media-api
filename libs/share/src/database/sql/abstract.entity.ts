import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class AbstractEntity<Entity> extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({})
  deletedAt: Date;

  constructor(partial?: Partial<Entity>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
