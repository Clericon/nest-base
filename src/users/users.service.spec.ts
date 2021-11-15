import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QueryFailedError } from "typeorm";
import { User } from "./entities/user";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let module: TestingModule;

  const user1 = {
    email: "h.holland@handelblattgroup.com",
    username: "heiko.holland",
    firstname: "Heiko",
    lastname: "Holland",
  };

  const user2 = {
    email: "not.h.holland@handelblattgroup.com",
    username: "not.heiko.holland",
    firstname: "Heiko",
    lastname: "Holland",
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return 0 users", async () => {
    const users = await service.getAllUsers();
    expect(users.length).toBe(0);
  });

  it("should create user", async () => {
    const user = await service.createUser(user1);

    expect(user.id).toBe(1);
    expect(user.email).toBe(user1.email);
    expect(user.username).toBe(user1.username);
    expect(user.firstname).toBe(user1.firstname);
    expect(user.lastname).toBe(user1.lastname);

    const users = await service.getAllUsers();
    expect(users.length).toBe(1);
  });

  it("should not create second user", async () => {
    try {
      await service.createUser(user1);
    } catch (error) {
      expect(error).toBeInstanceOf(QueryFailedError);
      expect(error.code).toBe("SQLITE_CONSTRAINT");

      const users = await service.getAllUsers();
      expect(users.length).toBe(1);
    }
  });

  it("should create second user", async () => {
    const user = await service.createUser(user2);
    expect(user.id).toBe(2);
    expect(user.email).toBe(user2.email);
    expect(user.username).toBe(user2.username);
    expect(user.firstname).toBe(user2.firstname);
    expect(user.lastname).toBe(user2.lastname);

    const users = await service.getAllUsers();
    expect(users.length).toBe(2);
  });

  it("should find first user", async () => {
    const user = await service.getUserByName(user1.username);
    expect(user.id).toBe(1);
    expect(user.email).toBe(user1.email);
    expect(user.username).toBe(user1.username);
    expect(user.firstname).toBe(user1.firstname);
    expect(user.lastname).toBe(user1.lastname);
  });

  it("should not find unknown user", async () => {
    const user = await service.getUserByName("unknown");
    expect(user).toBeUndefined();
  });

  it("should update second user", async () => {
    const result = await service.updateUserById(2, {
      username: "updated",
      firstname: "H31K0",
    });
    expect(result.affected).toBe(1);

    const user = await service.getUserByName("updated");
    expect(user.id).toBe(2);
    expect(user.email).toBe(user2.email);
    expect(user.username).toBe("updated");
    expect(user.firstname).toBe("H31K0");
    expect(user.lastname).toBe(user2.lastname);
  });

  it("should not update not existing user", async () => {
    const result = await service.updateUserById(3, {
      username: "updated",
      firstname: "H31K0",
    });
    expect(result.affected).toBe(0);
  });

  it("should delete second user", async () => {
    const result = await service.deleteUserById(2);
    expect(result.affected).toBe(1);

    const users = await service.getAllUsers();
    expect(users.length).toBe(1);

    const user = await service.getUserByName("updated");
    expect(user).toBeUndefined();
  });

  it("should not delete not existing user", async () => {
    const result = await service.deleteUserById(3);
    expect(result.affected).toBe(0);

    const users = await service.getAllUsers();
    expect(users.length).toBe(1);
  });
});
