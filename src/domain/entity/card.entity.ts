// src/modules/cards/entities/card.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";
import { CardWorker } from "./card-worker.entity";

@Table({
    tableName: 'cards',
    timestamps: true,
    underscored: true,
})
export class Card extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Board)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'board_id'
    })
    declare boardId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'title'
    })
    declare title: string;

    @Column({
        type: DataTypes.TEXT,
        field: 'description'
    })
    declare description: string;

    @Column({
        type: DataTypes.STRING(50),
        field: 'status',
        defaultValue: 'pending'
    })
    declare status: string;

    @Column({
        type: DataTypes.DATE,
        field: 'start_date'
    })
    declare startDate: Date;

    @Column({
        type: DataTypes.DATE,
        field: 'end_date'
    })
    declare endDate: Date;

    // Relaciones
    @BelongsTo(() => Board)
    declare board: Board;

    @HasMany(() => Comment)
    declare comments: Comment[];

    @HasMany(() => CardWorker)
    declare cardWorkers: CardWorker[];
}
