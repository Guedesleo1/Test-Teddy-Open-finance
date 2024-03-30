import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableShortsLinks1711792345528 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shorts_links',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'url',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'url_shorts',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '100',
            isNullable: true
          },
          {
            name: 'clicks_number',
            type: 'integer',
            default: '0'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey('shorts_links', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['user_id'],
      referencedTableName: 'users',
      name: 'fk_users_shorts_links_user_id'
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('shorts_links', 'fk_users_shorts_links_user_id');
    await queryRunner.dropTable('shorts_links', true);
  }
}
