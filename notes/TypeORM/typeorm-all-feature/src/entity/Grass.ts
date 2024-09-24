import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Grass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  amount: string;

  @Column()
  name: number;
}
