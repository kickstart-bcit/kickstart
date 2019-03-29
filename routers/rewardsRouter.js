// router methods definitions go here!


const express = require('express');
const router = express.Router();
const rewardsConnector = require('../connectors/rewardsConnector');

// "/rewards"

router.get('/', async (request, response) => {
    try {
        let renderedRewards = rewardsConnector.renderRewards(await rewardsConnector.fetchRewards()); 
        let redeemed = await rewardsConnector.fetchRedeemedRewardsByStudentId(request.session.user.users_id);
        response.render('rewards.hbs', {
        	userPoints: `${request.session.user.users_point}`,
            renderedRewards,
            redeemed 
        });
    }
    catch (err){
        console.log(err);
        response.render('rewards.hbs', "error")
    }       
});


module.exports = router;