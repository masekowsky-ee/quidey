// DOM elements

//div & container & element selectors
const div1 = document.getElementById('div1'); //progress bar and timer div in session page
const div2 = document.getElementById('div2'); //state div in session page (displays study/break)
const div3 = document.getElementById('div3'); //date and time div in front page
const div4 = document.getElementById('div4'); //start session div in front page
const div5 = document.getElementById('div5'); //add subject div in front page
const subListDiv = document.getElementById('div6'); //sublist in front page (only subjects)
const div6extended = document.getElementById('div6extended'); //sublist extended with tasks etc
const div7 = document.getElementById('div7'); //in session main div (current subject, nav buttons)
const div8 = document.getElementById('div8'); //in session task div (task list, add task button)
const divs = [div1, div2, div3, div4, div5, subListDiv, div6extended, div7, div8];
const alertDiv = document.getElementById('alertDiv');

let subUl = document.getElementById('subUl');//add children to this ul for new subjects (let bc must be accessible/updatable in addSubject function)
const subTaskList = document.getElementById('subTaskList');
const timerMins = document.getElementById('timerMins');
const timerSecs = document.getElementById('timerSecs');
const alertH2 = document.getElementById('alertH2');

//button & input selectors
const expandSubList = document.getElementById('expandSubList');//expand button in sublist
const collapseSubList = document.getElementById('collapseSubList');//collapse button in extended sublist
const addNewSubBtn = document.getElementById('addNewSub');
const startSessionBtn = document.getElementById('startSession');
const endSessionBtn = document.getElementById('endSession');
const nextSessionBtn = document.getElementById('nextSession');
const skipSessionBtn = document.getElementById('skipSession');
const alertOkBtn = document.getElementById('alertOkButton');

const breaksYes = document.getElementById('breaksYes');
const inSessionTaskAdder = document.getElementById('inSessionTaskAdder'); //  ?


//function

const renderFunction = (state) => {
    if (state.inSession){
        console.log('in session');
    } else{
        console.log('not in session');
    }
}

export default renderFunction;