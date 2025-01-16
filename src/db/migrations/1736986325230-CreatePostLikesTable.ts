import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostLikesTable1736986325230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'post_likes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'post_id',
                        type: 'int'
                    },
                    {
                        name: 'user_id',
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
                        columnNames: ['post_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'posts',
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post_likes')
    }

}
