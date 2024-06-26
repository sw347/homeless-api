import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { email } });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    const { organization: org, ...other } = updateAdminDto;
    return this.adminRepository.update(id, {
      organization: typeof org === 'string' ? { id: org } : org,
      ...other,
    });
  }
}
