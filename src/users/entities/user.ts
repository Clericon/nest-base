import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "ID", required: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "John",
    description: "Firstname of user",
    required: true,
  })
  @Column()
  firstname: string;

  @ApiProperty({
    example: "Doe",
    description: "Lastname of user",
    required: true,
  })
  @Column()
  lastname: string;

  @ApiProperty({
    example: "john.doe",
    description: "Unique username of user",
    required: true,
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: "john@mail.com",
    description: "Email address of user",
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
