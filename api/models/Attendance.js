import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['full', 'half', 'no'],
        required: true,
        default: 'full',
    }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
