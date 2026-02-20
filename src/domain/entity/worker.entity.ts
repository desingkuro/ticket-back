import { DataTypes } from "sequelize";
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { Company } from "./company.entity";
import { Comment } from "./comment.entity";
import { CardWorker } from "./card-worker.entity";
import { TeamWorker } from "./team-worker.entity";

@Table({
    tableName: 'workers',
    timestamps: true,
    underscored: true,
})
export class Worker extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        field: 'user_id'
    })
    declare userId: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataTypes.INTEGER,
        field: 'company_id'
    })
    declare companyId: number;

    @Column({
        type: DataTypes.STRING(100),
        field: 'position'   
    })
    declare position: string;

    @Column({
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true
    })
    declare status: boolean;

    // Relaciones
    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Company)
    declare company: Company;

    @HasMany(() => Comment)
    declare comments: Comment[];

    @HasMany(() => CardWorker)
    declare cardWorkers: CardWorker[];

    @HasMany(() => TeamWorker)
    declare teamWorkers: TeamWorker[];
}
