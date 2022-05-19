import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string; 

  @Column({
    default:0 //в dto можно не отдавать views
  })
  views: number;

  @Column()
  tags?: string;

  @CreateDateColumn({type:'timestamp'})
  createdAt: Date

  @UpdateDateColumn({type:'timestamp'})
  updatedAt: Date

}
