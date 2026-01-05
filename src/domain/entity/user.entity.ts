import { DataTypes } from "sequelize";
import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { Customer } from "./customer.entity";
import { UserRole } from "./user-role.entity";


@Table({
    tableName:'users',
    timestamps:true
})
export class User extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name'
    })
    fullName: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
    })
    email: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
    })
    password: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        field: 'profile'
    })
    profile: string;

    @HasOne(() => Customer)
    customer: Customer;

    @HasOne(() => UserRole)
    userRole: UserRole;
}
