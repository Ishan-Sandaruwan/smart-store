import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
// import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized: Invalid token'));
        }
        req.user = decoded;
        next();
    });
};


        // try {
        //     const user = await User.findById(decoded.id).select('type');
        //     if (!user) {
        //         return next(errorHandler(401, 'Unauthorized: User not found'));
        //     }
        //     if (user.type === "customer") {
        //         return next(errorHandler(403, 'Forbidden: Access denied'));
        //     } else {
        //         // req.user = user; // Attach user to the request if needed
        //         next();
        //     }
        // } catch (error) {
        //     return next(errorHandler(500, 'Internal Server Error'));
        // }