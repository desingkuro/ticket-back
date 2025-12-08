import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Project } from "./project.entity";
import { Card } from "./card.entity";

@Table({
    tableName: 'boards',
    timestamps: true
})
export class Board extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name'
    })
    declare name: string;

    @ForeignKey(() => Project)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'project_id'
    })
    declare projectId: number;

    @BelongsTo(() => Project)
    project: Project;

    @HasMany(() => Card)
    cards: Card[];
}