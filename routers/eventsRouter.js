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


router.post('/', async (request, response) => {
    try {
        var formatted_term = request.body.searchTerm.charAt(0).toUpperCase() + request.body.searchTerm.slice(1);
        formatted_term = `%${formatted_term}%`;
        console.log('The search term is: ', formatted_term);
        let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSearchedEvent(formatted_term));
        response.render('events.hbs', { renderedEvents });
        
    }
    catch (err){
        console.log(err);
        response.render('events.hbs', "error")
    }        
});

module.exports = router;