// src/modules/roles/entities/user-role.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.entity";
import { Role } from "./role.entity";

@Table({
    tableName: 'user_roles',
    timestamps: false,
    underscored: true,
})
export class UserRole extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
    })
    declare userId: number;

    @ForeignKey(() => Role)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'role_id'
    })
    declare roleId: number;

    @Column({
        type: DataTypes.DATE,
        field: 'assigned_at',
        defaultValue: DataTypes.NOW
    })
    declare assignedAt: Date;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Role)
    declare role: Role;
}
