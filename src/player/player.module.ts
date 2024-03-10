import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants.utils';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '99999d' },
  }), TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
