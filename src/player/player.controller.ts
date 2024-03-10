import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { PageQuery } from "../base/page.query";
import { IPageVO } from "../base/page.vo";
import { PlayerQuery } from './player.query';
import { PlayerDto } from './player.dto';
import ResultVO from '../base/result.vo';

@Controller("player")
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Get()
    async getPage(@Query() pageQuery: PageQuery<PlayerQuery>): Promise<ResultVO<IPageVO<PlayerEntity>>> {
        try {
            pageQuery.query = PlayerQuery.create<PlayerQuery>(pageQuery.query);
            const playerEntityPage = await this.playerService.findByPage(pageQuery);
            return ResultVO.success<IPageVO<PlayerEntity>>(playerEntityPage);
        } catch (error) {
            return new ResultVO<IPageVO<PlayerEntity>>(500, error.message, error);
        }
    }

    @Post()
    async create(@Body() playerDto: PlayerDto): Promise<ResultVO<PlayerEntity>> {
        try {
            const playerEntity = await this.playerService.create(playerDto);
            return ResultVO.success<PlayerEntity>(playerEntity);
        } catch (error) {
            return new ResultVO<PlayerEntity>(500, error.message, error);
        }
    }

    @Put(':id')
    async update(@Param("id") id: number, @Body() playerDto: PlayerDto): Promise<ResultVO<PlayerEntity>> {
        try {
            const playerEntity = await this.playerService.update(id, playerDto);
            return ResultVO.success<PlayerEntity>(playerEntity);
        } catch (error) {
            return new ResultVO<PlayerEntity>(500, error.message, error);
        }
    }

    @Delete(':id')
    async delete(@Param("id") id: number): Promise<ResultVO<PlayerEntity>> {
        try {
            const playerEntity = await this.playerService.delete(id);
            return ResultVO.success<PlayerEntity>(playerEntity);
        } catch (error) {
            return new ResultVO<PlayerEntity>(500, error.message, error);
        }
    }

}
