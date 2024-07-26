import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createOrder } from '../controllers/OrderController.js';

const router = express.Router();

router.post('/addOrder',verifyToken,createOrder);

export default router;
