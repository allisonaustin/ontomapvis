const DomainCode = {
    CONFERENCE: 0,
    ANATOMY: 1
};

//var selectedDomain = DomainCode.CONFERENCE;
var taskset;
var tasknum=0;
var d1;
var d2;
var csvData;
var secondDomain;

window.addEventListener('load', function() {
    console.log("Task: Ready to generate form!");

    csvData = new Array(20);
    getDomainOrder();
    selectedDomain = d1;
    initCSV(csvData);
    
    //Data
    taskset = getTaskset(selectedDomain);
    if(selectedDomain==0) 
    {
        setDataset(dataset1);
    } else {
        setDataset(dataset2);
    }

    selectedTask = assignOneTask(taskset, tasknum);
    generateTaskForm(selectedTask);
    tasknum++;
});

function initCSV(csvData) {
    this.csvData = csvData;
}

function setTask(task) {
    this.selectedTask = task;
}

function setDomain(domain) {
    this.selectedDomain = domain;
}

function setVis(vis) {
    this.vis = vis;
}

function getDomainOrder() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var firstDomain = urlParams.get('first-domain');
  if(firstDomain=='0') 
  {
      d1 = 0;
      d2 = 1;
  } else if(firstDomain=='1')
  {
      d1 = 1;
      d2 = 0;
  }
}

function getParticipant() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  return urlParams.get('participantID');
}

function getTaskset(selectedDomain) {
    switch(selectedDomain) {
        case DomainCode.CONFERENCE:
            taskset = taskDatasets.conference;
            break;
        case DomainCode.ANATOMY:
            taskset = taskDatasets.anatomy;
            break;
    }
    return taskset;
}

function assignOneTask(taskset, n) {
    console.log(`Task: '${taskset.domain}' domain selected as a task dataset.`);
    //TODO: Control this randomly assigned task to a proper one
    //let rd = Math.floor(Math.random() * taskset.tasks.length);
    //console.log('Task: random number ' + rd);
    return taskset.tasks[n];
}

function nextTask() {
    var valid = validateForm();
    if(valid) {
        saveData();
        if(tasknum==taskset.tasks.length) { // switching domain and taskset
            if(!secondDomain) {
                tasknum = 0;
                setDomain(d2);
                taskset = getTaskset(this.selectedDomain);
                // clearing svg div
                if(this.vis == "baseline") document.getElementById("baseline-svg").replaceChildren([]);
                else document.getElementById("matrix-svg").replaceChildren("");
                if(this.selectedDomain==0) 
                {
                    setDataset(dataset1);
                } else {
                    setDataset(dataset2);
                }
                if(this.vis == "baseline") drawBaselineSvg();
                else drawMatrixSvg();
                secondDomain = true;
            }
            else {
                // downloading data
                window.open('data:text/csv;charset=utf-8' + csvData.join(','));
                document.getElementById("submit").type="submit";
                document.getElementById("taskForm").action = "closing_form.html";
                return valid;
            }
        } else if(tasknum == taskset.tasks.length-1 && secondDomain) {
            document.getElementById("submit").value="Finish";
        }
        selectedTask = assignOneTask(taskset, tasknum++);
        generateTaskForm(selectedTask);
        return valid;
    } else {
        nextTask();
    }
}

function generateTaskForm(task) {
    console.log('Task: generateTaskForm()');
    console.log(`Task: qtype:${task.qtype} atype:${task.atype}`);
    // console.log(task);

    //Show question
    $('#taskDiv .task-question').html(task.question);

    //Show answer input
    //3 types of answer: 1) y/n, 2) number, 3) class
    //var answerDiv = $('#taskDiv #answerDiv');
    var answerDiv = document.getElementById("answerDiv");
    if (task.atype == "y/n") {
        answerDiv.innerHTML=(`
            <select class="task-answer form-control" id="inputSelect" name="taskSelect">
                <option selected>Choose...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        `);
    } else if (task.atype == "number") {
        answerDiv.innerHTML=(`
            <input type=number id="inputNumber" name="taskNumber" class="form-control" min="0" onkeydown="return (event.keyCode!=13 && event.keyCode!=189);">
        `);
    } else if (task.atype == "class") {
        answerDiv.innerHTML=(`
            <input type=text id="inputText" name="taskClassName" class="form-control" onkeydown="return (event.keyCode!=13);" autocomplete="off">
        `);
    }
    
}

/**
 * Validates task form
 */
function validateForm() {
    //Validates based on input form
    if (selectedTask.atype == "y/n") {
        var select = $('select.task-answer').val();
        console.log('Task: select:', select);
        if (select != "yes" && select != "no") {
            /* $('#validateMsg').html("Complete the task.");
            return false; */
        }
    } else if (selectedTask.atype == "number") {
        /* if ($('#answerDiv #inputNumber').val().length == 0) {
            $('#validateMsg').html("Complete the task.");
            return false;
        } */
        if ($('#answerDiv #inputNumber').val() < 0) {
            $('#validateMsg').html("Answer cannot be negative.");
            return false;
        }
    } else if (selectedTask.atype == "class") {
        /* if ($('#answerDiv #inputText').val().length < 3) {
            $('#validateMsg').html("Complete the task.");
            return false;
        }*/ 
    }
    //TODO: validate other condition like 1) some interaction with the visualization..
    $('#validateMsg').html("");
    return true;
}

function saveData() {
    let c = tasknum;
    if(secondDomain) c+=15;
    this.csvData[c] = new Array();
    // visualization
    this.csvData[c][0] = this.vis;
    // domain
    this.csvData[c][1] = this.selectedDomain;
    // qtype
    this.csvData[c][2] = this.selectedTask.qtype;
    // question
    this.csvData[c][3] = this.selectedTask.question;
    // user_answer
    if(selectedTask.atype=="number") {
        let num_input = $('#answerDiv #inputNumber').val();
        // checking for null values
        if(num_input==null) this.csvData[c][4] = "";
        else this.csvData[c][4] = num_input;
    } else if(selectedTask.atype=="class") {
        let text_input = $('#answerDiv #inputText').val();
        if(text_input==null) this.csvData[c][4] = "";
        else this.csvData[c][4] = text_input;
    }
    // correct
    if (selectedTask.atype=="number")
        if(this.csvData[c][4] == this.selectedTask.answer) this.csvData[c][5] = 1;
        else this.csvData[c][5] = 0;
    else if(selectedTask.atype=="class") {
        if(this.csvData[c][4].toLowerCase() == this.selectedTask.answer.toLowerCase()) this.csvData[c][5] = 1;
        else this.csvData[c][5] = 0;
    }
    // p_id
    this.csvData[c][6] = getParticipant();
    
    // window.open('data:text/csv;charset=utf-8' + csvData.join(','));
    this.csvData[c].join(',');
    this.csvData[c] += "\n";

    console.log('Data added successfully');
}
