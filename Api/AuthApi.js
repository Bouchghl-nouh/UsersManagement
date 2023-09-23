const Post = require('../models/Auth');

function insertAdminData(obj) {
    try {
        Post.create(obj);
    } catch (err) {
        console.error(err);
    }

}
async   function findAdmin(name) {
    try {
        const admin = await Post.findOne({ username: name });
        return admin;
    }
    catch (err) {
        console.error(err);
    }
}

     module.exports = { insertAdminData, findAdmin };