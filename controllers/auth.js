const jwt = require('jsonwebtoken');
const xss = require('xss');
const bcrypt = require('bcrypt');
const {validationResult } = require('express-validator');
// const Post = require('../models/Auth')
const AdminLayout = '../views/layouts/main_App.ejs';
const { insertAdminData, findAdmin } = require('../Api/AuthApi');
const {GetUsers} = require('../Api/UserApi')
exports.RenderRegister = (req, res) => {
    res.render('./auth/register')
}
exports.RenderLogin = (req, res) => {
    res.render('./auth/login');
}
exports.UserLogin =async(req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send("you are not registered . please register");
    }
    const secureData = {
        username: xss(username),
        password: xss(password)
    };
    const admin = await findAdmin(secureData.username);
    if (!admin) {
        return res.send("You are not registered");
    }
    bcrypt.compare(secureData.password, admin.password).then((valid) => {
        if (!valid) {
            return res.send("password incorrect");
        }
    })
    const token = jwt.sign({
        username: admin.username, image: admin.image}, process.env.secretKey);
    res.cookie("token", token);
    return res.redirect("dashboard");
}
exports.UserRegister = async(req, res) => {
    const { username, email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).send("the information you provided us are wrong")
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const image = req.file.filename;
    const secureData = {
        username: xss(username),
        email: xss(email),
        password: xss(hashPassword),
        image:xss(image)
    }
    insertAdminData(secureData);
    return res.redirect('login');
}
exports.RenderDash = async(req, res) => {
    const user = req.decoded;
    const users = await GetUsers();
    // res.render('layouts/main_App', { user,users,layout: AdminLayout });
    res.render('./app/dashboard', { user, users, layout: AdminLayout });
}
exports.userLogout = (req, res) => {
    res.clearCookie("token");
    return res.redirect('login')
}