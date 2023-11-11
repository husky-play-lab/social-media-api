import { AbstractEntityUuid } from '@libs/share/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'article' })
export class ArticleEntity extends AbstractEntityUuid<ArticleEntity> {
  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'author_id' })
  authorId: string;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;
}
