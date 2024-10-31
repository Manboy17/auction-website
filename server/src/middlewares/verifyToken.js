import jwt from 'jsonwebtoken';
import {users} from "../models/users.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403); // invalid token

        const user = users.find((user) => user.id === decoded.id);
        req.user = {
            email: decoded.email,
            isAdmin: user.isAdmin
        };
        next();
    });
};