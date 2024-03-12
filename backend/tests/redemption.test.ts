import { test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

// should Mock this test so that it doesn't affect the actual database (potential issue might pass but might not work)
test("POST /redemption should return 400 if staff_pass_id or team_name is not provided", async ({
  expect,
}) => {
  // act
  const response = await supertest(app).post("/redemption").send({});

  // assert
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Empty request body");
});

test("POST /redemption should return 409 if team already redeemed", async ({
  expect,
}) => {
  // arrange
  const staff_pass_id = "test_id";
  const team_name = "test_team";

  // First redeem the team
  await supertest(app).post("/redemption").send({ staff_pass_id, team_name });

  // act
  // Try to redeem the same team again
  const response = await supertest(app)
    .post("/redemption")
    .send({ staff_pass_id, team_name });

  // assert
  expect(response.status).toBe(409);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Team already redeemed");
});
