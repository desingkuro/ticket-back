// src/modules/projects/entities/project-team.entity.ts (Tabla intermedia N:M)
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Project } from "./project.entity";
import { Team } from "./team.entity";

@Table({
    tableName: 'project_teams',
    timestamps: false,
    underscored: true,
})
export class ProjectTeam extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Project)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'project_id'
    })
    projectId: number;

    @ForeignKey(() => Team)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'team_id'
    })
    teamId: number;

    @Column({
        type: DataTypes.DATE,
        field: 'assigned_date',
        defaultValue: DataTypes.NOW
    })
    assignedDate: Date;

    @Column({
        type: DataTypes.STRING(20),
        defaultValue: 'active'
    })
    status: string;

    // RELACIONES
    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => Team)
    team: Team;
}
