import User from "../models/User.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  try {
    const { password, mobile , ...rest } = req.body;

    // Hash the password
    const hashpass = bcryptjs.hashSync(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      ...rest,
      password: hashpass,
      mobile
    });

    // Save the new user
    await newUser.save();

    res.send({ message: "user added" });
  } catch (error) {
    next(error);
  }
}
