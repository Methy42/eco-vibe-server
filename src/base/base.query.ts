import { BaseEntity } from "./base.entity";
import { Between, FindOptionsWhere } from "typeorm";

export class BaseQuery {
    id?: number;
    createdAtStart?: Date;
    createdAtEnd?: Date;
    createdBy?: number;
    updatedAtStart?: Date;
    updatedAtEnd?: Date;
    updatedBy?: number;

    public toQueryWhere(): FindOptionsWhere<BaseEntity> {
        const queryWhere: FindOptionsWhere<BaseEntity> = {};

        queryWhere.id = this.id;
        (this.createdAtStart || this.createdAtEnd) && (queryWhere.createdAt = Between(this.createdAtStart, this.createdAtEnd));
        queryWhere.createdBy = this.createdBy;
        (this.updatedAtStart || this.updatedAtEnd) && (queryWhere.updatedAt = Between(this.updatedAtStart, this.updatedAtEnd));
        queryWhere.updatedBy = this.updatedBy;

        return queryWhere
    }

    static create<T extends BaseQuery>(this: new () => T, data: Partial<T>): T {
        const query = new this();

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        
        Object.assign(query, data);
        
        return query;
    }
}