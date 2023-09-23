const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const { body } = require('express-validator');
const checkAuth = require('../middlewares/checkAuth');
const requireAuth = require("../middlewares/requireAuth")
const { RenderRegister, RenderLogin, UserRegister, UserLogin, RenderDash,userLogout } = require('../controllers/auth');
let validationArray = [ body("username").notEmpty().trim().escape(),  body("email").notEmpty().trim().escape(),body("password").isLength({ min: 4 })]
router.get('/register', checkAuth,RenderRegister);
router.get('/login', checkAuth,RenderLogin);
router.post('/register', upload.single('image'), validationArray, UserRegister);
router.post('/login',validationArray[0], UserLogin);
router.get('/dashboard',requireAuth,RenderDash)
router.get('/logout', userLogout);












module.exports = router;