let isEdit = document.getElementById("isEdit");
let title = document.getElementById("eventTitleInput");
let date = document.getElementById("dateInput");
let startTime = document.getElementById("startTimeInput");
let endTime = document.getElementById("endTimeInput");
let campus = document.getElementById("campusInput");
let address = document.getElementById("location");
let points = document.getElementById("pointsInput");
let desc = document.getElementById("descriptionInput");
let inputH2 = document.getElementById("inputH2");
let idInput = document.getElementById("eventIdInput");


let selectedEvent;
let PopupDiv = document.getElementById("adminEventDeletePopupDiv")
let PopupDivTitle = document.getElementById("deletePopupTitle")
let PopupDivDate = document.getElementById("deletePopupDate")
let PopupDivStart = document.getElementById("deletePopupStartTime")
let PopupDivEnd = document.getElementById("deletePopupEndTime")
let PopupDivCampus = document.getElementById("deletePopupCampus")
let PopupDivLocation = document.getElementById("deletePopupLocation")
let PopupDivPoints = document.getElementById("deletePopupPoints")
let PopupDivDesc = document.getElementById("deletePopupDesc")
let PopupDivFeatured = document.getElementById("deletePopupFeatured")
let contentDiv = document.getElementById("contentDiv");

let adminEventFinishPopupDiv = document.getElementById("adminEventFinishPopupDiv");
let finishPopupTitle = document.getElementById("finishPopupTitle");
let finishPopupDate = document.getElementById("finishPopupDate");
let participantsList = document.getElementById("participantsList");

let greyDiv = document.getElementById("greyDiv");




const editEvent = (id) => {
    fetch(window.location.origin + "/admin/edit/" + id)
        .then(res => res.json())
        .then(res => {
            inputH2.innerHTML = "Update Event " + id;
            let event = res.event[0];
            console.log(event);
            isEdit.value = "true";
            idInput.value = event["events_id"];
            title.value = event["events_title"];
            date.value = event["events_date"].split("T")[0];
            startTime.value = event["events_start_time"];
            endTime.value = event["events_end_time"];
            campus.value = event["events_campus"];
            address.value = event["events_locations"];
            points.value = event["events_points"];
            desc.value = event["events_desc"];
        })
        .catch(err => console.log(err));
}

const deleteEvent = (id) => {
    selectedEvent = id;
    
    fetch(window.location.origin + "/admin/edit/" + id)
        .then(res => res.json())
        .then(res => {
            let event = res.event[0];
            console.log(event);
            PopupDivTitle.innerHTML = event["events_title"];
            PopupDivDate.innerHTML = event["events_date"].split("T")[0];
            PopupDivStart.innerHTML = event["events_start_time"];
            PopupDivEnd.innerHTML = event["events_end_time"];
            PopupDivCampus.innerHTML = event["events_campus"];
            PopupDivLocation.innerHTML = event["events_locations"];
            PopupDivPoints.innerHTML = event["events_points"];
            PopupDivDesc.innerHTML = event["events_desc"];
            PopupDivFeatured.innerHTML = event["events_isFeatured"]?"Yes":"No";
            PopupDiv.style.display = "block";
            greyDiv.style.display = "block";
        })
}

const confirmEvent = (id) => {
    selectedEvent = id;
    
    fetch(window.location.origin + "/admin/edit/" + id)
        .then(res => res.json())
        .then(res => {
            let event = res.event[0];
            let participants = res.participants;
            console.log("In confirmEvent() fetch result")
            finishPopupTitle.innerHTML = event["events_title"];
            finishPopupDate.innerHTML = event["events_date"].split("T")[0];
            for (let participant of participants){
                let pli = document.createElement('li');
                let studentId = document.createElement('span');
                studentId.className = 'participantName';
                let name = document.createElement('span');
                name.className = 'participantName';
                studentId.innerHTML = participant.studentId;
                name.innerHTML = participant.studentName;
                pli.appendChild(studentId);
                pli.appendChild(name);
                participantsList.appendChild(pli);
            }
            if (!participantsList.childElementCount) {
                let msgli = document.createElement('li');
                msgli.style.color = "red";
                msgli.innerHTML = 'no participant';
                participantsList.appendChild(msgli);
            }
            adminEventFinishPopupDiv.style.display = "block";
            greyDiv.style.display = "block";

        })
}

const closePopup = () => {
    PopupDiv.style.display = "none";
    adminEventFinishPopupDiv.style.display = "none";
    while (participantsList.firstChild) {
        participantsList.removeChild(participantsList.firstChild);
    }
    greyDiv.style.display = "none";
}    

const deleteConfirmed = () => {
    window.location.replace(window.location.origin + "/admin/delete/" + selectedEvent);
}

const finishConfirmed = () => {
    window.location.replace(window.location.origin + "/admin/finish/" + selectedEvent);
}
