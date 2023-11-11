import { Injectable } from '@nestjs/common';
import { ICreateArticleUseCase } from './i-create-article.usecase';

@Injectable()
export class CreateArticleUseCase implements ICreateArticleUseCase {
  execute(data): Promise<any> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
}
