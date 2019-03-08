let isEdit = document.getElementById("isEdit");
let title = document.getElementById("RewardTitleInput");
let points = document.getElementById("pointsInput");
let desc = document.getElementById("descriptionInput");
let inputH2 = document.getElementById("inputH2");
let idInput = document.getElementById("RewardIdInput");


let selectedReward;
let PopupDiv = document.getElementById("adminEventDeletePopupDiv")
let PopupDivTitle = document.getElementById("deletePopupTitle")
let PopupDivPoints = document.getElementById("deletePopupPoints")
let PopupDivDesc = document.getElementById("deletePopupDesc")
let contentDiv = document.getElementById("contentDiv");

const editReward = (id) => {

    console.log(window.location.origin + "/adminRewards/edit/" + id);
    fetch(window.location.origin + "/adminRewards/edit/" + id)
        .then(res => res.json())
        .then(res => {
            inputH2.innerHTML = "Update Reward"
            let reward = res[0];
            isEdit.value = "true";
            title.value = reward["rewards_title"];
            points.value = reward["rewards_points"];
            desc.value = reward["rewards_desc"];
            idInput.value = reward["rewards_id"];

        })
        .catch(err => console.log(err));
}

const deleteReward = (id) => {
    selectedReward = id;

    fetch(window.location.origin + "/adminRewards/edit/" + id)
    .then(res => res.json())
    .then(res => {
        let rewards = res[0];
        console.log(rewards);
        PopupDivTitle.innerHTML = rewards["rewards_title"];
        PopupDivPoints.innerHTML = rewards["rewards_points"];
        PopupDivDesc.innerHTML = rewards["rewards_desc"];
        PopupDiv.style.display = "block";
        contentDiv.style.filter =  "blur(13px)";
    })
}

const closePopup = () => {
    PopupDiv.style.display = "none";
    contentDiv.style.filter = ""; 
}
const deleteConfirmed = () => {
    window.location.replace(window.location.origin + "/adminRewards/delete/" + selectedReward);
}    

