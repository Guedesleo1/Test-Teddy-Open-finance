import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1711759337576 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            length: '250',
            isNullable: false
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamp'
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
