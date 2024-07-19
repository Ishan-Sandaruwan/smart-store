import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    enum: ['Manager', 'Cashier', 'Worker'],
    default: 'Worker',
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: String,
  nic: String
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
