let subjectArray = [{name: 'a', date: "2026-05-19", confidence: 2},{name: 'b', date: "2026-05-20", confidence: 5},{name: 'c', date: "2026-05-21", confidence: 3}];
let userTime = {frequency: 2, minutes: 90};

//generate new subject info
let subData = [];
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

for (sub of subData) {
    if (sub.urgency < firstTask.urgency){
        firstTask = sub;
    };
}

const h1 = document.createElement('h1');
h1.textContent = firstTask.name;
h1.id = "firstTaskDisplay";
document.getElementById('displayPlan').appendChild(h1);