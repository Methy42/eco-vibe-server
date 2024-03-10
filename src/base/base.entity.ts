import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn({
        comment: '主键',
        unsigned: true,
        type: 'integer'
    })
    id?: number;

    @Column({
        comment: '备注',
        nullable: true
    })
    notes?: string;

    @Column({
        type: 'datetime',
        name: 'created_at',
        nullable: true,
        comment: '创建时间'
    })
    createdAt?: Date;
    @Column({
        name: 'created_by',
        comment: '创建人',
        nullable: true
    })
    createdBy?: number;

    @Column({
        type: 'datetime',
        name: 'updated_at',
        comment: '更新时间',
        nullable: true
    })
    updatedAt?: Date;
    @Column({
        name: 'updated_by',
        comment: '更新人',
        nullable: true
    })
    updatedBy?: number;

    static create<T extends BaseEntity>(this: new () => T, data: Partial<T>): T {
        const entity = new this();
        data.notes || (data.notes = '');
        entity.createdAt = new Date();
        entity.createdBy = 0;
        entity.updatedAt = new Date();
        entity.updatedBy = 0;
        Object.assign(entity, data);
        return entity;
    }

    static update<T extends BaseEntity>(this: new () => T, entity: T, data: Partial<T>): T {
        data.notes || (data.notes = '');
        entity.updatedAt = new Date();
        entity.updatedBy = 0;
        Object.assign(entity, data);
        return entity;
    }
}