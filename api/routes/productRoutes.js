import express from 'express';
import { addProduct, deleteProduct, getProduct, updatePrice } from '../controllers/productController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/getProduct/:productId', getProduct);
router.get('/getProducts', getProduct);
router.delete('/getProduct/:productId', verifyToken, deleteProduct);
router.put('/update/:productId', verifyToken, updatePrice);
router.post('/add', verifyToken, addProduct);


export default router;