import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { PageQuery } from "../base/page.query";
import { IPageVO } from "../base/page.vo";
import { PlayerQuery } from "./player.query";
import { PlayerDto } from "./player.dto";
import { stringToMd5 } from "../utils/crypto.utils";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/utils/constants.utils";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
        private readonly jwtService: JwtService
    ) {}

    async findAll(): Promise<PlayerEntity[]> {
        return await this.playerRepository.find();
    }

    async findOne(id: number): Promise<PlayerEntity> {
        return await this.playerRepository.findOne({ where: { id } });
    }

    async findByAccount(account: string): Promise<PlayerEntity> {
        return await this.playerRepository.findOne({ where: { account } });
    }

    async create(playerDto: PlayerDto): Promise<PlayerEntity> {
        const existPlayer = await this.playerRepository.findOne({ where: { account: playerDto.account } });
        if (existPlayer) {
            throw new Error('用户已存在');
        }
        const playerEntity = PlayerEntity.create(playerDto);

        playerEntity.password = stringToMd5(playerDto.password);

        return await this.playerRepository.save(playerEntity);
    }

    async update(id: number, playerDto: PlayerDto): Promise<PlayerEntity> {
        const playerEntity = await this.findOne(id);

        playerEntity.password = stringToMd5(playerDto.password);

        return await this.playerRepository.save(PlayerEntity.update(playerEntity, playerDto));
    }

    async delete(id: number): Promise<PlayerEntity> {
        const player = await this.findOne(id);
        return await this.playerRepository.remove(player);
    }

    async findByPage(pageQuery: PageQuery<PlayerQuery>): Promise<IPageVO<PlayerEntity>> {
        const { page, size, sort, order, query } = pageQuery;
        
        const queryWhere = query.toQueryWhere();
        
        const [data, total] = await this.playerRepository.findAndCount({
            where: queryWhere,
            skip: (page && size) && (page - 1) * size,
            take: size,
            order: {
                [sort]: order
            }
        });
        return {
            page,
            size,
            total,
            data
        }
    }

    async oauth(token: string): Promise<PlayerEntity | null> {
        return await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret
        });
    }

    async login(playerDto: PlayerDto): Promise<string> {
        const { account, password } = playerDto;
        const player = await this.playerRepository.findOne({ where: { account } });
        
        if (player && player.password === stringToMd5(password)) {
            return this.jwtService.sign({ account: player.account, password: playerDto.password, id: player.id });;
        } else {
            throw new Error("登录失败");
        }
    }
}