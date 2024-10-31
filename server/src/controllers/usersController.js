import {users} from "../models/users.js";
import {items} from '../models/items.js';
import {validateUser} from "../schemas.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const handleNewUser = async (req, res) => {
    const {email, password, repeatedPassword} = req.body;

    if(password !== repeatedPassword)  return res.status(400).json({ message: "Passwords do not match." });

    const valid = validateUser({email, password});

    if(!valid) {
        return res.status(400).json({ message: "Email and password are required", errors: validateUser.errors });
    }

    const duplicate = users.find((user) => user.email === email);

    if(duplicate) return res.status(409).json({ message: "User already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        email,
        isAdmin: false,
        password: hashedPwd,
        wins: []
    };

    users.push(newUser);

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin, password: newUser.password },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
    );

    res.status(201).json({newUser, token});
};

export const handleLogin = async (req, res) => {
    const {email, password} = req.body;

    const valid = validateUser({email, password});

    if(!valid) {
        return res.status(400).json({ message: "Email and password are required", errors: validateUser.errors });
    }

    const foundUser = users.find((user) => user.email === email);
    if(!foundUser) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if(!match) return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
        {id: foundUser.id, email: foundUser.email, isAdmin: foundUser.isAdmin, password: foundUser.password},
        process.env.JWT_SECRET,
        {expiresIn: "12h"}
    );

    res.status(200).json({id: foundUser.id, email: foundUser.email, isAdmin: foundUser.isAdmin, token});
};

export const getAllWins = (req, res) => {
    const {id} = req.params; // user id

    const foundUser = users.find((user) => user.id === parseInt(id, 10));

    if(!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const currentTime = new Date();

    items.forEach((item) => {
        const endTime = new Date(item.endTime);

        if (currentTime >= endTime && item.bids.length > 0) {
            const highestBid = item.bids[item.bids.length - 1];

            if(highestBid.creator === foundUser.email) {
                const itemAlreadyWon = foundUser.wins.some((win) => win.itemName === item.name);

                if (!itemAlreadyWon) {
                    foundUser.wins.push({
                        id: foundUser.wins.length + 1,
                        itemName: item.name,
                        price: highestBid.price
                    });
                }
            }
        }
    });

    const totalAmount = foundUser.wins.reduce((total, win) => total + win.price, 0);

    return res.status(200).json({
        wins: foundUser.wins,
        totalAmount
    });
};