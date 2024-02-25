import { test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

test("GET /staff should return all staff", async ({ expect }) => {
  const response = await supertest(app).get("/staff");
  const body = response.body;
  const staff = body[0];

  expect(response.status).toBe(200);
  expect(body).toBeInstanceOf(Array);
  expect(body.length).toBeGreaterThan(0);

  expect(staff).toHaveProperty("staff_pass_id");
  expect(staff).toHaveProperty("team_name");
  expect(staff).toHaveProperty("created_at");
});
