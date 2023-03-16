import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserStatus } from "../enum/user.status";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
      const saltOrRounds = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(this.password, saltOrRounds);
      this.password = hashedPassword;
  } 
  
  @Column({
    default: () => UserStatus.IN_ACTIVE,
  })
  status: UserStatus;

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
