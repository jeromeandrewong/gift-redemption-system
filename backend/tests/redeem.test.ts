import { test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

test("POST /redeem should return 400 if staff_pass_id or team_name is not provided", async ({
  expect,
}) => {
  const response = await supertest(app).post("/redeem").send({});

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("success");
  expect(response.body.success).toBe(false);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Empty request body");
});

test("POST /redeem should return 200 if team already redeemed but with success flag false", async ({
  expect,
}) => {
  const staff_pass_id = "test_id";
  const team_name = "test_team";

  // First redeem the team
  await supertest(app).post("/redeem").send({ staff_pass_id, team_name });

  // Try to redeem the same team again
  const response = await supertest(app)
    .post("/redeem")
    .send({ staff_pass_id, team_name });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("success");
  expect(response.body.success).toBe(false);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe("Team already redeemed");
});
