// router methods definitions go here!


const express = require('express');
const router = express.Router();
const userConnector = require('../connectors/usersConnector');
// "/login"

router.get('/', async (request, response) => {
    try {
        if (request.session && request.session.user) {
            let user = await userConnector.fetchUser(request.session.user.users_id);
            if (user) {
                if (user.users_type == "admin") response.redirect('/admin');
                else if (user.users_type == "staff") response.redirect('/staff');
                else response.redirect('/main');
            } 
                
        } else {
            response.render('log.hbs', {});
        }
    }
    catch (err){
        console.log(err)
    }
})

router.post('/', async (request, response) => {
    // validation/authentication goes here
    try {
        let user = await userConnector.fetchUser(request.body.loginName);
        console.log(request.body, user["users_pw"]);
        if (user){
            if (user["users_pw"] === request.body.loginPw){
                // on success login
                console.log("login success", user["users_pw"])
                request.session.user = user;
                response.locals.user = user;
                if (user.users_type == "admin") response.redirect('/admin');
                else if (user.users_type == 'staff') response.redirect('/staff');
                else response.redirect('/main');
            } else response.render('log.hbs', {errMsg: "wrong password"});
        }
    }   
    catch (err) {
        console.log("error occured login", err);
        response.render('log.hbs', {errMsg:"validation failed. check your id/pw and try again"})
    } 
});


module.exports = router;