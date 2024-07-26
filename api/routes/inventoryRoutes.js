import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addNewStock, addStock, checkInventoryOfAll, checkInventoryOfOne, reduceQuantity,getLow,getByCategory } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/addNew', verifyToken, addNewStock);
router.get('/getOne/:productId', verifyToken, checkInventoryOfOne);
router.get('/getAll', verifyToken, checkInventoryOfAll);
router.get('/getCategory',verifyToken,getByCategory);
router.get('/getLow', verifyToken, getLow);
router.put('/reduse/:productId', verifyToken, reduceQuantity);
router.put('/add/:productId', verifyToken, addStock);

export default router;
