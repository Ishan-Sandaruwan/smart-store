import express from 'express';
import { getCustomer, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/user/:type', getUsers);
router.get('/customer', getCustomer);

export default router;