import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@libs/share/database/sql';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticleRepository extends AbstractRepository<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) _repository: Repository<ArticleEntity>,
  ) {
    super(_repository);
  }
}
