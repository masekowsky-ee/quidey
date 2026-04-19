//system state
let steps;

let state = {currentStep: 'home', currentIndex: 0};

steps = [
    {name: 'home', next(){
        state.currentStep = 'subjects';
        state.currentIndex = 0;
        printState();
        renderUpdate();
    }, back(){
        //nothing happens this is the first page right now
        //button won't be rendered anyways
    }}, 

    {name: 'subjects', next(){
        if(subjectList.length > 0){
            state.currentStep = 'dates';
            state.currentIndex = 0;
            updateLocalStorage();
            printState();
            renderUpdate();
        } else {
            window.alert('Gib ein Fach ein');
        }
    }, back(){
        state.currentStep = 'home';
        printState();
        renderUpdate();
    }}, 

    {name: 'dates', next(){
        storeData();
        updateLocalStorage();
        if(subjectList[state.currentIndex].date){
            if (state.currentIndex+1 === subjectList.length){
                state.currentStep = 'confidence';
                state.currentIndex = 0;
                printState();
                renderUpdate();
            }else{   
                state.currentIndex++;
                printState();
                indexUpdate();
            }
        } else {
            window.alert("Gib ein datum ein");
        }
    }, back(){
        if (state.currentIndex === 0){
            state.currentStep = 'subjects';
            printState();
            renderUpdate();
        }else{
            state.currentIndex--;
            printState();
            indexUpdate();
        }
    }}, 

    {name: 'confidence', next(){
        state.currentStep = 'time';
        state.currentIndex = 0;
        updateLocalStorage();
        printState();
        renderUpdate();
    }, back(){
        state.currentStep = 'dates';
        state.currentIndex = subjectList.length - 1;
        printState();
        renderUpdate();
    }}, 

    {name: 'time', next(){
        if(Number(document.getElementById("minsPerDay").value) === 15 || Number(document.getElementById("minsPerDay").value) === 30 || Number(document.getElementById("minsPerDay").value) === 45){
            if(document.getElementById("hoursPerDay").value <= 3){
                storeData();
                state.currentStep = 'summarize';
                state.currentIndex = 0;
                updateLocalStorage();
                printState();
                renderUpdate();
            } else{
                window.alert('Gib maximal drei Stunden ein');
            };
        } else {
            window.alert('Bitte nutze 15 Minuten Schritte');
        }
    }, back(){
        state.currentStep = 'confidence';
        printState();
        renderUpdate();
    }},

    {name: 'summarize', next(){
        state.currentStep = 'wait';
        state.currentIndex = 0;
        updateLocalStorage();
        initializePageSwitch();
        printState();
        renderUpdate();
    }, back(){
        state.currentStep = 'time';
        printState();
        renderUpdate();
    }},

    {name: 'wait', next(){}, back(){}}
];

//user subject data
let subjectList = [];
let subjectNames = [];
let userTime = {frequency: 2, minutes: 30};
const printState = () => {
    console.log(state);
}

const updateLocalStorage = () => {
    localStorage.setItem("learnItemsData", JSON.stringify(subjectList));
    localStorage.setItem("userTime", JSON.stringify(userTime));
    console.log(JSON.parse(localStorage.getItem("learnItemsData")));
};

//store data function with the continue button
const storeData = () => {
    switch(state.currentStep) {
        case ('home'):
            break;
        case ('subjects'):
            break;
        case ('dates'):
            if(document.getElementById("dateInput").value){
                let input = document.getElementById("dateInput").value;
                let inputDate = new Date(input);
                let today = new Date();
                if (inputDate > today){
                    subjectList[state.currentIndex].date = document.getElementById("dateInput").value;
                    console.log(subjectList);
                } else{
                    window.alert("Gib ein zukünftiges Datum ein.");
                };
            };
            break;
        case ('confidence'):
            break;
        case('time'):
            userTime.frequency = document.querySelector('input[name = "days"]:checked')?.value;
            let hours = Number(document.getElementById("hoursPerDay").value)*60;
            let mins = Number(document.getElementById("minsPerDay").value);
            userTime.minutes = hours + mins;
            console.log(userTime);
            break;
        case ('summarize'):
            break;
    }
}

//renderer

let lastActive = 'home';

