const DomainCode = {
    CONFERENCE: 0,
    ANATOMY: 1
};

//var selectedDomain = DomainCode.CONFERENCE;
var taskset;
var tasknum=0;
var csvData = new Array(11);

window.addEventListener('load', function() {
    console.log("Task: Ready to generate form!");
    
    //Data
    switch(selectedDomain) {
        case DomainCode.CONFERENCE:
            taskset = taskDatasets.conference;
            break;
        case DomainCode.ANATOMY:
            taskset = taskDatasets.anatomy;
    }
    selectedTask = assignOneTask(taskset, tasknum);
    generateTaskForm(selectedTask);
    tasknum++;
});

function setTask(task) {
    this.selectedTask = task;
}

function setDomain(domain) {
    this.selectedDomain = domain;
}

function setVis(vis) {
    this.vis = vis;
}

function setTarget(target) {
    this.target = target;
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
        if(tasknum==taskset.tasks.length) {
            document.getElementById("submit").type="submit";
            document.getElementById("taskForm").action=target;
            // downloading data
            window.open('data:text/csv;charset=utf-8' + csvData.join(','));
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
            <select class="task-answer form-control" id="inputSelect" name="taskSelect" required>
                <option selected>Choose...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        `);
    } else if (task.atype == "number") {
        answerDiv.innerHTML=(`
            <input type=number id="inputNumber" name="taskNumber" class="form-control" min="0" onkeydown="return (event.keyCode!=13);" required>
        `);
    } else if (task.atype == "class") {
        answerDiv.innerHTML=(`
            <input type=text id="inputText" name="taskClassName" class="form-control" onkeydown="return (event.keyCode!=13);" autocomplete="off" required>
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
            $('#validateMsg').html("Complete the task.");
            return false;
        }
    } else if (selectedTask.atype == "number") {
        if ($('#answerDiv #inputNumber').val().length == 0) {
            $('#validateMsg').html("Complete the task.");
            return false;
        } else if ($('#answerDiv #inputNumber').val() < 0) {
            $('#validateMsg').html("Answer cannot be negative.");
            return false;
        }
    } else if (selectedTask.atype == "class") {
        if ($('#answerDiv #inputText').val().length < 1) {
            $('#validateMsg').html("Complete the task.");
            return false;
        }
    }
    //TODO: validate other condition like 1) some interaction with the visualization..
    $('#validateMsg').html("");
    return true;
}

function saveData() {
    csvData[tasknum+1] = new Array();
    // visualization
    csvData[tasknum+1][0] = this.vis;
    // domain
    csvData[tasknum+1][1] = selectedDomain;
    // qtype
    csvData[tasknum+1][2] = selectedTask.qtype;
    // question
    csvData[tasknum+1][3] = selectedTask.question;
    // user_answer
    if(selectedTask.atype=="number") {
        csvData[tasknum+1][4] = $('#answerDiv #inputNumber').val();
    } else if(selectedTask.atype=="class") {
        csvData[tasknum+1][4] = $('#answerDiv #inputText').val();
    }
    // correct
    if (selectedTask.atype=="number")
        if(csvData[tasknum+1][4] == selectedTask.answer) csvData[tasknum+1][5] = 1;
        else csvData[tasknum+1][5] = 0;
    else if(selectedTask.atype=="class") {
        if(csvData[tasknum+1][4].toLowerCase() == selectedTask.answer.toLowerCase()) csvData[tasknum+1][5] = 1;
        else csvData[tasknum+1][5] = 0;
    }
    // p_id
    csvData[tasknum+1][6] = "p1";
    
    // window.open('data:text/csv;charset=utf-8' + csvData.join(','));
    csvData[tasknum+1].join(',');
    csvData[tasknum+1] += "\n";

    console.log('Data added successfully');
}


// //Trying to load data from csv file using PapaParse.. not working yet
// $.getScript("../../libs/papaparse.min.js", function() {
//     console.log('Task: PapaParse script loaded.');
// });
// function loadTaskData() {
//     console.log('Task: loadTaskData()');
//     Papa.parse("https://github.io/sellabae/ontomapvis/userstudy/tasks/tasks-anatomy.csv", {
//         download: true,
//         complete: function(results) {
//             console.log(results);
//         }
//     });
// }
