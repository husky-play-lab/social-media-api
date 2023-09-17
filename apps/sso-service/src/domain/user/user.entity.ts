import { AbstractEntityUuid } from '@libs/share/database';
import { BeforeInsert, Column, Entity } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntityUuid<UserEntity> {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
