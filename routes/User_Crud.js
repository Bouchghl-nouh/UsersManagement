const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const requireAuth  = require("../middlewares/requireAuth");
const { AddingUser,deleteUser,getEditUser,EditUser,sortedUser,sortedUserAge,search } = require("../controllers/CrudUser");

router.post('/dashboard', upload.single("image"), requireAuth, AddingUser);
router.delete('/user/delete', requireAuth, deleteUser);
router.get('/edit_user/:id', requireAuth,getEditUser);
router.post('/edit_user/:id', upload.single('image'), requireAuth, EditUser);
router.get('/sortByName', requireAuth, sortedUser);
router.get('/sortByAge', requireAuth, sortedUserAge);
router.post('/search',requireAuth,search);

module.exports = router;