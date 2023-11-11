import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from './entities/user.entity';
import { ArticleRepository } from './repositories/article.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity])],
  providers: [UserRepository, ArticleRepository],
  exports: [UserRepository, ArticleRepository],
})
export class DatabaseModule {}
