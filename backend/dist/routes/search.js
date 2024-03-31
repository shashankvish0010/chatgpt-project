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
const users = require('../models/users');
const router = express_1.default.Router();
router.post('/chat/search/:userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query } = req.body;
    const { userid } = req.params;
    if (!userid) {
        res.json({ success: false, message: "Please login to access." });
    }
    else {
        if (!query) {
            res.json({ success: false, message: "No query recieved." });
        }
        else {
            const user = yield users.findOne({ _id: userid });
            if (user) {
                const searchArray = [];
                (_a = user.chats) === null || _a === void 0 ? void 0 : _a.map((data) => {
                    var _a;
                    (_a = data.chatarray) === null || _a === void 0 ? void 0 : _a.map((chat) => {
                        if (chat.question.toLowerCase().includes(query.toLowerCase()) ||
                            chat.response.toLowerCase().includes(query.toLowerCase())) {
                            searchArray.push(chat);
                        }
                    });
                });
                searchArray.length > 0 ? res.json({ success: true, message: "Searched Chat", searchArray }) : res.json({ success: false, message: "No Searched Post" });
            }
            else {
                res.json({ success: false, message: "No user found." });
            }
        }
    }
}));
module.exports = router;
