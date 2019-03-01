// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin" handlers

router.get('/', async (request, response) => {
    try {
        let events = await eventConnector.fetchEvents();
        let renderedAdminEvents = eventConnector.renderAdminEvents(events); 
        response.render('adminEvents.hbs', {
            renderedAdminEvents, events

        });
    }
    catch (err) {
        console.log(err);
        response.render('adminEvents.hbs', "error")
    }

});


router.post('/', (request, response)=>{
    console.log("in '/newEvent' post handler",request.body);
    response.render('adminEvents.hbs', {
    
    });
})


module.exports = router;