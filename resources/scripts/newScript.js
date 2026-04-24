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