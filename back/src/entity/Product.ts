import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  category!: string;

  @Column('decimal')
  price!: number;

  @Column()
  quantity!: number;

  @Column()
  internalReference!: string;

  @Column()
  shellId!: number;

  @Column({
    type: 'enum',
    enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
    default: 'INSTOCK'
  })
  inventoryStatus!: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

  @Column('decimal')
  rating!: number;

  @Column()
  createdAt!: number;

  @Column()
  updatedAt!: number;
}
