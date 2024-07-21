import { addAttendance,deleteAttendance,getAttendance,updateAttendance } from "../controllers/attendanceController.js";
import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/mark',verifyToken,addAttendance);
router.delete('/delete/:attId',verifyToken,deleteAttendance);
router.put('/update/:attId',verifyToken,updateAttendance);
router.get('/get/:time',verifyToken,getAttendance)

export default router;
