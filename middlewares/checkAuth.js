
function CheckedAuth(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/dashboard');
  }
    next();
}

module.exports=CheckedAuth