const renderUpdate = () => {
    const questionnaireSwitch = () => {
        document.getElementById(lastActive).classList.remove('display');
        document.getElementById(state.currentStep).classList.add('display');
        /*if(document.getElementById("navDiv").classList.contains("display") === false){
            document.getElementById("navDiv").classList.add("display");
        }*/
       if(state.currentStep === 'home'){
            if (document.getElementById('backButton').classList.contains('hidden')){}else{
                document.getElementById('backButton').classList.add('hidden');
            }
       } else {
        if (document.getElementById('backButton').classList.contains('hidden')) {
            document.getElementById('backButton').classList.remove('hidden');
        }
       }
        if (state.currentStep === 'dates'){ //update the date info on rendering
            document.getElementById("currentDateSubject").textContent = subjectNames[state.currentIndex].toUpperCase();                          //removed .toUpperCase();
            document.getElementById("dateProgress").textContent = `${state.currentIndex+1}/${subjectNames.length}`;
        } else if (state.currentStep === 'confidence'){ //build the elements on the confidence page when rendered
            buildConfidencePage();
        } else if (state.currentStep === 'summarize'){ //build the elements on the summarize page when rendered
            buildSummarizePage();
        } else if (state.currentStep === 'wait') {
            document.getElementById("navDiv").classList.remove("display");
        };
        if (lastActive === 'confidence'){  //delete all items from the confidence page once you leave it
            let sliderDiv = document.getElementById("sliderDiv")
            while(sliderDiv.firstChild){
                sliderDiv.removeChild(sliderDiv.firstChild);
            }
        } else if (lastActive === 'summarize'){  //delete all items from the summarize page once you leave it
            let summarizeDivParent = document.getElementById("summarizeDiv");
            let childDivCounter = 0;
            for (sub in subjectList){
                let summarizeDiv = document.getElementById(`summarize${childDivCounter}`);
                while(summarizeDiv.firstChild){
                    summarizeDiv.removeChild(summarizeDiv.firstChild);
                };
                childDivCounter++;
            };
            while (summarizeDivParent.firstChild){
                summarizeDivParent.removeChild(summarizeDivParent.firstChild);
            };
        };
        lastActive = state.currentStep;
    };

    if(state.currentStep !== lastActive){
        questionnaireSwitch();
    };
};

//indexUptadeFunction for date steps if next is pressed
const indexUpdate = () => {
    if (state.currentStep === 'dates'){
        document.getElementById('dateInput').value = "";
        upperCase = (subjectNames[state.currentIndex]).toUpperCase();
        document.getElementById("currentDateSubject").textContent = upperCase;
        document.getElementById("dateProgress").textContent = `${state.currentIndex+1}/${subjectList.length}`;
    };
};

//determines which function in which subject Object to call in case of each button
const callRenderFunctionBack = () => {
        switch(state.currentStep){
            case 'home':
                break;
            case 'subjects':
                steps[1].back();
                break;
            case 'dates':
                steps[2].back();
                break;
            case 'confidence':
                steps[3].back();
                break;
            case 'time':
                steps[4].back();
                break;
            case 'summarize':
                steps[5].back();
                break;
            case 'wait':
                steps[6].back();
                break;
        }
};

const callRenderFunctionContinue = () => {
    switch(state.currentStep){
            case 'home':
                steps[0].next();
                break;
            case 'subjects':
                steps[1].next();
                break;
            case 'dates':
                steps[2].next();
                break;
            case 'confidence':
                steps[3].next();
                break;
            case 'time':
                steps[4].next();
                break;
            case 'summarize':
                steps[5].next();
                break;
            case 'wait':
                steps[6].next();
                break;
        }
}

//pageSwitcher
const pageSwitch = () => {
        window.location.href = "plan.html";
};
const initializePageSwitch = () => {
    
    setTimeout(pageSwitch, 5000);
};

//navigation buttons calling the function to determine what they will do
document.getElementById("continueButton").addEventListener("click", callRenderFunctionContinue);
document.getElementById("backButton").addEventListener("click", callRenderFunctionBack);
document.getElementById("leaveButton").addEventListener("click", pageSwitch);

//add and remove Subjects from <ul> and from the subject list Array
document.getElementById('addSubjectButton').addEventListener('click', function(){
    if (document.getElementById("subjectInput").value !== ""){
        if (subjectNames.includes(document.getElementById("subjectInput").value.toLowerCase().trim())){
            window.alert("Gib ein korrektes Fach ein, das noch nicht verwendet wurde.")
        } else {
            subjectList.push({subjectTitle: document.getElementById("subjectInput").value.trim().toLowerCase(), date: null, confidence: null, progress: 0, completed: false});
            subjectNames.push(document.getElementById("subjectInput").value.trim().toLowerCase())
            let li = document.createElement("li");
            li.textContent = document.getElementById("subjectInput").value.trim().toUpperCase();
            li.addEventListener("click", removeSubject);
            document.getElementById("subjectList").appendChild(li)
            console.log(subjectList);
            console.log(subjectNames);
            document.getElementById("subjectInput").value = "";
        }
    } else {
        window.alert("Gib ein korrektes Fach ein, das noch nicht verwendet wurde.")
    }
});

