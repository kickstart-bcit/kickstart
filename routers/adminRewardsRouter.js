// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventsConnector = require('../connectors/eventConnector');
const rewardsConnector = require('../connectors/rewardsConnector');

// "/admin" handlers

router.post('/', async (request, response) => {
    try {
        console.log(request.body)
        if (request.body.isEdit === "true") {
            let inputs = [
                request.body.RewardTitleInput,
                request.body.pointsInput,
                request.body.descInput,
            ]
            let results = await rewardsConnector.updateReward(request.body.RewardIdInput, inputs);
            console.log("result from update reward:", results);
        } else if (request.body.isEdit === "false") {
            let inputs = [
                request.body.RewardTitleInput,
                request.body.pointsInput,
                request.body.descInput,
            ]
            let results = await rewardsConnector.insertReward( inputs);
            console.log("result from insert reward:", results);
        }
        
        let rewards = await rewardsConnector.fetchRewards();
        let renderedAdminRewards = rewardsConnector.renderAdminRewards(rewards); 
        response.render('adminRewards.hbs', {
            renderedAdminRewards, rewards
        });
    }
    catch (err) {
        console.log(err);
        response.render('adminRewards.hbs',err)
    }    
});


router.get('/', async (request, response)=>{
    try {
        let rewards = await rewardsConnector.fetchRewards();
        let renderedAdminRewards = rewardsConnector.renderAdminRewards(rewards); 
        response.render('adminRewards.hbs', {
            renderedAdminRewards, rewards
        });
    }
    catch (err) {
        console.log(err);
        response.render('adminRewards.hbs', err)
    }
})


/* 
 * when admin clicks edit button of an event
 * send json of the reward with the id of $id
 *  so that the front end js will fill the forms 
*/
router.get('/edit/:id', async (request, response) => {
    console.log(request.params.id);
    let eventToEdit = await rewardsConnector.fetchRewardById(request.params.id);
    response.json(eventToEdit);
})

router.get('/delete/:id', async (request, response) => {
    try {
        let result = await rewardsConnector.deleteRewardById(request.params.id);
        let events = await rewardsConnector.fetchRewards();
        let renderedAdminRewards = rewardsConnector.renderAdminRewards(events); 
        response.render('adminRewards.hbs', {
            renderedAdminRewards
        });
    }
    catch (err) {
        console.log(err);
        response.render('adminRewards.hbs', err)
    }
})

module.exports = router;