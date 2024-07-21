import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { calculateAndSaveSalary,getSalary } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/addSalary',verifyToken,calculateAndSaveSalary);
router.get('/get/:time',verifyToken,getSalary);

export default router;