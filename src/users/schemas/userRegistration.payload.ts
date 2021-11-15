import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegistration {
  @ApiProperty({
    example: "Lastname",
    description: "Firstname of user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: "Random",
    description: "Lastname of user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: "RandomUserName",
    description: "Unique username of user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "john@mail.com",
    description: "Email address of user",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
