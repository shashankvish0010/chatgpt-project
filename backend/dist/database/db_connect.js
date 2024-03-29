"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const options: mongoose.ConnectOptions = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };
mongoose_1.default.connect('mongodb://127.0.0.1:27017/chatGPT').then(() => console.log("Database connected")).catch((error) => console.log(error));
