import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCreateCity1643243505888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("city", new TableColumn({
      name: "description",
      type: "varchar",
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("city", "description");
  }
}
