import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkSessionService } from './work-session.service';
import { CreateWorkSessionDto } from './dto/create-work-session.dto';
import { UpdateWorkSessionDto } from './dto/update-work-session.dto';

@Controller('work-session')
export class WorkSessionController {
  constructor(private readonly workSessionService: WorkSessionService) {}

  @Post()
  create(@Body() createWorkSessionDto: CreateWorkSessionDto) {
    return this.workSessionService.create(createWorkSessionDto);
  }

  @Get()
  findAll() {
    return this.workSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkSessionDto: UpdateWorkSessionDto) {
    return this.workSessionService.update(+id, updateWorkSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workSessionService.remove(+id);
  }
}
