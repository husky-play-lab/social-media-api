import { AbstractEntityUuid } from '@libs/share/database';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'login' })
export class LoginEntity extends AbstractEntityUuid<LoginEntity> {
  @Column()
  userId: string;

  @Column()
  jwt: string;
}
