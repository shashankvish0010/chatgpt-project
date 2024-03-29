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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = require('../models/users');
const router = express_1.default.Router();
router.get('/start/be', (req, res) => res.json({ success: true, message: "BE started" }));
router.post('/user/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, confirmpass } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmpass) {
        res.json({ success: false, message: "Fill all the feilds" });
    }
    else {
        try {
            const user = yield users.findOne({ email });
            if (user) {
                res.json({ success: false, message: "User alredy exists" });
            }
            else {
                if (password == confirmpass) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hashpassword = yield bcrypt_1.default.hash(password, salt);
                    const user = new users({ firstname, lastname, email, password });
                    const result = yield user.save();
                    if (result) {
                        res.json({ success: true, message: "Regsistered successfully" });
                    }
                    else {
                        res.json({ success: false, message: "User regsiteration failed" });
                    }
                }
                else {
                    res.json({ success: false, message: "Password doesn't match" });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}));
module.exports = router;
