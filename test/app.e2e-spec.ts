import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  const user1 = {
    email: "h.holland@handelblattgroup.com",
    username: "heiko.holland",
    firstname: "Heiko",
    lastname: "Holland",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const user2 = {
    email: "not.h.holland@handelblattgroup.com",
    username: "not.heiko.holland",
    firstname: "Heiko",
    lastname: "Holland",
    createdAt: undefined,
    updatedAt: undefined,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/users (GET)", () => {
    return request(app.getHttpServer())
      .get("/users")
      .expect(200)
      .expect(JSON.stringify([]));
  });

  it("/users (POST) - empty body", () => {
    return request(app.getHttpServer())
      .post("/users")
      .expect(400)
      .expect((res) => {
        expect(res.body.message.length).toBe(8);
        expect(res.body.message).toContain("firstname should not be empty");
        expect(res.body.error).toBe("Bad Request");
      });
  });

  it("/users (POST) - first user", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send(user1)
      .expect(200)
      .expect((res) => {
        user1.createdAt = res.body.createdAt;
        user1.updatedAt = res.body.updatedAt;
        expect(res.body).toEqual({ id: 1, ...user1 });
      });
  });

  it("/users (POST) - first user - again -> error", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send(user1)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toContain(
          "Cannot create user due to unique constraint failures!"
        );
        expect(res.body.error).toBe("Already exists");
      });
  });

  it("/users (POST) - second user", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send(user2)
      .expect(200)
      .expect((res) => {
        user2.createdAt = res.body.createdAt;
        user2.updatedAt = res.body.updatedAt;
        expect(res.body).toEqual({ id: 2, ...user2 });
      });
  });

  it("/users (POST) - invalid user", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send({ ...user2, username: 123 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain("username must be a string");
      });
  });

  it("/users/:username (GET) - first user", () => {
    return request(app.getHttpServer())
      .get(`/users/${user1.username}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ id: 1, ...user1 });
      });
  });

  it("/users/:username (GET) - unknown user", () => {
    return request(app.getHttpServer())
      .get(`/users/unknown`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toContain("User not found");
      });
  });

  it("/users/:userId (PATCH) - second user", () => {
    return request(app.getHttpServer())
      .patch(`/users/2`)
      .send({
        username: "updated",
        firstname: "H31K0",
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.affected).toEqual(1);
      });
  });

  it("/users/:userId (PATCH) - not existing user", () => {
    return request(app.getHttpServer())
      .patch(`/users/3`)
      .send({
        username: "updated",
        firstname: "H31K0",
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.affected).toEqual(0);
      });
  });

  it("/users/:userId (DELETE) - second user", () => {
    return request(app.getHttpServer())
      .delete(`/users/2`)
      .expect(200)
      .expect((res) => {
        expect(res.body.affected).toEqual(1);
      });
  });

  it("/users/:userId (DELETE) - not existing user", () => {
    return request(app.getHttpServer())
      .delete(`/users/3`)
      .expect(200)
      .expect((res) => {
        expect(res.body.affected).toEqual(0);
      });
  });
});
