import { subArray, sessionArray } from "./classModule";

const intervalFunction = () => {
    this.interval.active = true;
    this.interval.sessionInterval = setInterval(()=>{
        this.interval.intervalState--; // count
        console.log(this.interval.intervalState);    //log timer to console for test purposes
        if(this.interval.intervalState === 0 || this.interval.pauseInterval === true || this.interval.skipInterval === true){ //check for condition to finish
            clearInterval(this.interval.sessionInterval);
            this.interval.active = false;
        }
    }, 1000);
}

const saveSession = () => {
    sessionArray.push(
        {date: new Date(Date.now()).toISOString().split('T')[0], totalTime: state.session.timeSpent,}
    );
}

const state = {
    inSession: false,
    start(){
        this.inSession = true;
    },
    session: {
        subject: subArray[0],
        breaks: true,
        timeSpent: 0,
        sessionAmount: 3,
        sessionsDone: 0,
        breaksDone: 0,
        breakLength: 5*60,     //break length in secs
        sessionLength: 25*60,  //session length in secs
        totalLength: 90*60,     //total length in secs
        interval: {
            sessionInterval: null,  // key for interval
            intervalState: null,    //countdown key
            pauseInterval: false,   //pause
            skipInterval: false,     //skip
            active: false
        },
        finished: false,
        subjectsStudied = [],
        step(){
            if (this.sessionsDone === 0){
                this.start();
            } else if (this.sessionsDone < this.sessionAmount) {
                this.next();
            } else if (this.sessionsDone === this.sessionAmount){
                this.finish();
            }
        },

        // only call step function  

        start(){ //start session 
            this.interval.intervalState = this.sessionLength; //assign countdown
            intervalFunction();
        },
        next(){
            if(this.interval.active === false){ //check that interval is not currently running
                if(this.interval.intervalState === 0){//go to next 
                    if(this.breaks){ //breaks - check if session or break
                        if(this.sessionsDone === this.breaksDone){//when coming out of a session
                            this.sessionsDone ++;
                            subArray[0].practicedAmount ++;
                            sortSubs();
                            this.interval.intervalState = this.breakLength;
                            intervalFunction();
                        } else{ // when coming out of a break
                            this.breaksDone ++;
                            this.interval.intervalState = this.sessionLength;
                            intervalFunction();
                        }
                    }else{ //no breaks - instant continue
                        this.sessionsDone ++;
                        subArray[0].practicedAmount ++;
                        sortSubs();
                        //update state session subject !!!
                        this.interval.intervalState = this.sessionLength;
                        intervalFunction();
                    }
                } else{ //continue countdown
                    this.interval.intervalState = this.sessionLength;
                    intervalFunction();
                }
            }
        },
        finish(){   // finish session
            saveSession();
            state.inSession = false;
        }
    }
}
