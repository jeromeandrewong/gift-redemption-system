import { Request, Response } from "express";
import { supabase } from "../app";

export const getStaff = async (req: Request, res: Response) => {
  try {
    const { data: staffData, error } = await supabase.from("staff").select("*");

    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }

    // shouldnt return 404 here because it is misleading. 404 implies that
    // the resource was not found. In this case, the resource was found but
    // the data was empty
    // if (!staffData) {
    //   return res
    //     .status(404)
    //     .json({ success: false, error: "No staff data found" });
    // }

    return res.status(200).json(staffData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};
