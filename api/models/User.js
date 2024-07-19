import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  email:String,
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['customer', 'admin', 'cashier'],
    required: true,
    default: 'customer',
  },
  address: String,
  loyaltyPoints: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
