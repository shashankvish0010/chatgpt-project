import express from 'express';
import { Hercai } from 'hercai';
const users = require('../models/users');
const router = express.Router();

interface chatType {
    question: String;
    response: String;
}

router.get('/chat/search/:userid', async (req, res) => {
    const { query } = req.body;
    const { userid } = req.params;
    if (!userid) {
        res.json({ success: false, message: "Please login to access." })
    } else {
        if (!query) {
            res.json({ success: false, message: "No query recieved." })
        } else {
            const user = await users.findOne({ _id: userid });
            if (user) {
                const searchArray: chatType[] = [];
                user.chats?.map((data: { chatid: String, chatarray: chatType[] }) => {
                    data.chatarray?.map((chat: chatType) => {
                        if (chat.question.toLowerCase().includes(query.toLowerCase()) ||
                            chat.response.toLowerCase().includes(query.toLowerCase())) {
                            searchArray.push(chat)
                        }
                    })
                });
                searchArray.length > 0 ? res.json({ success: true, message: "Searched Chat", searchArray }) : res.json({ success: false, message: "No Searched Post" });
            } else {
                res.json({ success: false, message: "No user found." })
            }
        }
    }
})

module.exports = router;