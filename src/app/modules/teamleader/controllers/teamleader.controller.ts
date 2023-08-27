import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamleaderService } from '../services/teamleader.service';
import { SuccessResponse } from 'src/app/types/successResponse';
import { CreateTeamleaderDTO } from '../dtos/create.dto';
import { UpdateTeamleaderDTO } from '../dtos/update.dto';

@Controller('teamleaders')
export class TeamleaderController {
  RELATIONS = ['project'];
  constructor(private readonly teamleaderService: TeamleaderService) {}
  @Get()
  async getAll() {
    return this.teamleaderService.findAll(this.RELATIONS);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.teamleaderService.findOne(id, this.RELATIONS);
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreateTeamleaderDTO) {
    const result = await this.teamleaderService.createOne(body);
    return new SuccessResponse('teamleader created successfully', result);
  }

  @Patch(':id')
  async updateOne(@Body() body: UpdateTeamleaderDTO, @Param('id') id: string) {
    await this.teamleaderService.updateOne(id, body);
    return new SuccessResponse('teamleader updated successfully', null);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.teamleaderService.deleteOne(id);
    return new SuccessResponse('teamleader deleted successfully', null);
  }
}
