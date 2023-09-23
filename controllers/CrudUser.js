const { insertUserData, DeleteUser,UpdateUser } = require("../Api/UserApi");
const { GetUser } = require('../Api/UserApi');
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
    const user = await GetUser(id);
    if (!user) {
        console.log("the user doesn't exist")
    }
    res.render('./app/edit_user',{user});
}
exports.EditUser = async(req, res) => {
    const id = req.params.id;
    const NewUser = req.body;
    const image = req.file;
    const user = await GetUser(id);
    // if (NewUser.verified) {
    //     NewUser.verified = true;
    //     // console.log(NewUser.verified);
    // } else {
    //     NewUser.verified = false;
    //     // console.log(NewUser.verified);
    // }
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