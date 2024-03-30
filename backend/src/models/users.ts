import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
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

const users = mongoose.model("users", userschema);

module.exports = users;