// router methods definitions go here!


const express = require('express');
const router = express.Router();

// "/main"

router.get('/', (request, response) => {
    response.render('main.hbs', {
        profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeBO2O1ALH1poBQKrOjkDwHJh6HmZyd5aDGdazJmWxjAhxib5L",
        username:'John Smith',
        userPoints: 1000
    });
})


module.exports = router;