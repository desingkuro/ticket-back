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
    boardId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'title'
    })
    title: string;

    @Column({
        type: DataTypes.TEXT,
        field: 'description'
    })
    description: string;

    @Column({
        type: DataTypes.STRING(50),
        field: 'status',
        defaultValue: 'pending'
    })
    status: string;

    @Column({
        type: DataTypes.DATE,
        field: 'start_date'
    })
    startDate: Date;

    @Column({
        type: DataTypes.DATE,
        field: 'end_date'
    })
    endDate: Date;

    // Relaciones
    @BelongsTo(() => Board)
    board: Board;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => CardWorker)
    cardWorkers: CardWorker[];
}
