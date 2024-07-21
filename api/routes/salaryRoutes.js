import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { calculateAndSaveSalary } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/addSalary',verifyToken,calculateAndSaveSalary);

export default router;