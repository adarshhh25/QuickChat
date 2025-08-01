import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.json({success: false, message: "Unauthorized access"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error during token verification:", error);
        res.json({success: false, message: "Internal server error"});
    }
}


export { protectRoute};