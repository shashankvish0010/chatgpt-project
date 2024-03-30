import express, {Express} from "express";
import dotenv from 'dotenv'
const db = require('./database/db_connect')
const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(require('./routes/user'));
app.use(require('./routes/chatAi'));
app.listen(process.env.PORT, ()=> console.log("Server running"));