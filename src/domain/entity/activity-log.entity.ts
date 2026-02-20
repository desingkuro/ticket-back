// src/modules/activity-logs/entities/activity-log.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Worker } from "./worker.entity";
import { Card } from "./card.entity";

@Table({
    tableName: 'activity_logs',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false, // No tiene updated_at
})
export class ActivityLog extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Worker)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'worker_id'
    })
    declare workerId: number;

    @ForeignKey(() => Card)
    @Column({
        type: DataTypes.INTEGER,
        field: 'card_id'
    })
    declare cardId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(100),
        field: 'action'
    })
    declare action: string;

    @Column({
        type: DataTypes.STRING(200),
        field: 'device'
    })
    declare device: string;

    // Relaciones
    @BelongsTo(() => Worker)
    declare worker: Worker;

    @BelongsTo(() => Card)
    declare card: Card;
}
