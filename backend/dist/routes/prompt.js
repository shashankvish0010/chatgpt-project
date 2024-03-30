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
router.post('/save/prompt/:userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt_name, prompt } = req.body;
    const { userid } = req.params;
    if (!userid) {
        res.json({ success: false, message: "Please login to access." });
    }
    else {
        if (!prompt_name || !prompt) {
            res.json({ success: false, message: "Provide valid name and prompt." });
        }
        else {
            const user = yield users.findOne({ _id: userid });
            if (user) {
                const chatIndex = yield user.prompts.findIndex((prompt) => prompt.prompt_name === prompt_name);
                if (chatIndex !== -1) {
                    res.json({ success: false, message: "Prompt name already exists." });
                }
                else {
                    yield user.prompts.push({ prompt_name, prompt });
                    const result = yield user.save();
                    if (result) {
                        res.json({ success: true, message: "Prompt saved." });
                    }
                }
            }
        }
    }
}));
module.exports = router;
