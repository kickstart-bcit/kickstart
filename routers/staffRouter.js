// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');
const usersConnector = require('../connectors/usersConnector');
// "/staff" handlers

router.get('/',  async (request, response) => {
    try {
        response.redirect('/staff/events');
    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs',{ errorMessage:"error"})
    }
});

router.get('/events',  async (request, response) => {
    try {
        events = await eventConnector.fetchEvents();
        response.render('staffEvents.hbs', { events });
    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs',{ errorMessage:"error"})
    }
});
/* receives eventId and returns participants [{stdId, stdName},...]*/
router.get('/participants/:eventId',  async (request, response) => {
    try {
        let participants = await eventConnector.fetchParticipationsByEventId(request.params.eventId)
        response.json({ participants })    
    } catch (err) {
        console.log(err);
        response.render('staffEvents.hbs',{err})
    }
});

router.get('/finish/:id', async (request, response) => {
    try {
        let eventId = request.params.id;
        let event = await eventConnector.fetchEventById(eventId);
        let point = event.events_point;
        let confirmEventResult = await eventConnector.confirmParticipationByEventId(eventId);
        let deleteParticipationResult = await eventConnector.deleteParticipationById(eventId);
        let finishEventResult = await eventConnector.finishEventById(eventId);
        let events = await eventConnector.fetchEvents();
        response.render('staffEvents.hbs', {
            events
        });
    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', err)
    }
})

router.get('/events',   (request, response) => {
    try {
            //shows the list of events the current staff is assigned with
            // each list shows the participants
                console.log("/staff/events");
                response.render('staffEvents.hbs', {})

    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', { errorMessage:"error"})
    }
});


router.get('/rewards',   (request, response) => {
    try {
            //shows the list of events the current staff is assigned with
            // each list shows the participants
            console.log("/staff/rewards");
            response.render('staffRewards.hbs', {})

    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', { errorMessage:"error"})
    }
});

router.post('/rewards/student', async (request, response) => {
    try {
        let sid = request.body.studentIdInput;
        let student = await usersConnector.fetchUser(sid);
        if (student){
            let rewards = await rewardsConnector.fetchRewardsByPoint(student.users_point);
            console.log(rewards);
            response.render('staffRewards.hbs', {
                studentId: student.users_id,
                studentName: student.users_firstName + " "+ student.users_lastName,
                studentPoints: student.users_point,
                rewards: rewards
            })
        } else {
            let msg = `<p>No Student with ${sid}`
            response.render('staffRewards.hbs', {
                statusMsg: msg
            })
        }

    } catch (e) {
        let msg = `No Student with ${request.body.studentIdInput}`
        console.log(e);
        response.render('staffRewards.hbs', {
            statusMsg: msg
        })
    }
})


router.get('/challenges',   (request, response) => {
    try {
            //shows the list of events the current staff is assigned with
            // each list shows the participants
            console.log("/staff/challenges");
            response.render('staffChallenges.hbs', {})
    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', { errorMessage:"error"})
    }
});


router.post('/delete', async (request, response) => {
    try{
        let sid = request.body.studentId;
        let eid = request.body.eventId;
        console.log(sid, eid);
        let result = await eventConnector.deleteParticipant(sid, eid);
        response.json({result})
    }
    catch (e) {
        console.log(e);
        response.json(e)
    }
})


module.exports = router;