import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoLoadEntities: true,
      synchronize: true
    }),
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
