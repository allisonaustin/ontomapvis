const DomainCode = {
    CONFERENCE: 0,
    ANATOMY: 1
};

//var selectedDomain = DomainCode.CONFERENCE;
var taskset;
var tasknum=0;

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
        if(tasknum==taskset.tasks.length) {
            document.getElementById("submit").type="submit";
            document.getElementById("taskForm").action=target;
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
            <input type=number id="inputNumber" name="taskNumber" class="form-control" placeholder="a number" required>
        `);
    } else if (task.atype == "class") {
        answerDiv.innerHTML=(`
            <input type=text id="inputText" name="taskClassName" class="form-control" minlength="3" placeholder="a class name" required>
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
        }
    } else if (selectedTask.atype == "class") {
        if ($('#answerDiv #inputText').val().length < 3) {
            $('#validateMsg').html("Complete the task.");
            return false;
        }
    }
    //TODO: validate other condition like 1) some interaction with the visualization..
    $('#validateMsg').html("");
    return true;
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
