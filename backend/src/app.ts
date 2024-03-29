import express, {Express} from "express";
const db = require('./database/db_connect')
const app: Express = express();

app.use(express.json());
app.use(require('./routes/user'));

app.listen(8080, ()=> console.log("Server running"));