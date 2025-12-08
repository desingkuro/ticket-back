import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { User } from "./user.entity";
import { Project } from "./project.entity";


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

    @ForeignKey(() => User)
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

    @HasMany(() => Project)
    projects: Project[];
}