// src/modules/companies/entities/company.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { Worker } from "./worker.entity";
import { Team } from "./team.entity";

@Table({
    tableName: 'companies',
    timestamps: true,
    underscored: true,
})
export class Company extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'name'
    })
    declare name: string;

    @Column({
        type: DataTypes.STRING(50),
        unique: true,
        field: 'nit'
    })
    declare nit: string;

    @Column({
        type: DataTypes.STRING(50),
        field: 'phone'
    })
    declare phone: string;

    @Column({
        type: DataTypes.STRING(255),
        field: 'email'
    })
    declare email: string;

    // Relaciones
    @HasMany(() => Worker)
    declare workers: Worker[];

    @HasMany(() => Team)
    declare teams: Team[];
}
