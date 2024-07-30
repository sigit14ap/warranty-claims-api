import { Module } from '@nestjs/common';
import { StaffsService } from './services/staffs.service';
import { StaffsController } from './controllers/staffs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './entities/staff.entity';
import { StaffsRepository } from './repositories/staffs.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }])],
  controllers: [StaffsController],
  providers: [StaffsService, StaffsRepository],
})
export class StaffsModule {}
