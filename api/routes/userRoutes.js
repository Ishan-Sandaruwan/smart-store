import express from 'express';
import { addPoints, getCustomer, getUsers, updateCustomer } from '../controllers/userController.js';

const router = express.Router();

router.get('/user/:type', getUsers);
router.get('/customer', getCustomer);
router.put('/update/:userId', updateCustomer);
router.put('/addPoints/:userId', addPoints);

export default router;