import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export interface IShortsLinks {
  userId?: string
  url: string
  urlShorts: string
  cicksNumber?: number
}

@Entity({ name: 'shorts_links' })
export class ShortsLinksEntity {
  @PrimaryGeneratedColumn()
    id: string;

  @Column({ name: 'user_id', length: 100, nullable: false })
    userId: string;

  @Column({ length: 255, nullable: false, unique: true })
    url: string;

  @Column({ name: 'url_shorts', length: 255, nullable: false })
    urlShorts: string;

  @Column({ name: 'clicks_number' })
    cicksNumber: number;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
