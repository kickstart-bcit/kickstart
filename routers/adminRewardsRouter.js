// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventsConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin" handlers

router.get('/', (request, response) => {
    response.render('adminRewards.hbs', {
        
    });
});


router.post('/', (request, response)=>{
    console.log("in '/adminRewards' post handler", request.body);
    response.render('adminRewards.hbs', {
    
    });
})


module.exports = router;