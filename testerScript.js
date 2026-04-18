console.log(JSON.parse(localStorage.getItem("learnItemsData")));
console.log(JSON.parse(localStorage.getItem("userTime")));
let subjectArray = JSON.parse(localStorage.getItem("learnItemsData"));
let userTime = JSON.parse(localStorage.getItem("userTime"));

//back to q page
const switchToQ = () => {
    window.location.href = window.location.href.replace("planner.html", "questionnaire.html");
};
document.getElementById("backToQ").addEventListener("click", switchToQ);


//generate new subject info
let subData = [];

for (sub of subjectArray){
    subData.push({name: subjectArray[sub][subjectTitle], studyDays: 0, studyTime: 0});
    
    let studyDaysAvailable;
    let today = new Date();
    let due = new Date(subjectArray[sub].date);
    let msPerDay = 1000 * 60 * 60 * 24;
    studyDaysAvailable = Math.ceil((due - today)/msPerDay);
    studyDaysAvailable /= userTime.frequency;
    subData[sub].studyDays = studyDaysAvailable;

    subData[sub].studyTime = studyDaysAvailable * userTime.minutes;
}
console.log(subData);
