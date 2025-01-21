import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFollowsTable1737412359230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'follows',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'follower_id',
                        type: 'int'
                    },
                    {
                        name: 'following_id',
                        type: 'int'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['follower_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users'
                    },
                    {
                        columnNames: ['following_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('follows')
    }

}
