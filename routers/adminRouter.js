// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventsConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin" handlers

router.get('/', (request, response) => {
    response.render('adminEvents.hbs', {
        
    });
});


router.post('/', (request, response)=>{
    console.log("in '/newEvent' post handler",request.body);
    response.render('adminEvents.hbs', {
    
    });
})


module.exports = router;