//time and date
const updateTimeDate = () => {
    const dateH1 = document.getElementById('dateH1');
    const timeH1 = document.getElementById('timeH1');

    const now = new Date(Date.now()).toLocaleString();
    dateH1.textContent = `${now.slice(0, 2)}-${now.slice(3, 5)}-${now.slice(8,10)}`
    timeH1.textContent = now.slice(11, 20);
}

setInterval(updateTimeDate ,1000);

//timer
let myInterval;
const startTimer = () => {
    clearInterval(myInterval);
    const timerMins = document.getElementById('timerMins');
    const timerSecs = document.getElementById('timerSecs');
    timerMins.textContent = '25';
    timerSecs.textContent = '00';

    let totalSecs = Number(timerMins.textContent)*60 + Number(timerSecs.textContent);
    let totalSecsCounter = totalSecs;
    myInterval = setInterval(()=>{
        totalSecsCounter--;

        let newSecs = totalSecsCounter%60;
        newSecs.toString();
        if(!newSecs[1]){
            newSecs = '0' + newSecs
        }
        newSecs = Number(newSecs);
        
        timerSecs.textContent = newSecs.toString();

        let restSec = totalSecsCounter - newSecs;
        let newMins = restSec / 60;
        timerMins.textContent = newMins.toString();
    } ,1000)
}

document.getElementById('timerStartStop').addEventListener('click', startTimer);

//add a subject

let subArray = [];

const lang = localStorage.getItem("lang") || "de";

const addSubject = () => {
    //get inputs
    const subInput = document.getElementById('subjectInput');
    const dateInput = document.getElementById('dateInput');
    const confInput = document.getElementById('confidenceInput');

    let doubles = [];     //check if subject is already in list
    doubles = subArray.filter(sub => {
        return sub.name === subInput.value.toLowerCase().trim();
    });

    if(doubles.length === 0 || subArray.length === 0){    //only add if not in list yet
        //calculate days until due date
            let today = new Date();
            let due = new Date(dateInput.value);
            let msPerDay = 1000 * 60 * 60 * 24;
            let daysAvailable = Math.ceil((due - today)/msPerDay);

        if (subInput.value && dateInput.value && daysAvailable >= 0){ //check whether input is not empty and valid

            subArray.push({
                name: subInput.value.toLowerCase().trim(), 
                dueDate: dateInput.value, 
                confidence: Number(confInput.value),
                daysLeft: daysAvailable,
                calcDays(){
                    this.daysLeft = Math.ceil((this.dueDate - new Date())/(1000*60*60*24))
                },
                practicedAmount: 1,
                urgency: 0,
                calcUrgency(){
                    this.urgency = this.daysLeft * this.confidence * this.practicedAmount
                }
            });
            subArray.at(-1).calcUrgency();
            console.log(subArray.at(-1));

            const subUl = document.getElementById('subList');   //add child
            const li = document.createElement('li');
            li.id = subInput.value.toLowerCase().trim();
            li.textContent = subInput.value + ' ' + dateInput.value;
            li.addEventListener('click', (event) => {   //add remove subject function
                for (i=0; i < subArray.length; i++){
                    if(subArray[i].name === event.target.id){
                        subArray.splice(i, 1);
                    }
                }
                event.target.remove();
                console.log(subArray);
            });
            subUl.appendChild(li);
            //clear inputs
            subInput.value = '';
            dateInput.value = '';
            confInput.value = '3';
        } else if (daysAvailable < 0){
            window.alert(translations[lang]["no_oldDate_alert"]);
        } else if (dateInput.value){ // if no sub
            window.alert(translations[lang]["no_empty_alert"]);
        } else if (subInput.value){ //if no date
            window.alert(translations[lang]["no_date_alert"]);
        } else { //if none
            window.alert(translations[lang]["no_empty_alert"] + ' ' + translations[lang]["no_date_alert"]);
        }
    } else {
        window.alert(translations[lang]["no_double_alert"]);
    }
    console.log(subArray);
}

document.getElementById('addNewSub').addEventListener('click', addSubject);


//start a session
const startSessionBtn = document.getElementById('startSession');

const startSession = () => {
    console.log("SubArray");
    console.log(subArray);
    sortSubs();
    const div4 = document.getElementById('div4');
    div4.style.zIndex = '0';

    const div7 = document.getElementById('div7');
    div7.style.zIndex = '1';
    div7.style.gridColumn = '1 / 5'

    const div5 = document.getElementById('div5');
    div5.style.display = 'none';
    const div6 = document.getElementById('div6');
    div6.style.display = 'none';
    const div3 = document.getElementById('div3');
    div3.style.display = 'none';
    const div1 = document.getElementById('div1');
    div1.style.gridColumn = '1 / 3';
    const div2 = document.getElementById('div2');
    div2.style.gridColumn = '3/5';

}

startSessionBtn.addEventListener('click', startSession);

//end a session
const endSessionBtn = document.getElementById('endSession');

const endSession = () => {
    const div4 = document.getElementById('div4');
    div4.style.zIndex = '1';

    const div7 = document.getElementById('div7');
    div7.style.zIndex = '0';
    div7.style.gridColumn = '1 / 4'

    const div5 = document.getElementById('div5');
    div5.style.display = 'flex';
    const div6 = document.getElementById('div6');
    div6.style.display = 'flex';
    const div3 = document.getElementById('div3');
    div3.style.display = 'flex';
    const div1 = document.getElementById('div1');
    div1.style.gridColumn = '1 / 2';
    const div2 = document.getElementById('div2');
    div2.style.gridColumn = '3 / 4';
}

endSessionBtn.addEventListener('click', endSession);

//generate session
const sortSubs = () => {
    const compareUrgency = (a,b) => {
        return a.urgency - b.urgency ;
    }
    subArray.sort(compareUrgency);
    console.log("New Sorted SubArray:")
    console.log(subArray);
}