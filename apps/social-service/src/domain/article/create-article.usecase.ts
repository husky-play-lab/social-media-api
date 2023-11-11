import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../../infrastructure/database/repositories/article.repository';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { ICreateArticleUseCase } from './i-create-article.usecase';

@Injectable()
export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(
    private userRepository: UserRepository,
    private articleRepository: ArticleRepository,
  ) {}

  execute(data): Promise<any> {
    return this.articleRepository.create(data);
  }
}
