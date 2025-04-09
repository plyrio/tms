import { Module } from '@nestjs/common';
import { WorkSessionService } from './work-session.service';
import { WorkSessionController } from './work-session.controller';

@Module({
  controllers: [WorkSessionController],
  providers: [WorkSessionService],
})
export class WorkSessionModule {}
