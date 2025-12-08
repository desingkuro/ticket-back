// src/modules/roles/entities/module.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sidebar } from "./sidebar.entity";

@Table({
    tableName: 'modules',
    timestamps: true,
    underscored: true,
})
export class ModuleEntity extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Sidebar)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'sidebar_id'
    })
    sidebarId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(100),
        field: 'name'
    })
    name: string;

    @Column({
        type: DataTypes.STRING(50),
        field: 'icon'
    })
    icon: string;

    @Column({
        type: DataTypes.STRING(255),
        field: 'url'
    })
    url: string;

    @Column({
        type: DataTypes.INTEGER,
        field: 'position',
        defaultValue: 0
    })
    position: number;

    @Column({
        type: DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true
    })
    isActive: boolean;

    // Relaciones
    @BelongsTo(() => Sidebar)
    sidebar: Sidebar;
}
