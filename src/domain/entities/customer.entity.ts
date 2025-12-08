import { DataTypes } from "sequelize";
import { AllowNull, BelongsTo, Column, Model, Table } from "sequelize-typescript"
import { User } from "./user.entity";


@Table({
    tableName: 'customers',
    timestamps: true            
})
export class Customer extends Model{
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
    })
    userId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        field: 'company_name'
    })
    companyName: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        field: 'phone'
    })
    phone: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        field: 'address'
    })
    address: string;

    @BelongsTo(() => User)
    user: User;
}