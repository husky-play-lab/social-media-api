import { Module } from '@nestjs/common';
import { DomainModule } from '../domain';
import { CreateArticleController } from './create-article.controller';

@Module({
  imports: [DomainModule],
  controllers: [CreateArticleController],
})
export class PresentationModule {}
