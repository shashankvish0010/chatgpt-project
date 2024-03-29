import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
const users = require('../models/users');
const router = express.Router();
dotenv.config();

router.get('/start/be', (req, res) => res.json({ success: true, message: "BE started" }))

router.post('/user/register', async (req, res) => {
    const { firstname, lastname, email, password, confirmpass } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmpass) {
        res.json({ success: false, message: "Fill all the feilds" });
    } else {
        try {
            const user = await users.findOne({ email });
            if (user) {
                res.json({ success: false, message: "User alredy exists" });
            } else {
                if (password == confirmpass) {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password, salt);
                    const user = new users({ firstname, lastname, email, password: hashpassword });
                    const result = await user.save();
                    if (result) {
                        res.json({ success: true, message: "Regsistered successfully" })
                    } else {
                        res.json({ success: false, message: "User regsiteration failed" })
                    }
                } else {
                    res.json({ success: false, message: "Password doesn't match" });
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
})

router.post('/user/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || ! password) {
        res.json({ success: false, message: "Fill all the feilds" });
    } else {
        try {
            const isUserExists = await users.findOne({email});
            if(isUserExists) {
                console.log(isUserExists);
                
                const isMatch = await bcrypt.compare(password, isUserExists.password);
                if(isMatch && process.env.USER_SECRET) {
                    const token = jwt.sign(isUserExists.id, process.env.USER_SECRET);
                    res.cookie("user", token)
                    res.json({ success: false, message: "Login successfully" });
                }else {
                    res.json({ success: false, message: "Password is incorrect" });
                }
            }else {
                res.json({ success: false, message: "User doesn't exists" });
            }
        } catch (error) {
            console.log(error);
        }
    }
})

module.exports = router;