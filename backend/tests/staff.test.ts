import { test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

test("GET /staff should return all staff", async ({ expect }) => {
  const response = await supertest(app).get("/staff");
  const data = response.body.data;
  const staff = data[0];

  expect(response.status).toBe(200);
  expect(data).toBeInstanceOf(Array);
  expect(data.length).toBeGreaterThan(0);

  expect(staff).toHaveProperty("staff_pass_id");
  expect(staff).toHaveProperty("team_name");
  expect(staff).toHaveProperty("created_at");
});
