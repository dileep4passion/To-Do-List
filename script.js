document.addEventListener('DOMContentLoaded',()=>{
const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
// const deleteButton = document.getElement

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach((task)=>renderTasks(task))
function event() {
    const taskText = todoInput.value.trim();
    if (taskText==="") {
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask)
    saveTasks();
    renderTasks(newTask)
    todoInput.value = ""; //clear input

}
addTaskButton.addEventListener('click', event)
todoInput.addEventListener("keypress",(e)=>{
    if (e.key === "Enter") {
        event();
    }
})

function saveTasks() {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTasks(task) {
   const li = document.createElement('li')
   li.setAttribute('data-id',task.id)
   li.innerHTML = `<span>${task.text}</span><button>delete</button>`;
   li.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON') return;
    task.completed = !task.completed
    li.classList.toggle('completed');
    saveTasks();
   })

   li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation() //prevention
    tasks = tasks.filter(t => t.id!==task.id)
    li.remove();
    saveTasks();
   })

   todoList.appendChild(li);
}
})