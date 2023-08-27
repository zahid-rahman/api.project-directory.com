import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teamleader } from '../entities/teamleader.entity';
import { UpdateTeamleaderDTO } from '../dtos/update.dto';
import { CreateTeamleaderDTO } from '../dtos/create.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TeamleaderService {
  constructor(
    @InjectRepository(Teamleader)
    private readonly teamleaderRepository: Repository<Teamleader>,
  ) {}
  async findAll(relations?: string[]) {
    return this.teamleaderRepository.find({ relations });
  }
  async findOne(id: string, relations?: string[]) {
    return this.teamleaderRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }
  async createOne(payload: CreateTeamleaderDTO) {
    return this.teamleaderRepository.save(payload);
  }
  async updateOne(id: string, payload: UpdateTeamleaderDTO) {
    return this.teamleaderRepository.update(id, payload);
  }
  async deleteOne(id: string) {
    return this.teamleaderRepository.delete(id);
  }
}
