import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { CityModel } from "../cityModel";

@Entity("location")
class LocationModel {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
    name!: string;

  @Column()
    description!: string;

  @Column()
    category!: string;

  @Column()
    cep!: string;

  @Column()
    street!: string;

  @Column()
    district!: string;

  @Column()
    number!: string;

  @Column()
    city_id!: string;

  @OneToOne(() => CityModel)
    city!: CityModel;

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

export { LocationModel };
