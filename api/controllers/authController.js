import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { password, mobile, ...rest } = req.body;

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

export const signin = async (req, res, next) => {
    try {
        const { mobile, password } = req.body;
        if (!mobile || mobile === '' || !password || password === '') {
            return next(errorHandler(400, 'all fields are required!!!'));
        }
        const validUser = await User.findOne({ mobile });
        if (!validUser) {
            return next(errorHandler(404, 'User not found!!!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const { password:pass, ...rest } = validUser._doc;
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json({ rest });
    } catch (error) {
        next(error);
    }
}