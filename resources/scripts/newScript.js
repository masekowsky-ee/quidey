console.log('newScript.js is running');
//time and date
const updateTimeDate = () => {
    const dateH1 = document.getElementById('dateH1');
    const timeH1 = document.getElementById('timeH1');

    const now = new Date(Date.now()).toLocaleString();
    dateH1.textContent = `${now.slice(0, 2)}-${now.slice(3, 5)}-${now.slice(8,10)}`
    timeH1.textContent = now.slice(11, 20);
}

setInterval(updateTimeDate ,1000);
/*
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
*/
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
    console.log('Add subject triggered')
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
                    this.urgency = this.daysLeft * this.confidence * this.practicedAmount;
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
    const sessionHour = document.getElementById("sessionHourInput");
    const sessionMin = document.getElementById("sessionMinInput");

    if (subArray[0] && Number(sessionMin.value) + Number(sessionHour.value) !== 0){
        sessionObject.reset(); //make sure the sessionobject is in starting mode
        let roundedSessionMinutes = Number(sessionMin.value);
        if(Number(sessionMin.value) > 0){          //make sure the user doesn't enter sth other than 0 or 30
            roundedSessionMinutes = 30;
        }
        let sessionTime = roundedSessionMinutes + Number(sessionHour.value) * 60;
        sessionObject.amountLeft = sessionTime / 30;
        console.log("Session Time: " + sessionTime);

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
        document.getElementById('stateH1').textContent = translations[lang]['study'];
    } else {
        window.alert(translations[lang]["no_empty_alert"])
    }
}

const timerMins = document.getElementById('timerMins');
const timerSecs = document.getElementById('timerSecs');

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
    //reset page to prep for next
    nextSessionBtn.classList.remove('hidden');
    endSessionBtn.classList.add('hidden');
    timerMins.textContent = '25'
    timerSecs.textContent = "00"
    document.getElementById('stateH1').textContent = translations[lang]['study'];
}

endSessionBtn.addEventListener('click', endSession);

//generate session
const sortSubs = () => {
    subArray.forEach(sub => {
        sub.calcUrgency();
    });
    const compareUrgency = (a,b) => {
        return a.urgency - b.urgency ;
    }
    subArray.sort(compareUrgency);
    console.log("New Sorted SubArray:");
    console.log(subArray);
    document.getElementById("currentTask").textContent = subArray[0].name.toUpperCase();
    sessionObject.subject = subArray[0].name;
}


let sessionObject = {
    state: "study",                             //break or study
    subject: "",
    next(){                                     //switch to next after countdown is 0
        if(this.state === "study" && this.started === true){             //switch from study to break
            subArray[0].practicedAmount++;      //add session to subject
            sortSubs();                         //regenerate subject list and next subject
            this.state = "break";
            this.counting = true;
        } else if(this.state === "break" && this.started === true){      //switch from break
            this.state = "study";
            this.amountLeft--;
            this.amountDone++;
            this.counting = true;
        } else {
            this.counting = true;
            this.started = true;
        }
    },
    counting: false,  //true if time is running, false if not
    started: false,
    amountLeft: 0,         //amount of learn-break cycles
    amountDone: 0,    //amount of finished cycles
    sessionLength: 25,
    breakLength: 5,
    reset(){
        this.state = "study";
        this.subject = "";
        this.counting = false;
        this.started = false;
        this.amountLeft = 0;
        this.amountDone = 0;
    }
};

let studyInterval;

const nextSessionOnClick = () => {
    if (sessionObject.counting === false){
        sessionObject.next();
        let secsToStudy;
        //check for current state and assign minutes
        if(sessionObject.state === 'study'){
            secsToStudy = sessionObject.sessionLength * 60;
        } else if(sessionObject.state === 'break'){
            secsToStudy = sessionObject.breakLength * 60;
        }
        nextSessionBtn.classList.add('hidden');
        endSessionBtn.classList.add('hidden');
        skipSessionBtn.classList.remove('hidden');

        if(sessionObject.state === 'study'){
            document.getElementById('stateH1').textContent = translations[lang]['study'];
        } else if (sessionObject.state === 'break'){
            document.getElementById('stateH1').textContent = translations[lang]['break'];
        }

        studyInterval = setInterval(()=>{
            secsToStudy--;
            //update timer
            timerSecs.textContent = String(secsToStudy % 60).padStart(2, '0');
            timerMins.textContent = Math.floor(secsToStudy/60);
            //check clearing condition
            if(secsToStudy === 0){
                clearInterval(studyInterval);
                sessionObject.counting = false;
                nextSessionBtn.classList.remove('hidden');
                if(sessionObject.amountLeft === 1) {
                    nextSessionBtn.classList.add('hidden');
                };
                endSessionBtn.classList.remove('hidden');
                skipSessionBtn.classList.add('hidden');
            }
        }, 1000);
    }
}

const nextSessionBtn = document.getElementById('nextSession');
nextSessionBtn.addEventListener('click', nextSessionOnClick);

const skipSessionBtn = document.getElementById('skipSession');
skipSessionBtn.addEventListener('click', (event)=>{
    clearInterval(studyInterval);
    sessionObject.counting = false;
    nextSessionBtn.classList.remove('hidden');
    if(sessionObject.amountLeft === 1) {
        nextSessionBtn.classList.add('hidden');
    };
    endSessionBtn.classList.remove('hidden');
    skipSessionBtn.classList.add('hidden');

    if(sessionObject.state === "study"){
        timerMins.textContent = '05'
        timerSecs.textContent = "00"
        document.getElementById('stateH1').textContent = translations[lang]['break'];
    } else if (sessionObject.state === "break"){
        timerMins.textContent = '25'
        timerSecs.textContent = "00"
        document.getElementById('stateH1').textContent = translations[lang]['study'];
    }
    console.log(sessionObject);
});