import { test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

test("POST /redemption should return 400 if staff_pass_id or team_name is not provided", async ({
  expect,
}) => {
  const response = await supertest(app).post("/redemption").send({});

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Empty request body");
});

test("POST /redemption should return 409 if team already redeemed", async ({
  expect,
}) => {
  const staff_pass_id = "test_id";
  const team_name = "test_team";

  // First redeem the team
  await supertest(app).post("/redemption").send({ staff_pass_id, team_name });

  // Try to redeem the same team again
  const response = await supertest(app)
    .post("/redemption")
    .send({ staff_pass_id, team_name });

  expect(response.status).toBe(409);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Team already redeemed");
});
