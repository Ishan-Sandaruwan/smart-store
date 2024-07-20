import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addEmployee ,updateEmp,deleteEmp,getEmp,getEmployee} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/create', verifyToken, addEmployee);
router.put('/update/:empId',verifyToken,updateEmp);
router.delete('/delete/:empId',verifyToken,deleteEmp);
router.get('/get',getEmp);
router.get('/search',getEmployee);


export default router;