import { DataTypes } from "sequelize";
import { Column, Model, Table, HasMany, HasOne } from "sequelize-typescript";
import { UserRole } from "./user-role.entity";
import { Sidebar } from "./sidebar.entity";

@Table({
    tableName: 'roles',
    timestamps: true,
    underscored: true,
})
export class Role extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true,
        field: 'name'
    })
    name: string;

    @HasMany(() => UserRole)
    userRoles: UserRole[];

    @HasOne(() => Sidebar)
    sidebar: Sidebar;
}
