import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @Column({ length: 100 })
    productName: string;

    @Column()
    category: string;

    @Column()
    brand: string;

    @Column()
    quantity: number;

    @Column()
    productImage: string;

    @Column('text')
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;
}
