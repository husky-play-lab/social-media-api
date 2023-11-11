import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ICreateArticleUseCase } from '../domain/article/i-create-article.usecase';

@Controller('/posts')
export class CreateArticleController {
  constructor(
    @Inject(ICreateArticleUseCase)
    private createArticleUseCase: ICreateArticleUseCase,
  ) {}

  @Post()
  createArticle(@Body() data: any) {
    return this.createArticleUseCase.execute(data);
  }
}
