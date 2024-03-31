import express from 'express';
import { Hercai } from 'hercai';
const users = require('../models/users');
const router = express.Router();

interface chatsType {
    chatId: String;
    chatarray: [
        {
            question: String
            response: String
        }
    ]
}

router.post('/chat/ai/:userid/:chatid', async (req, res) => {
    const { question } = req.body;
    const { userid, chatid } = req.params;
    if (!userid || !chatid) {
        res.json({ success: false, message: "Please login to access." })
    } else {
        if (!question) {
            res.json({ success: false, message: "Please provide a prompt to chat." })
        } else {
            console.log(userid, chatid);
            const hercai = new Hercai();
            hercai.question({ model: "v3", content: question }).then(async (response) => {
                if (response.reply) {
                    const user = await users.findOne({ _id: userid });
                    if (user) {
                        const chatIndex = await user.chats.findIndex((chat: chatsType) => chat.chatId === chatid);
                        if (chatIndex !== -1) {
                            await user.chats[chatIndex].chatarray.push({ question, response: response.reply });
                            const result = await user.save();
                            const updatedUser = await users.findOne({_id: userid})
                            const chatarray : any[] = []; 
                            updatedUser.chats.map((data: any) => {
                                if(data.chatId == chatid) {
                                    chatarray.push(data);
                                }
                            });
                            if (result) {
                                res.json({ success: true,chatarray , message: "Chat saved" })
                            }
                        } else {
                            await user.chats.push({ chatId: chatid, chatarray: [{ question, response: response.reply }] });
                            const result = await user.save();
                            const updatedUser = await users.findOne({_id: userid})                           
                            const chatarray : any[] = []; 
                            updatedUser.chats.map((data: any) => {
                                if(data.chatId == chatid) {
                                    chatarray.push(data);
                                }
                            });
                            if (result && chatarray) {
                                res.json({ success: true, chatarray, message: "New Chat saved" })
                            }
                        }
                    }
                }

            }).catch((error) => console.log(error))
        }
    }
})

module.exports = router;