console.log('newScript.js is running');
//time and date
const updateTimeDate = () => {
    const dateH1 = document.getElementById('dateH1');
    const timeH1 = document.getElementById('timeH1');

    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    dateH1.textContent = date;
    timeH1.textContent = time;
}

setInterval(updateTimeDate ,1000);

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
            const span = document.createElement('span');
            span.textContent = "🗑️";
            span.id = `${subInput.value.toLowerCase().trim()}Remove`;
            li.textContent = subInput.value + ' ' + dateInput.value;
            li.appendChild(span);
            span.addEventListener('click', (event) => {   //add remove subject function
                for (i=0; i < subArray.length; i++){
                    if(subArray[i].name === li.id){
                        subArray.splice(i, 1);
                    }
                }
                event.target.remove();
                li.remove();
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

//expand sub list
const subListDiv = document.getElementById('div6');
const expandSubList = document.getElementById('expandSubList');
const collapseSubList = document.getElementById('collapseSubList');

const subListExpander = () => {
    subListDiv.style.gridColumn = '1 / 5';
    subListDiv.style.gridRow = '1 / 7';
    subListDiv.style.zIndex = '5';
    collapseSubList.classList.remove('hidden');
    expandSubList.classList.add('hidden');
}

expandSubList.addEventListener('click', subListExpander);

//collapse sub list
const subListCollapser = () => {
    subListDiv.style.gridColumn = '4 / 5';
    subListDiv.style.gridRow = '4 / 7';
    subListDiv.style.zIndex = '1';
    collapseSubList.classList.add('hidden');
    expandSubList.classList.remove('hidden');
}

collapseSubList.addEventListener('click', subListCollapser);

//sessionObject
let sessionObject = {
    state: "study",                             //break or study
    subject: "",
    next(){      
        progressor.style.width = '0%'; 
        if(this.breaks === true){                              //switch to next after countdown is 0
            if(this.state === "study" && this.started === true){             //switch from study to break
                subArray[0].practicedAmount++;      //add session to subject
                sortSubs();                         //regenerate subject list and next subject
                this.state = "break";
                timerMins.textContent = `${this.breakLength}`;
                this.counting = true;
            } else if(this.state === "break" && this.started === true){      //switch from break
                this.state = "study";
                this.amountLeft--;
                this.amountDone++;
                this.counting = true;
                timerMins.textContent = `${this.sessionLength}`;
            } else {
                this.counting = true;
                this.started = true;
                sortSubs();
                this.amountLeft--;
                this.amountDone++;
            }
        } else if (this.breaks === false) {
            if (this.started === true){
                subArray[0].practicedAmount++; 
                timerMins.textContent = this.sessionLength;
                sortSubs(); 
                this.counting = true;
                this.state = 'study';
                this.amountLeft--;
                this.amountDone++;
            } else {
                this.counting = true;
                this.started = true;
                sortSubs();
                this.state = 'study';
                this.amountLeft--;
                this.amountDone++;
            }
        }
        console.log(sessionObject);
    },
    counting: false,  //true if time is running, false if not
    started: false,
    amountLeft: 0,         //amount of learn-break cycles
    amountDone: 0,    //amount of finished cycles
    sessionLength: 25,
    breakLength: 5,
    breaks: true,
    reset(){
        this.state = "study";
        this.subject = "";
        this.counting = false;
        this.started = false;
        this.amountLeft = 0;
        this.amountDone = 0;
    }
};

//start a session
const startSessionBtn = document.getElementById('startSession');
const breaksYes = document.getElementById('breaksYes');


const startSession = () => {
    const sessionHour = document.getElementById("sessionHourInput");
    const sessionMin = document.getElementById("sessionMinInput");
    const sessionLengthInput = document.getElementById("sessionLengthInput");

    if (subArray[0] && Number(sessionMin.value) + Number(sessionHour.value) !== 0){
        if((Number(sessionMin.value) + Number(sessionHour.value)*60) >= Number(sessionLengthInput.value)){
                sessionObject.reset(); //make sure the sessionobject is in starting mode

            let sessionTime = Number(sessionMin.value) + Number(sessionHour.value) * 60;
            sessionObject.sessionLength = sessionLengthInput.value;
            
            if(breaksYes.checked){
                if(sessionTime > Number(sessionLengthInput.value)){
                    console.log('breaks is checked')
                    sessionObject.amountLeft = Math.floor(sessionTime / (sessionLengthInput.value + 5));
                    console.log("Session Time: " + sessionTime);
                    sessionObject.breaks = true;
                } else if(sessionTime === Number(sessionLengthInput.value)){
                    console.log('breaks is checked but time ===')
                    sessionObject.amountLeft = 1;
                    console.log("Session Time: " + sessionTime);
                    sessionObject.breaks = false;
                }
            } else {
                console.log('breaks not checked');
                sessionObject.amountLeft = Math.floor(sessionTime / sessionLengthInput.value);
                console.log("Session Time: " + sessionTime); 
                sessionObject.breaks = false;
            }

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
            timerMins.textContent = sessionObject.sessionLength;
        } else {
            window.alert(translations[lang]["too_short_alert"]) 
        }
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
    endSessionBtn.classList.remove('hidden');
    timerMins.textContent = '00'
    timerSecs.textContent = "00"
    document.getElementById('stateH1').textContent = translations[lang]['study'];
    progressor.style.width = '0%';
    sessionObject.started = false;
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

        let progressor = document.getElementById('progressor');
        let progressBits = secsToStudy;

        studyInterval = setInterval(()=>{
            secsToStudy--;
            //update progress bar
            progressor.style.width = `${100 - secsToStudy*99/progressBits}%`;
            //update timer
            timerSecs.textContent = String(secsToStudy % 60).padStart(2, '0');
            timerMins.textContent = Math.floor(secsToStudy/60);
            //check clearing condition
            if(secsToStudy === 0){
                clearInterval(studyInterval);
                sessionObject.counting = false;
                nextSessionBtn.classList.remove('hidden');
                if(sessionObject.amountLeft === 0) {
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
    if(sessionObject.amountLeft === 0) {
        nextSessionBtn.classList.add('hidden');
    };
    endSessionBtn.classList.remove('hidden');
    skipSessionBtn.classList.add('hidden');

    if(sessionObject.state === "study"){
        timerMins.textContent = '00';
        timerSecs.textContent = "00";
        progressor.style.width = '0%';
        document.getElementById('stateH1').textContent = translations[lang]['break'];
    } else if (sessionObject.state === "break"){
        timerMins.textContent = '00';
        timerSecs.textContent = "00";
        progressor.style.width = '0%';
        document.getElementById('stateH1').textContent = translations[lang]['study'];
    }
    console.log(sessionObject);
});