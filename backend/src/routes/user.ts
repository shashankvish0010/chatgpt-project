import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const users = require('../models/users');
const router = express.Router();

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
                    const user = new users({ firstname, lastname, email, password });
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

module.exports = router;