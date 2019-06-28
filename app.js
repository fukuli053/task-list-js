//Define elements
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const newTask = document.querySelector('#task');

//Load all events
loadEventListeners();

function loadEventListeners() {
    //Load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Form submit event
    form.addEventListener('submit',addTask);
    //Task add button click event
    taskList.addEventListener('click', deleteTask);
    //Clear button click event
    clearButton.addEventListener('click', deleteAllTasks);
}

//Get tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        let link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class ="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//Add new task
function addTask(e){

    if(newTask.value === ''){
        alert('Sakın boş bırakma !');
    }else{
        let li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(newTask.value));
        let link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class ="fa fa-remove"></i> ';
        li.appendChild(link);

        taskList.appendChild(li);

        //Store in Local Storage
        storeTaskInLocalStorage(newTask.value);

        newTask.value = '';
    }

    e.preventDefault();
}

//Set tasks at local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete Task
function deleteTask(e) {
    let taskItem = e.target.parentElement.parentElement;
    if(e.target.parentElement.classList.contains('delete-item')){

        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task, index) {
            if(taskItem.textContent === task){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskItem.remove();
    }
}

// Delete All Tasks
function deleteAllTasks() {
    //Delete from UI
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Delete from Local Storage
    localStorage.clear();
}