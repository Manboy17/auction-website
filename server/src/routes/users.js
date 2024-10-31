import express from 'express';
import {getAllWins, handleLogin, handleNewUser} from '../controllers/usersController.js';
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/users', handleNewUser);
router.post('/tokens', handleLogin);
router.get('/wins/users/:id', verifyToken, getAllWins);

export default router;