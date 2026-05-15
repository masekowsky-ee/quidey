import { subArray } from "./classModule";

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
        start(){ //start session 
            if (breaks === false){ //no breaks
                this.interval.intervalState = this.totalLength; //assign countdown
                this.interval.active = true;
                this.interval.sessionInterval = setInterval(()=>{
                    this.interval.intervalState--; // count
                    console.log(this.interval.intervalState);    //log timer to console for test purposes
                    if(this.interval.intervalState === 0 || this.interval.pauseInterval === true || this.interval.skipInterval === true){ //check for condition to finish
                        clearInterval(this.interval.sessionInterval);
                        this.interval.active = false;
                    }
                }, 1000);
            } else if (breaks === true){
                this.interval.intervalState = this.sessionLength; //assign countdown
                this.sessionsDone ++;
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
        },
        next(){
            if(this.interval.active === false){ //check that interval is not currently running
                if(this.breaks){ //next logic if breaks included
                    if(this.sessionAmount > this.sessionsDone){
                        this.sessionsLeft -= 1;
                        this.timeSpent += this.sessionLength;
                        sortSubs();
                    } else {
                        this.finished = true;
                    }                           
                } else{ //next logic without breaks
                    if(this.interval.intervalState === 0 || this.interval.skipInterval === true){ //finish session if all time done or time is skipped
                        console.log("Session Done");
                        this.finished = true;
                    }else{
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
                }
            }
        },
        finish(){
            saveSession();
            state.inSession = false;
        }
    }
}
