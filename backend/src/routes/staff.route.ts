import express from "express";
import { getStaff } from "../controllers/staff.controller";

const router = express.Router();

router.get("/staff", getStaff);

export default router;
