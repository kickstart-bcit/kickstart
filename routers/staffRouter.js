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
        let point = event[0].events_points;
        console.log(event);
        let updatePointResult = await eventConnector.updateUsersPoint(point, eventId);
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
            let renderedRewards = rewardsConnector.renderReedemableRewards(await rewardsConnector.fetchRewardsByPoint(student.users_point), sid);

            response.render('staffRewards.hbs', {
                studentId: student.users_id,
                studentName: student.users_firstName + " "+ student.users_lastName,
                studentPoints: student.users_point,
                renderedRedeemable:renderedRewards
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


/* 
    for staff evetns page  
    input: sid(user id), eid(event id)
    output json of result from delete query on participation table  
    */
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

router.get('/redeem/:rid/:sid', async (request, response) => {
    try{
        let sid = request.params.sid;
        let student = await usersConnector.fetchUser(sid);
        let rid = request.params.rid;
        if (student){
            let reward = await rewardsConnector.fetchRewardById(rid);
            if (student.users_point >= reward[0].rewards_points){
                await rewardsConnector.redeemRewards(sid,rid);
                await rewardsConnector.insertRedeemedReward(sid,rid);
                student = await usersConnector.fetchUser(sid);
                let renderedRewards = rewardsConnector.renderReedemableRewards(await rewardsConnector.fetchRewardsByPoint(student.users_point), sid);

                response.render('staffRewards.hbs', {
                    studentId: student.users_id,
                    studentName: student.users_firstName + " "+ student.users_lastName,
                    studentPoints: student.users_point,
                    renderedRedeemable:renderedRewards
                })
            } else {
                response.render('staffRewards.hbs', {
                    studentId: student.users_id,
                    studentName: student.users_firstName + " "+ student.users_lastName,
                    studentPoints: student.users_point,
                    statusMsg:"insufficient point"
                })
            }
            
        } else {
            response.render('staffRewards.hbs', {
                studentId: student.users_id,
                studentName: student.users_firstName + " "+ student.users_lastName,
                studentPoints: student.users_point,
                statusMsg:"no user with such id"
            })
        }
    } catch (e) {
        console.log(e);
        response.render('staffRewards.hbs', {
            statusMsg:e
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
        response.render('staffChallenges.hbs', { errorMessage:"error"})
    }
});

router.post('/challenges/student', async (request, response) => {
    try {
        let sid = request.body.studentIdInput;
        let student = await usersConnector.fetchUser(sid);
        if (student){
            // fetch challenges from db
            // render challenges (format html with the info fetched from db) 
            response.render('staffChallenges.hbs', {
                studentId: student.users_id,
                studentName: student.users_firstName + " "+ student.users_lastName,
                studentPoints: student.users_point,
                challenges:"<p style='color:red'>There is currently no challenge available...</p>"
            })
        } else {
            let msg = `<p>No Student with ${sid}`
            response.render('staffChallenges.hbs', {
                statusMsg: msg
            })
        }

    } catch (e) {
        let msg = `No Student with ${request.body.studentIdInput}`
        console.log(e);
        response.render('staffChallenges.hbs', {
            statusMsg: msg
        })
    }
})
module.exports = router;