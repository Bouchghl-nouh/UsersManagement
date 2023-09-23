const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const requireAuth  = require("../middlewares/requireAuth");
const { AddingUser,deleteUser,getEditUser,EditUser } = require("../controllers/CrudUser");

router.post('/dashboard', upload.single("image"), requireAuth, AddingUser);
router.delete('/user/delete', requireAuth, deleteUser);
router.get('/edit_user/:id', requireAuth,getEditUser);
router.post('/edit_user/:id',upload.single('image'),requireAuth, EditUser);


module.exports = router;