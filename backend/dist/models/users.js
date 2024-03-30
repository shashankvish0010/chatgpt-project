"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userschema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [
        {
            chatId: { type: String },
            chatarray: [{
                    question: {
                        required: true,
                        type: String
                    },
                    response: {
                        required: true,
                        type: String
                    },
                }]
        }
    ]
});
const users = mongoose_1.default.model("users", userschema);
module.exports = users;
