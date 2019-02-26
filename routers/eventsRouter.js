// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector.js');

// "/events"

router.get('/', async (request, response) => {
    try {
        let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchEvents()); 
        response.render('events.hbs', { renderedEvents });
    }
    catch (err){
        console.log(err);
        response.render('events.hbs', "error")
    }        
});


module.exports = router;