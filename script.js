require('dotenv').config();

const express = require("express");
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./config/db');
const cookies = require('cookie-parser');
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(expressLayout);
app.use(express.json());
app.use(cookies())
app.set('layout', './layouts/main_Auth.ejs');
app.set('view engine', 'ejs');

connectDB();
const AuthRouter = require('./routes/User_Auth');
app.use('/', AuthRouter);
const UserRouter = require("./routes/User_Crud");
app.use('/', UserRouter);
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})