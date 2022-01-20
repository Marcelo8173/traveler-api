import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNewUser1642722439901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
        },
        {
          name: "name",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
