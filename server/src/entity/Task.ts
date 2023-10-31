import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType() 
@Entity("tasks")
export class Task {
  @Field((type) => ID) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field() 
  @Column({ type: "text" })
  title: string;

  @Field() 
  @Column({ type: "text" })
  userId: string;

  @Field() 
  @Column({ type: "text", nullable: true })
  description: string;

  @Field() 
  @CreateDateColumn()
  createdDate: Date;

  @Field() 
  @UpdateDateColumn()
  updatedDate: Date;
  
}
