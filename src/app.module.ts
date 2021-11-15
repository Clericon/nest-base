import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
