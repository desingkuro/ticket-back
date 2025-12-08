// src/modules/companies/entities/company-owner.entity.ts
import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Company } from "./company.entity";
import { User } from "./user.entity";

@Table({
    tableName: 'company_owners',
    timestamps: true,
    underscored: true,
})
export class CompanyOwner extends Model {
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
    companyId: number;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
    })
    userId: number;

    @Column({
        type: DataTypes.DECIMAL(5, 2),
        field: 'ownership_percentage'
    })
    ownershipPercentage: number;

    @Column({
        type: DataTypes.DATE,
        field: 'start_date'
    })
    startDate: Date;

    // Relaciones
    @BelongsTo(() => Company)
    company: Company;

    @BelongsTo(() => User)
    user: User;
}
