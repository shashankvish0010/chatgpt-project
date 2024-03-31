"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hercai_1 = require("hercai");
const users = require('../models/users');
const router = express_1.default.Router();
router.post('/chat/ai/:userid/:chatid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    const { userid, chatid } = req.params;
    if (!userid || !chatid) {
        res.json({ success: false, message: "Please login to access." });
    }
    else {
        if (!question) {
            res.json({ success: false, message: "Please provide a prompt to chat." });
        }
        else {
            console.log(userid, chatid);
            const hercai = new hercai_1.Hercai();
            hercai.question({ model: "v3", content: question }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                if (response.reply) {
                    const user = yield users.findOne({ _id: userid });
                    if (user) {
                        const chatIndex = yield user.chats.findIndex((chat) => chat.chatId === chatid);
                        if (chatIndex !== -1) {
                            yield user.chats[chatIndex].chatarray.push({ question, response: response.reply });
                            const result = yield user.save();
                            const updatedUser = yield users.findOne({ _id: userid });
                            const chatarray = [];
                            updatedUser.chats.map((data) => {
                                if (data.chatId == chatid) {
                                    chatarray.push(data);
                                }
                            });
                            if (result) {
                                res.json({ success: true, chatarray, message: "Chat saved" });
                            }
                        }
                        else {
                            yield user.chats.push({ chatId: chatid, chatarray: [{ question, response: response.reply }] });
                            const result = yield user.save();
                            const updatedUser = yield users.findOne({ _id: userid });
                            const chatarray = [];
                            updatedUser.chats.map((data) => {
                                if (data.chatId == chatid) {
                                    chatarray.push(data);
                                }
                            });
                            if (result && chatarray) {
                                res.json({ success: true, chatarray, message: "New Chat saved" });
                            }
                        }
                    }
                }
            })).catch((error) => console.log(error));
        }
    }
}));
module.exports = router;
