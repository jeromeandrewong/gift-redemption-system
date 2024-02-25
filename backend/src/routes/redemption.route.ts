import express from "express";
import {
  getRedemptions,
  postRedemptions,
} from "../controllers/redemption.controller";

const router = express.Router();

router.get("/redemption", getRedemptions);
router.post("/redemption", postRedemptions);

export default router;
