import express, { Request, Response } from "express";
export const app = express();
import cors from "cors";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";

const APP_PORT = 8000;
app.use(cors());
app.use(express.json());

env.config();

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/staff", async (req: Request, res: Response) => {
  const { data: staff } = await supabase.from("staff").select("*");
  console.log(staff);
  return res.status(200).json(staff);
});

app.get("/redeem", async (req: Request, res: Response) => {
  const { data: redeemed } = await supabase.from("redeemed").select("*");
  console.log(redeemed);
  return res.status(200).json(redeemed);
});

// redeem endpoint that checks if staff's team_name is in supabase table 'redeemd'
app.post("/redeem", async (req: Request, res: Response) => {
  const { staff_pass_id, team_name } = req.body;

  if (!staff_pass_id || !team_name) {
    return res
      .status(400)
      .json({ success: false, error: "Empty request body" });
  }

  const { data: redeemedTeam, error } = await supabase
    .from("redeemed")
    .select("*");

  const teamExists = redeemedTeam?.find((team) => team.team_name === team_name);

  if (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }

  if (teamExists) {
    return res
      .status(200)
      .json({ success: false, error: "Team already redeemed" });
  }

  const { error: insertError } = await supabase
    .from("redeemed")
    .insert([{ team_name: team_name, redeemed_by: staff_pass_id }]);

  if (insertError) {
    console.log(insertError);
    return res.status(500).json({ success: false, error: insertError.message });
  }

  return res
    .status(201)
    .json({ success: true, message: "Redeemed successfully" });
});
if (process.env.NODE_ENV !== "test") {
  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
}
