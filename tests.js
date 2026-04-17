let subjectArray = [{name: 'a', date: "2026-05-19", confidence: 2},{name: 'b', date: "2026-05-20", confidence: 5},{name: 'c', date: "2026-05-21", confidence: 3}];
let userTime = {frequency: 2, minutes: 90};

//generate new subject info
let subData = [];
let subCounter = 0;
for (sub of subjectArray){
    subData.push({name: subjectArray[subCounter].name, studyDays: 0, studyTime: 0, urgency: 0});
    
    let studyDaysAvailable;
    let today = new Date();
    let due = new Date(subjectArray[subCounter].date);
    let msPerDay = 1000 * 60 * 60 * 24;
    studyDaysAvailable = Math.ceil((due - today)/msPerDay);
    studyDaysAvailable /= userTime.frequency;
    subData[subCounter].studyDays = studyDaysAvailable;

    subData[subCounter].studyTime = studyDaysAvailable * userTime.minutes;

    subData[subCounter].urgency = studyDaysAvailable * subjectArray[subCounter].confidence;
    subCounter++;
}
console.log(subData);