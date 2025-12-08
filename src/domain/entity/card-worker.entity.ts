// src/modules/cards/entities/card-worker.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Card } from "./card.entity";
import { Worker } from "./worker.entity";

@Table({
    tableName: 'card_workers',
    timestamps: false,
    underscored: true,
})
export class CardWorker extends Model {
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
        type: DataTypes.DATE,
        field: 'assigned_at',
        defaultValue: DataTypes.NOW
    })
    assignedAt: Date;

    // Relaciones
    @BelongsTo(() => Card)
    card: Card;

    @BelongsTo(() => Worker)
    worker: Worker;
}
