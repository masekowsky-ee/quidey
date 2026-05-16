class StudySubject {
    constructor(name, dueDate, confidenceLevel) {
        this.name = name;
        this.dueDate = dueDate;
        this.now = new Date();
        this.creationDate = new Date(Date.now()).toISOString().split('T')[0];
        this.confidence = confidenceLevel;
        this.daysLeft = 0;
        this.practicedAmount = 1;
        this.urgency = 0;
        this.tasks = [];

        calculateDaysLeft(this);
        calculateUrgency(this);

        subArray.push(this);
        console.log(this);
    }
/*
    addSession(timeSpent) {
        const session = {
            date: new Date(),
            timeSpent: timeSpent
        };
        sessionArray.push(session);
        this.practicedAmount += 1;
        this.calculateUrgency();
    }
*/
}

class Task {
    constructor(name, subject) {
        this.name = name;
        this.creationDate = new Date();
        this.dueDate = subject.dueDate;
        this.done = false;
        this.priority = 0;
        this.description = "";

        subject.tasks.push(this);
    }
    set Priority(priority) {
        this.priority = priority;
    }

    set Description(description) {
        this.description = description;
    }

    set DueDate(dueDate) {
        this.dueDate = dueDate;
    }

    markAsDone() {
        this.done = true;
    }
}
//creator functions
function calcUrgency(sub){
    sub.urgency = sub.daysLeft * sub.confidence * sub.practicedAmount;
}

function addTask(name, sub){
    new Task(name, sub);
}

function sortTasks(criteria){
    this.tasks.sort((a,b)=>{
        return a.criteria - b.criteria;
    });
}

function calculateDaysLeft(sub){
    const today = new Date();
    const timeDiff = new Date(sub.dueDate) - today;
    sub.daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

//

const sortSubs = () => {
    subArray.forEach(sub => {
        calcUrgency(sub);
    });
    const compareUrgency = (a,b) => {
        return a.urgency - b.urgency ;
    }
    subArray.sort(compareUrgency);
    console.log("New Sorted SubArray: " + subArray);
}

export { StudySubject, Task };
export { calcUrgency, addTask, sortTasks, calculateDaysLeft, sortSubs };