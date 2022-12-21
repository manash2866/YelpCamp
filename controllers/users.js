const User = require('../models/user');

module.exports.renderRegister = (req, res)=>{
    res.render('users/register');
}

module.exports.register = async(req, res, next)=>{
    try {
        const {password, username, email} = req.body;
        const user = new User({username, email});
        const registeredUser =await User.register(user, password);
        req.login(registeredUser, (err)=>{
            if(err) return next(err);
            req.flash('success', 'welcome to YelpCamp!');
            res.redirect('/campgrounds'); 
        })
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res)=>{
    res.render('users/login');
}

module.exports.login = (req, res)=>{
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        } 
        req.flash('success', 'GoodBye!');
        res.redirect('/campgrounds');
    });
}