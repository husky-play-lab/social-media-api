import { Module } from '@nestjs/common';
import { CreateArticleUseCase } from './article/create-article.usecase';
import { ICreateArticleUseCase } from './article/i-create-article.usecase';

@Module({
  providers: [
    {
      provide: ICreateArticleUseCase,
      useClass: CreateArticleUseCase,
    },
  ],
  exports: [ICreateArticleUseCase],
})
export class DomainModule {}
