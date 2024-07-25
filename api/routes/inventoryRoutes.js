import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addNewStock, addStock, checkInventoryOfAll, checkInventoryOfOne, reduceQuantity } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/addNew', verifyToken, addNewStock);
router.get('/getOne/:productId', verifyToken, checkInventoryOfOne);
router.get('/getAll', verifyToken, checkInventoryOfAll);
router.put('/reduse/:productId', verifyToken, reduceQuantity);
router.put('/add/:productId', verifyToken, addStock);

export default router;
