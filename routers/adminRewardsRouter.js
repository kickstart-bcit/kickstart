// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventsConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin" handlers

router.get('/', async (request, response) => {
    try {
        let rewards = await rewardsConnector.fetchRewards();
        let renderedAdminRewards = rewardsConnector.renderAdminRewards(rewards); 
        response.render('adminRewards.hbs', {
            renderedAdminRewards, rewards
        });
    }
    catch (err) {
        console.log(err);
        response.render('adminEvents.hbs', "error")
    }    
});


router.post('/', (request, response)=>{
    console.log("in '/adminRewards' post handler", request.body);
    response.render('adminRewards.hbs', {
    
    });
})


module.exports = router;