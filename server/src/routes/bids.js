import express from 'express';
import {createNewBid, getAllBids, sse} from "../controllers/bidsController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/computers/:id", verifyToken, createNewBid);
router.get("/computers/:id", getAllBids);
router.get("/computers/:id/monitor", sse);

export default router;