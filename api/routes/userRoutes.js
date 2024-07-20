import express from 'express';
import { addPoints, getCustomer, getUsers, updateCustomer ,deleteUser} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/user/:type', getUsers);
router.get('/customer', getCustomer);
router.put('/update/:userId', updateCustomer);
router.put('/addPoints/:userId',verifyToken, addPoints);
router.delete('/delete/:userId',verifyToken,deleteUser);

export default router;