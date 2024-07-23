import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductByCate, updatePrice } from '../controllers/productController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/getProduct/:productId', getProduct);
router.get('/getProducts', getProductByCate);
router.delete('/deleteProduct/:productId', verifyToken, deleteProduct);
router.put('/update/:productId', verifyToken, updatePrice);
router.post('/add', verifyToken, addProduct);


export default router;