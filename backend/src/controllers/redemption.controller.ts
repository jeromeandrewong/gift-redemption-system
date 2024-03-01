import { Request, Response } from "express";
import { supabase } from "../app";

export const getRedemptions = async (req: Request, res: Response) => {
  const { data: redeemed } = await supabase.from("redeemed").select("*");
  console.log(redeemed);
  return res.status(200).json(redeemed);
};

export const postRedemptions = async (req: Request, res: Response) => {
  const { staff_pass_id, team_name } = req.body;

  if (!staff_pass_id || !team_name) {
    return res
      .status(400)
      .json({ success: false, error: "Empty request body" });
  }

  const { data: redeemedTeam, error } = await supabase
    .from("redeemed")
    .select("*")
    .eq("team_name", team_name)
    .limit(1);

  if (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }

  if (redeemedTeam.length) {
    return res
      .status(409)
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
};
