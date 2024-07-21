import { addAttendance } from "../controllers/attendanceController.js";
import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/mark',verifyToken,addAttendance);

export default router;
