// src/modules/roles/entities/sidebar.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Role } from "./role.entity";
import { ModuleEntity } from "./module.entity";

@Table({
    tableName: 'sidebars',
    timestamps: true,
    underscored: true,
})
export class Sidebar extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Role)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true, // Relación 1:1 con Role
        field: 'role_id'
    })
    roleId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(100),
        field: 'name'
    })
    name: string;

    @Column({
        type: DataTypes.INTEGER,
        field: 'position',
        defaultValue: 0
    })
    position: number;

    @Column({
        type: DataTypes.BOOLEAN,
        field: 'is_visible',
        defaultValue: true
    })
    isVisible: boolean;

    // Relaciones
    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => ModuleEntity)
    modules: ModuleEntity[];
}
