let subjectArray = [{name: 'a', date: "2026-05-19", confidence: 2},{name: 'b', date: "2026-05-20", confidence: 5},{name: 'c', date: "2026-05-21", confidence: 3}];
let userTime = {frequency: 2, minutes: 90};

//generate new subject info
let subData = [];
let orderedSubData = [];
let firstTask;
for (sub of subjectArray){   //create array of subject with values needed for the creation of the plan
    subData.push({name: sub.name, studyDays: 0, studyTime: 0, urgency: 0}); // adds object to array
    //create object and calculate time, urgency, etc
    let studyDaysAvailable;
    let today = new Date();
    let due = new Date(sub.date);
    let msPerDay = 1000 * 60 * 60 * 24;
    studyDaysAvailable = Math.ceil((due - today)/msPerDay);
    studyDaysAvailable /= userTime.frequency;
    sub.studyDays = studyDaysAvailable;
    sub.studyTime = studyDaysAvailable * userTime.minutes;
    sub.urgency = studyDaysAvailable * sub.confidence;
    // assign to first task so it has a default value for later
    firstTask = sub;
}
console.log(subData);
//check for highest urgency
for (sub of subData) {
    if (sub.urgency < firstTask.urgency){
        firstTask = sub;
    };
}
//create first task element
document.getElementById('firstTaskH1').textContent = firstTask.name;
//push subs to organizedSubData from lowest to highest value
for (sub of subData){
    if(orderedSubData.length === 0){//add if empty
        orderedSubData.push(sub);
    } else if(sub.urgency < orderedSubData[0].urgency){//add first
        orderedSubData.unshift(sub);
    } else if (sub.urgency > orderedSubData[orderedSubData.length-1].urgency){//add last
        orderedSubData.push(sub);
    }else{ //sort elements into order
        for(let i = 0; i < orderedSubData.length - 1; i++){
            if(sub.urgency > orderedSubData[i].urgency && sub.urgency < orderedSubData[i+1].urgency){
                orderedSubData = orderedSubData.splice(i+1, 0, sub);
                break;
            };
        };
    };

};
//add items to prio list
for (sub of orderedSubData){
    let li = document.createElement('li');
    li.textContent = sub.name
    document.getElementById("prioList").appendChild('li');
}

//create the planned sessions
const determineSessions = () => { //determine amount of pomodoro sessions per study day
    const createSession = (amount, length, breakLength, extra) => {
        return {sessions, length, breakLength, extra};
    };
    switch (userTime.minutes){
        case 15: 
            return createSession(1, 15, 0, 0);
            break;
        case 30:
            return createSession(1, 25, 0, 5);
            break;
        case 45:
            return createSession(2, 20, 5, 0);
            break;
        case 60:
            return createSession(2, 25, 5, 5);
            break;
        case 75:
            return createSession(3, 20, 5, 5);
            break;
        case 90:
            return createSession(3, 25, 5, 5);
            break;
        case 105:
            return createSession(3, 25, 5, 15);
            break;
        case 120:
            return createSession(4, 25, 5, 5);
            break;
        case 135:
            return createSession(4, 25, 5, 15);
            break;
        case 150:
            return createSession(5, 25, 5, 5);
            break;
        case 165:
            return createSession(5, 25, 5, 15);
            break;
        case 180:
            return createSession(6, 25, 5, 5);
            break;
        case 195:
            return createSession(6, 25, 5, 15);
            break;
        case 210:
            return createSession(7, 25, 5, 5);
            break;
        case 225:
            return createSession(7, 25, 5, 15);
            break;
    }
};

let sessionObject = determineSessions();

const sessionArrayConstructor = () => {
    for (let i; i < sessionObject.amount; i++){
        sessionArray.push(sessionObject.length)
        if(sessionArray.length !== sessionObject.amount*2 -1 || sessionObject.extra >= 15){
            sessionArray.push(sessionObject.breakLength);
        };
        if(sessionObject.extra >= 15 && sessionArray.length === sessionObject.amount*2){
            sessionArray.push(sessionObject.extra)
        };
    };
};

let sessionArray = [];

