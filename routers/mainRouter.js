// router methods definitions go here!


const express = require('express');
const router = express.Router();

// "/main"

router.get('/', (request, response) => {
    response.render('main.hbs', {
        profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeBO2O1ALH1poBQKrOjkDwHJh6HmZyd5aDGdazJmWxjAhxib5L",
        username:`${request.session.user.users_firstName} ${request.session.user.users_lastName}`,
        userPoints: `${request.session.user.users_point}`
    });
})


module.exports = router;