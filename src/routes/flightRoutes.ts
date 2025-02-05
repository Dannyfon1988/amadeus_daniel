import express, { Router } from "express";
import { getFlights } from "../controllers/flightSearchController";
import { analyzeFlights } from "../controllers/flightController";

const router: Router = express.Router();

router.get("/search", getFlights);
router.get("/analyze", analyzeFlights);

export default router;
