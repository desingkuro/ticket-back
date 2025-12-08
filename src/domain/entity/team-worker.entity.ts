// src/modules/teams/entities/team-worker.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Team } from "./team.entity";
import { Worker } from "./worker.entity";

@Table({
    tableName: 'team_workers',
    timestamps: false,
    underscored: true,
})
export class TeamWorker extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Team)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'team_id'
    })
    teamId: number;

    @ForeignKey(() => Worker)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'worker_id'
    })
    workerId: number;

    @Column({
        type: DataTypes.STRING(100),
        field: 'role_in_team'
    })
    roleInTeam: string;

    @Column({
        type: DataTypes.DATE,
        field: 'joined_date',
        defaultValue: DataTypes.NOW
    })
    joinedDate: Date;

    @Column({
        type: DataTypes.STRING(20),
        field: 'status',
        defaultValue: 'active'
    })
    status: string;

    // Relaciones
    @BelongsTo(() => Team)
    team: Team;

    @BelongsTo(() => Worker)
    worker: Worker;
}

