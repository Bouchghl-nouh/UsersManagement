const { insertUserData, DeleteUser,UpdateUser,SortingByName,SortingByAge,Searching } = require("../Api/UserApi");
const { GetUser } = require('../Api/UserApi');
const AdminLayout = '../views/layouts/main_App.ejs';
 const xss = require("xss");
exports.AddingUser = (req, res) => {
    const { username, age, phoneNumber, verified, salary, role, email, password } = req.body;
    const Valid = verified=="on" ? true : false;
    const NewUser = {
        username: xss(username),
        age: xss(age),
        phoneNumber:xss(phoneNumber),
        salary: xss(salary),
        role: xss(role),
        email: xss(email),
        password: xss(password),
        verified: Valid,
        image:xss(req.file.filename)
    }    

    insertUserData(NewUser);
    return res.redirect('dashboard');
}
exports.deleteUser = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    await DeleteUser(id);
    res.redirect('dashboard');
}
exports.getEditUser =async (req, res) => {
    const id = req.params.id;
    const user = req.decoded;
    const User = await GetUser(id);
    if (!user) {
        console.log("the user doesn't exist")
    }
    res.render('./app/edit_user',{User,user,layout: AdminLayout });
}
exports.EditUser = async(req, res) => {
    const id = req.params.id;
    const NewUser = req.body;
    const image = req.file;
    const user = await GetUser(id);
    const verified = NewUser.verified == 'on' ? true : false;
    console.log(user);
    const EditedUser = {
        username: xss(NewUser.username),
        age: xss(NewUser.age),
        phoneNumber:xss(NewUser.phoneNumber),
        salary: xss(NewUser.salary),
        role: xss(NewUser.role),
        email: xss(NewUser.email),
        password: xss(NewUser.password),
        verified: verified,
        image:xss(image?image.filename:user.image)
    }
    // console.log(EditedUser)
    await UpdateUser(id, EditedUser);
    return res.redirect('../dashboard');
}
exports.sortedUser = async (req, res) => {
    const user = req.decoded;
     const users = await SortingByName();
    res.render('./app/dashboard', { user, users, layout: AdminLayout });
}
exports.sortedUserAge = async (req, res) => {
    const user = req.decoded;
     const users = await SortingByAge();
    res.render('./app/dashboard', { user, users, layout: AdminLayout });
}
exports.search = async (req, res) => {
    const query = req.body.username;
    const user = req.decoded;
    const users = await Searching(query);
    res.render('./app/searchedUsers',{user,users,layout: AdminLayout});
}