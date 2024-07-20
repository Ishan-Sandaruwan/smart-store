import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { password, mobile, ...rest } = req.body;

        if (!password || !mobile) {
            return next(errorHandler(400, 'Password and mobile are required'));
        }

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

        res.send({ message: "User added" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { mobile, password } = req.body;
        if (!mobile || !password) {
            return next(errorHandler(400, 'All fields are required'));
        }

        const validUser = await User.findOne({ mobile });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        const { password: pass, ...rest } = validUser._doc;
        let piority = 3;
        if (validUser.type === "admin") {
            piority = 1;
        } else if (validUser.type === "cashier") {
            piority = 2;
        }

        // Create JWT token without expiration
        const token = jwt.sign({ id: validUser._id, access: piority }, process.env.JWT_SECRET);

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
        }).json({ ...rest });
    } catch (error) {
        next(error);
    }
};
