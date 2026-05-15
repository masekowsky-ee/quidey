class StudySubject {
    constructor(name, dueDate, confidenceLevel) {
        this.name = name;
        this.dueDate = dueDate;
        this.creationDate = new Date();
        this.confidence = confidenceLevel;
        this.daysLeft = this.calculateDaysLeft();
        this.practicedAmount = 1;
        this.urgency = this.calculateUrgency();
        this.tasks = [];

        subArray.push(this);
    }

    calculateDaysLeft() {
        const today = new Date();
        const timeDiff = this.dueDate - today;
        this.daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    calculateUrgency() {
        this.urgency = this.daysLeft * this.confidence * this.practicedAmount;
    }

    addTask(taskName){
        new Task(taskName, this);
    }

    addSession(timeSpent) {
        const session = {
            date: new Date(),
            timeSpent: timeSpent
        };
        sessionArray.push(session);
        this.practicedAmount += 1;
        this.calculateUrgency();
    }
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

export { StudySubject, Task };