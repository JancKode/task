import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from "typeorm";
  import { ObjectType, Field, ID } from "type-graphql";
  
  @ObjectType() 
  @Entity()
  export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column({unique: true})
    username: string;
      
    @Column()
    password: string;
  
    @Field()
    @CreateDateColumn()
    createdAt: Date;
  
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
  
   
    @Column({ type: "text" })
    userId: string;
  }
  