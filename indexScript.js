//let subjectArray = [{name: 'a', date: "2026-05-19", confidence: 2},{name: 'b', date: "2026-05-20", confidence: 5},{name: 'c', date: "2026-05-21", confidence: 3}];
//let userTime = {frequency: 2, minutes: 90};
console.log(JSON.parse(localStorage.getItem("learnItemsData")));
console.log(JSON.parse(localStorage.getItem("userTime")));
let subjectArray = JSON.parse(localStorage.getItem("learnItemsData"));
let userTime = JSON.parse(localStorage.getItem("userTime"));

console.log(subjectArray);
console.log(userTime);
//generate new subject info
let subData = []; //unordered subject objects
let orderedSubData = []; //ordered subject object array by urgency
let dueDates = []; //name, duedate, days available - objects array
let firstTask;
let sessionObject;
let sessionArray = [];

const subDataCreator = () => { //create both arrays
    for (sub of subjectArray){   //create array of subject with values needed for the creation of the plan
        //create object and calculate time, urgency, etc
        let studyDaysAvailable;
        let today = new Date();
        let due = new Date(sub.date);
        let msPerDay = 1000 * 60 * 60 * 24;
        let daysAvailable = Math.ceil((due - today)/msPerDay);
        sub.daysAvailable = daysAvailable;
        studyDaysAvailable = daysAvailable / userTime.frequency;
        sub.studyDays = studyDaysAvailable;
        sub.studyTime = studyDaysAvailable * userTime.minutes;
        let studyTime = sub.studyTime;
        sub.urgency = studyDaysAvailable * sub.confidence;
        let urgency = sub.urgency;
        // assign to first task so it has a default value for later
        //create new dueDate object and sort it in
        subData.push({name: sub.subjectTitle, studyDays: studyDaysAvailable, studyTime: studyTime, urgency: urgency, daysAvailable: daysAvailable, date: sub.date}); // adds object to array
    }
    console.log(subData);
}

const dueDateCreator = () => {
    for (sub of subData){
        let dueDatesNew = {name: sub.name, due: sub.date, studyDays: sub.studyDays, totalDays: sub.daysAvailable};
        if(dueDates.length === 0){
            dueDates.push(dueDatesNew);
        } else if(dueDates[0].studyDays > dueDatesNew.studyDays){
            dueDates.unshift(dueDatesNew);
        } else if(dueDates[dueDates.length-1].studyDays < dueDatesNew.studyDays){
            dueDates.push(dueDatesNew);
        } else if(dueDates[dueDates.length-1].studyDays === dueDatesNew.studyDays){
            dueDates.push(dueDatesNew);
        }else {
            for (let i = 0; i < dueDates.length-1; i++){
                if(dueDatesNew.studyDays > dueDates[i].studyDays && dueDatesNew.studyDays < dueDates[i+1].daysAvailable){
                    dueDates.splice(i+1, 0, dueDatesNew);
                } else if(dueDatesNew.studyDays === dueDates[i].studyDays){
                    dueDates.splice(i+1, 0, dueDatesNew);
                };
            }
        }
    }
    console.log(dueDates);
};

const firstTaskAssigner = () => { //assign and display a first task to user
    //check for highest urgency
    firstTask = subData[0];
    for (sub of subData) {
        if (sub.urgency < firstTask.urgency){
            firstTask = sub;
        };
    }
    //create first task element
    document.getElementById('firstTaskH1').textContent = firstTask.name.toUpperCase();
}

const subDataOrganizer = () => {     //push subs to organizedSubData from lowest to highest value
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
                    orderedSubData.splice(i+1, 0, sub);
                    break;
                };
            };
        };
    };
    //add items to prio list
    for (sub of orderedSubData){
        let li = document.createElement('li');
        li.textContent = sub.name.toUpperCase();
        document.getElementById("prioList").appendChild(li);
    };
    console.log(orderedSubData);
}

//create the planned sessions
const determineSessions = () => { //determine amount of pomodoro sessions per study day
    const createSession = (amount, length, breakLength, extra) => {
        return {amount, length, breakLength, extra};
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

const sessionArrayConstructor = () => { //convert the session object to an array with study-break-study-break... pattern with length in mins
    sessionObject = determineSessions(); //generate the session object
    for (let i; i < sessionObject.amount; i++){
        sessionArray.push(sessionObject.length)
        if(sessionArray.length !== sessionObject.amount*2 -1 || sessionObject.extra >= 15){
            sessionArray.push(sessionObject.breakLength);
        };
    };
    //push the extra time at the end if >= 15 mins
    if(sessionObject.extra >= 15 && sessionArray.length === sessionObject.amount*2){
            sessionArray.push(sessionObject.extra)
        };
};

const dayConstructor = () => { //generate collapsed divs in days ol
    for (let i = 0; i < dueDates[dueDates.length-1].studyDays; i++){//do for every study day
        //create a li in the list
        let li = document.createElement('li');
        li.className = "dayListChild";
        li.id = `day${i}`;
        document.getElementById('dayList').appendChild(li);
        //create a div in the li
        let div = document.createElement('div');
        div.id = `day${i}Div`;
        div.className = "dayListChild";
        div.addEventListener('click', function(){
            document.getElementById(`day${i}Ul`).classList.toggle('display');
        });
        document.getElementById(`day${i}`).appendChild(div);
        //create a h3 with name in div
        let h3 = document.createElement('h3');
        h3.className = "dayListChild";
        let h3Date = new Date(Date.now()+i*24*60*60*1000).toString();
        h3Date = h3Date.substring(0, 11);
        h3.textContent = h3Date;
        document.getElementById(`day${i}Div`).appendChild(h3);
        //create a h4 with date in div
        /*let h4 = document.createElement('h4');
        h4.className = "dayListChild";
        h4.textContent = dueDates[i].date;
        document.getElementById(`day${i}Div`).appendChild(h4);*/
        //create a ul in div
        let ul = document.createElement('ul');
        ul.id = `day${i}Ul`;
        ul.className = "dayListChild";
        document.getElementById(`day${i}Div`).appendChild(ul);

        for (let j = 0; j < sessionArray.length-1; j++){
            let innerLi = document.createElement('li');
            innerLi.id = `day${i}li${j}`;
            innerLi.className = "dayListChild";
            if (j === 0 || j%2 === 0){
                innerLi.textContent = `Lernen: ${sessionArray[j]} Minuten`
            } else if (j%2 !== 0){
                innerLi.textContent = `Pause: ${sessionArray[j]} Minuten`
            };
            document.getElementById(`day${i}Div`).appendChild('innerLi');
        }
    };
};

const regenerator = () => { //removes first task, removes it from all arrays and Objects; adds new, deletes all day content and regenerates it
    const dayDestructor = () => {   
        const dayList = document.getElementById('dayList').querySelectorAll(':scope > .dayListChild');
        dayList.forEach(child => child.remove());
    };
    dayConstructor();
};

const generateWhole = () => { //call to execute all the functions above in order
    subDataCreator();
    dueDateCreator();
    firstTaskAssigner();
    subDataOrganizer();
    determineSessions();
    sessionArrayConstructor();
    dayConstructor();
};

generateWhole();

//finish button
document.getElementById('finishButton').addEventListener('click', (event)=>{
    regenerator();
});

//back to q page
const switchToQ = () => {
    const newUrl = new URL("questionnaire.html", window.location.href);
    window.location.href = newUrl;
};
document.getElementById("backToQ").addEventListener("click", switchToQ);

