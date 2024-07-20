import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;