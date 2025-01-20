import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCommentsTable1736988379056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comments',
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
                        name: 'content',
                        type: 'text'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'update_at',
                        type: 'timestamp',
                        default: 'now()',
                        onUpdate: 'now()'
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
        await queryRunner.dropTable('comments')
    }

}
