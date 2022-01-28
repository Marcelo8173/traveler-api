import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from "typeorm";

export class addNewLocation1643329435988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "location",
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
          name: "description",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "category",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "cep",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "street",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "district",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "number",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "city_id",
          type: "uuid",
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

    await queryRunner.createForeignKey("location", new TableForeignKey({
      name: "cityLocation",
      columnNames: ["city_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "city",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("location", "cityLocation");
    await queryRunner.dropTable("location");
  }
}
