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
        // console.log(request.body);
        if(request.body.searchTerm !== ''){
            var formatted_term = request.body.searchTerm.charAt(0).toUpperCase() + request.body.searchTerm.slice(1);
            formatted_term = `%${formatted_term}%`;
            console.log('The search term is: ', formatted_term);
            if (request.body.searchType === 'campus') {
                var renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSearchedEventByCampus(formatted_term));
            } else if (!request.body.searchType || request.body.searchType === 'title') {
                var renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSearchedEvent(formatted_term));
            }
            response.render('events.hbs', { renderedEvents });
        }
        else if (request.body.sortBy !== ''){
            if(request.body.sortBy === 'datetime'){
                console.log('=============================================================================');
                console.log('Sorted by datetime');
                console.log('=============================================================================');
                let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSortedEvent('datetime'));
                response.render('events.hbs', { renderedEvents });
            }
            else if(request.body.sortBy === 'point'){
                console.log('=============================================================================');
                console.log('Sorted by point');
                console.log('=============================================================================');
                let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSortedEvent('point'));
                response.render('events.hbs', { renderedEvents });
            }
            else if(request.body.sortBy === 'campus'){
                console.log('=============================================================================');
                console.log('Sorted by campus');
                console.log('=============================================================================');
                let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchSortedEvent('campus'));
                response.render('events.hbs', { renderedEvents });
            }
        }
        // console.log(request.body.searchTerm, '111111111111111111111', request.body.sortBy);
        if(request.body.searchTerm === '' && request.body.sortBy === undefined){
            console.log('=============================================================================');
            console.log('Displaying all events without conditions');
            console.log('=============================================================================');
            let renderedEvents = eventConnector.renderEvents(await eventConnector.defaultFetchEvent());
            response.render('events.hbs', { renderedEvents });
        }
    }
    catch (err){
        console.log(err);
        response.render('events.hbs', "error")
    }        
});



module.exports = router;



// if(request.body.sortBy !== ''){
//     var sortByCmd = request.body.sortBy;
//     console.log(sortByCmd);
// }