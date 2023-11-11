import { AbstractEntityUuid } from '@libs/share/database';
import { Entity } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntityUuid<UserEntity> {}
