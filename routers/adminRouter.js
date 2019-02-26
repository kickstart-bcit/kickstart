// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventsConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin"

router.get('/', (request, response) => {
    console.log(request.body);
    response.render('adminEvents.hbs', {
        
    });
});


router.post('/', (request, response)=>{
    console.log(request.body.adminPageType);
    if (request.body.adminPageType == 'events') {
        response.render('adminEvents.hbs', {
        
        });
    } else if (request.body.adminPageType == 'rewards'){
        response.render('adminRewards.hbs', {
        
        });
    }
})


module.exports = router;