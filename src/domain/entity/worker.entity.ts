// src/modules/workers/entities/worker.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { Company } from "./company.entity";
import { Comment } from "./comment.entity";
import { CardWorker } from "./card-worker.entity";
import { TeamWorker } from "./team-worker.entity";

@Table({
    tableName: 'workers',
    timestamps: true,
    underscored: true,
})
export class Worker extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        field: 'user_id'
    })
    userId: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataTypes.INTEGER,
        field: 'company_id'
    })
    companyId: number;

    @Column({
        type: DataTypes.STRING(100),
        field: 'position'
    })
    position: string;

    @Column({
        type: DataTypes.STRING(20),
        field: 'status',
        defaultValue: 'active'
    })
    status: string;

    // Relaciones
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Company)
    company: Company;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => CardWorker)
    cardWorkers: CardWorker[];

    @HasMany(() => TeamWorker)
    teamWorkers: TeamWorker[];
}
