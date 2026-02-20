// src/modules/teams/entities/team.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Company } from "./company.entity";
import { TeamWorker } from "./team-worker.entity";
import { ProjectTeam } from "./project-team.entity";

@Table({
    tableName: 'teams',
    timestamps: true,
    underscored: true,
})
export class Team extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Company)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'company_id'
    })
    declare companyId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'name'
    })
    declare name: string;

    @Column({
        type: DataTypes.STRING(50),
        field: 'status',
        defaultValue: 'available'
    })
    declare status: string;

    // Relaciones
    @BelongsTo(() => Company)
    declare company: Company;

    @HasMany(() => TeamWorker)
    declare teamWorkers: TeamWorker[];

    @HasMany(() => ProjectTeam)
    declare projectTeams: ProjectTeam[];
}
