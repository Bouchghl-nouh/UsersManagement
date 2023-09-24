const Post = require('../models/Users');

function insertUserData(obj) {
    try {
        Post.create(obj);
    } catch (err) {
        console.error(err);
    }

}
async function GetUsers() {
    try {
        const users = await Post.find();
        return users;
    } catch (err) {
        console.error(err);
    }
}
async function GetUser(id) {
    try {
        const user = await Post.findOne({ _id: id })
        return user;
    } catch (err) {
        console.log(err);
    }
}
async function UpdateUser(id, newUser) {
    try {
        return await Post.updateOne({ _id: id }, { $set:{
            username: newUser.username,
            age: newUser.age,
            phoneNumber: newUser.phoneNumber,
            salary: newUser.salary,
            role: newUser.role,
            email: newUser.email,
            verified: newUser.verified,
            password: newUser.password,
            image: newUser.image
        }})

    } catch (err) {
        console.log(err);
    }
}
async function DeleteUser(id) {
    try {
        return await Post.deleteOne({_id:id});
    } catch (err) {
        console.log(err);
    }  
}

async function SortingByName() {
    try {
        const sortedUsers = await Post.aggregate([
            { $sort: { username: 1, age: 1 } }
        ]).exec();

        return sortedUsers;
    } catch (err) {
        console.error(err);
    }
}
async function SortingByAge() {
    try {
        const sortedUsers = await Post.aggregate([
            { $sort: { age: 1, username: 1 } }
        ]).exec();

        return sortedUsers;
    } catch (err) {
        console.error(err);
    }
}
async function Searching(name) {
    try {
        const searchedUsers = await Post.find({ username: { $regex: name, $options: 'i' } });
        return searchedUsers;
    } catch (err) {
        console.log(err);
    }
}
     module.exports = { insertUserData,GetUsers,DeleteUser,GetUser,UpdateUser,SortingByName,SortingByAge,Searching };