import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    content: string;

    /**
     @Column({
        type: 'datetime',
        default: () => 'NOW()',
    })
     */
    @CreateDateColumn()
    created_at: Date; // Creation date
    
    @UpdateDateColumn()
    updated_at: Date; // Last updated date
}
