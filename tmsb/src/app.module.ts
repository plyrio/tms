import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { WorkSessionModule } from './work-session/work-session.module';

@Module({
  imports: [UserModule, ProjectModule, TaskModule, TagModule, WorkSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
