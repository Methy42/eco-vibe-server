import { BaseQuery } from "../base/base.query";
import { FindOptionsWhere, Like } from 'typeorm';
import { PlayerEntity } from './player.entity';

export class PlayerQuery extends BaseQuery {
    nameLike?: string;
    account?: string;
    descriptionLike?: string;
    character?: string;

    public toQueryWhere(): FindOptionsWhere<PlayerEntity> {
        const queryWhere: FindOptionsWhere<PlayerEntity> = super.toQueryWhere();

        this.nameLike && (queryWhere.name = Like(`%${this.nameLike}%`));
        queryWhere.account = this.account;
        queryWhere.id = this.id;
        queryWhere.character = this.character;
        this.descriptionLike && (queryWhere.description = Like(`%${ this.descriptionLike }%`));

        return queryWhere;
    }
}