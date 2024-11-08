import { Module } from '@nestjs/common';
import { IjrochiService } from './ijrochi.service';
import { IjrochiController } from './ijrochi.controller';
import { IjrochiEntity } from './entity/ijrochi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        IjrochiEntity
      ]
    )
  ],
  providers: [IjrochiService],
  controllers: [IjrochiController]
})
export class IjrochiModule {}
