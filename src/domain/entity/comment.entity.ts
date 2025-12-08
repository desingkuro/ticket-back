// src/modules/comments/entities/comment.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Card } from "./card.entity";
import { Worker } from "./worker.entity";

@Table({
    tableName: 'comments',
    timestamps: true,
    underscored: true,
})
export class Comment extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Card)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'card_id'
    })
    cardId: number;

    @ForeignKey(() => Worker)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'worker_id'
    })
    workerId: number;

    @Column({
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'content'
    })
    content: string;

    // Relaciones
    @BelongsTo(() => Card)
    card: Card;

    @BelongsTo(() => Worker)
    worker: Worker;
}
