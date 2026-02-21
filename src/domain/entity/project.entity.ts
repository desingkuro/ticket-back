import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Customer } from "./customer.entity";
import { Board } from "./board.entity";
import { ProjectStatus } from "src/application/projects/enums/project-status.enum";

@Table({
    tableName:'projects',
    timestamps:true
})
export class Project extends Model<Project> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id'
    })
    declare customerId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name'
    })
    declare name: string;

    @Column({
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_date'
    })
    declare startDate: Date;

    @Column({
        allowNull: false,
        type: DataTypes.DATE,
        field: 'end_date'
    })
    declare endDate: Date;

    @Column({
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ProjectStatus)),
        field: 'status'
    })
    declare status: ProjectStatus;

    @BelongsTo(() => Customer)
    customer: Customer;

    @HasOne(() => Board)
    board: Board;
    
}