removeSubject = (event) =>{
    deleteItem = event.target.textContent.trim().toLowerCase();
    subjectList.splice(subjectNames.indexOf(deleteItem), 1)
    subjectNames.splice(subjectNames.indexOf(deleteItem), 1)
    event.target.remove();
    console.log(subjectList);
    console.log(subjectNames);
}


//confidence Page builder
const buildConfidencePage = () => {
    let rangeCounter = 0;
    for(sub of subjectList){
        let confidenceSection = document.getElementById("sliderDiv");
        //create range element with functionality
        let range = document.createElement("input");
        range.type = "range";
        range.id = `range${rangeCounter}`;
        range.class = rangeCounter
        range.min = 1;
        range.max = 5;
        range.step = 1;
        if(subjectList[range.class].confidence){
            range.value = subjectList[range.class].confidence
        } else {
            range.value = 3;
        }
        range.addEventListener('input', (event) => {            //update data when slider changed
            subjectList[range.class].confidence = range.value;
            console.log(subjectList[range.class]);
        })
        confidenceSection.appendChild(range);

        //create Label for range
        let label = document.createElement("label");
        label.for = `range${rangeCounter}`;
        label.textContent = (subjectNames[rangeCounter]).toUpperCase();
        confidenceSection.appendChild(label);
        
        //apply and log loaded slider data
        subjectList[rangeCounter].confidence = range.value;
        console.log(subjectList[rangeCounter]);

        rangeCounter++;
    }
}


//summarizeation page
const buildSummarizePage = () => {
    summarizeDiv = document.getElementById("summarizeDiv");
    let summarizeCounter = 0;
    for (sub of subjectList){
        let div = document.createElement("div");
        div.id = `summarize${summarizeCounter}`
        div.class = summarizeCounter;
        summarizeDiv.appendChild(div);

        //text input for subject name
        let textSumLabel = document.createElement('label');
        textSumLabel.for = `textSumLabel${summarizeCounter}`;
        textSumLabel.class = summarizeCounter;
        textSumLabel.textContent = "Fach:";
        div.appendChild(textSumLabel);

        let textSumInput = document.createElement('input');
        textSumInput.id = `textSumInput${summarizeCounter}`;
        textSumInput.class = summarizeCounter;
        textSumInput.placeholder = subjectNames[textSumInput.class];
        textSumInput.addEventListener('input', (event)=>{
            subjectList[textSumInput.class].subjectTitle = textSumInput.value.toLowerCase().trim();
            console.log(subjectList[textSumInput.class]);
        });
        div.appendChild(textSumInput);

        //date input for date of subject 
        let dateSumLabel = document.createElement('label');
        dateSumLabel.for = `dateSumInput${summarizeCounter}`;
        dateSumLabel.class = summarizeCounter;
        dateSumLabel.textContent = "Datum:";
        div.appendChild(dateSumLabel);

        let dateSumInput = document.createElement('input');
        dateSumInput.type = "date";
        dateSumInput.id = `dateSumInput${summarizeCounter}`;
        dateSumInput.class = summarizeCounter;
        dateSumInput.value = subjectList[dateSumInput.class].date;
        dateSumInput.addEventListener('input', (event)=>{
            subjectList[dateSumInput.class].date = dateSumInput.value;
            console.log(subjectList[dateSumInput.class]);
        });
        div.appendChild(dateSumInput);

        //range input for subjects confidence
        let rangeSumLabel = document.createElement('label');
        rangeSumLabel.for = `rangeSumInput${summarizeCounter}`;
        rangeSumLabel.class = summarizeCounter;
        rangeSumLabel.textContent = "Wissen:";
        div.appendChild(rangeSumLabel);

        let rangeSumInput = document.createElement('input');
        rangeSumInput.type = "range";
        rangeSumInput.min = "1";
        rangeSumInput.max = "5";
        rangeSumInput.id = `rangeSumInput${summarizeCounter}`;
        rangeSumInput.class = summarizeCounter;
        rangeSumInput.value = subjectList[rangeSumInput.class].confidence;
        rangeSumInput.addEventListener('input', (event)=>{
            subjectList[rangeSumInput.class].confidence = rangeSumInput.value;
            console.log(subjectList[rangeSumInput.class]);
        });
        div.appendChild(rangeSumInput);

        summarizeCounter++;
    }
}