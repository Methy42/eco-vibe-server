import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('t_player')
export class PlayerEntity extends BaseEntity {
    @Column({ comment: '玩家名称' })
    name?: string;
    @Column({ comment: '玩家账号', unique: true })
    account?: string;
    @Column({ comment: '玩家密码' })
    password?: string;
    @Column({ comment: '玩家描述' })
    description?: string;
    @Column({ comment: '玩家角色' })
    character?: string;
}