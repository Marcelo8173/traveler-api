import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

  @Entity("city")
class CityModel {
      @PrimaryGeneratedColumn("uuid")
        id!: string;

      @Column()
        name!: string;

      @Column()
        description!: string;

      @CreateDateColumn()
        created_at!: Date;

      @UpdateDateColumn()
        updated_at!: Date;

      constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
  }

export { CityModel };
