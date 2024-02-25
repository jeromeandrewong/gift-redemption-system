import express, { Request, Response } from "express";
export const app = express();
import cors from "cors";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";
import staffRoutes from "./routes/staff.route";
import redemptionRoutes from "./routes/redemption.route";

const APP_PORT = 8000;
env.config();

app.use(cors());
app.use(express.json());

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

app.use(staffRoutes);
app.use(redemptionRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
}
