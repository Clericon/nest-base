import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "./entities/user";
import { DeleteResultResponse } from "./schemas/deleteResult.response";
import { ErrorResponse } from "./schemas/error.response";
import { UpdateResultResponse } from "./schemas/updateResult.response";
import { UserRegistration } from "./schemas/userRegistration.payload";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all User",
    isArray: true,
    type: User,
  })
  public getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200, description: "Creates a User", type: User })
  @ApiBadRequestResponse({
    description: "One or more required properties are missing or invalid",
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: "Username or email address are already taken",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Unexptected error occured",
    type: ErrorResponse,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createUser(@Body() payload: UserRegistration): Promise<User> {
    try {
      return await this.usersService.createUser(payload);
    } catch (error) {
      if (error.errno === 19) {
        throw new ForbiddenException(
          ["Cannot create user due to unique constraint failures!"],
          "Already exists"
        );
      } else {
        throw new InternalServerErrorException(["Unexpected error occured!"]);
      }
    }
  }

  @Get(":username")
  @ApiResponse({
    status: 200,
    description: "The User",
    type: User,
  })
  @ApiNotFoundResponse({ description: "No user found", type: ErrorResponse })
  public async getUserByName(
    @Param("username") username: string
  ): Promise<User> {
    const user = await this.usersService.getUserByName(username);
    if (!user) {
      throw new NotFoundException(["User not found"]);
    }
    return user;
  }

  @Patch(":userId")
  @ApiResponse({
    status: 200,
    description: "Updates a User",
    type: UpdateResultResponse,
  })
  @ApiBadRequestResponse({
    description: "Properties are invalid",
    type: ErrorResponse,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public updateUserById(
    @Param("userId") userId: string,
    @Body() body: Partial<User>
  ): Promise<UpdateResult> {
    return this.usersService.updateUserById(parseInt(userId, 10), body);
  }

  @Delete(":userId")
  @ApiResponse({
    status: 200,
    description: "Deletes a User",
    type: DeleteResultResponse,
  })
  public deleteUserById(
    @Param("userId") userId: string
  ): Promise<DeleteResult> {
    return this.usersService.deleteUserById(parseInt(userId, 10));
  }
}
