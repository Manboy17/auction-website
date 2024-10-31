import express from "express";
import {createItem, deleteItem, getAllItems, getItemById, updateItem} from "../controllers/itemsController.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {veryIfAdmin} from "../middlewares/verifyIfAdmin.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", verifyToken, veryIfAdmin ,createItem);
router.put("/:id", verifyToken, veryIfAdmin, updateItem);
router.delete("/:id", verifyToken, veryIfAdmin, deleteItem);

export default router;