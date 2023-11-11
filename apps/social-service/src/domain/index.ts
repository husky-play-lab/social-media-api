import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database';
import { CreateArticleUseCase } from './article/create-article.usecase';
import { ICreateArticleUseCase } from './article/i-create-article.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ICreateArticleUseCase,
      useClass: CreateArticleUseCase,
    },
  ],
  exports: [ICreateArticleUseCase],
})
export class DomainModule {}
