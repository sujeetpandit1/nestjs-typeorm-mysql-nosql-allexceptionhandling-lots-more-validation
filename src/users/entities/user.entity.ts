import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity()
@Unique(['email', 'mobile_no']) // Ensures uniqueness of email and mobile_no
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'user', 'other'], default: 'user' })
  role: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'int' })
  pincode: number;

  @Column({ type: 'varchar', length: 10, unique: true})
  mobile_no: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
  
}

