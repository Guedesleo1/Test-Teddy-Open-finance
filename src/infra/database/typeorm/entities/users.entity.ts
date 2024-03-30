import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
    name: string;

  @Column({ name: 'email', length: 100, nullable: false, unique: true })
    email: string;

  @Column({ name: 'password', length: 250, nullable: false })
    password: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
