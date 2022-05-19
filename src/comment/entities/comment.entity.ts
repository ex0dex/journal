import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @ManyToOne(() => UserEntity,{
        nullable:false
    })
    @JoinColumn({ name: 'userId' })
    user: UserEntity

    @ManyToOne(() => PostEntity,{
        nullable:false
    })
    @JoinColumn({ name: 'postId' }) 
    post: UserEntity

}
