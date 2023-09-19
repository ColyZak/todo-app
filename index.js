(function() {


function getTasks(){
  return JSON.parse(localStorage.getItem('tasks'))
}


let initialTasks = getTasks() || [];

const countElement = document.querySelector(".count");


//function counter
function setCount(count) {
  countElement.innerHTML = count;
}
//ajouter dans le localStorage
function setTasks(tasks){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}



setTasks(initialTasks);
let tasks = getTasks();

// modal
let modal = document.getElementById("taskModal");
let modalButton = document.getElementById("addTaskModalButton");
let close = document.querySelector(".close");

modalButton.onclick = function () {
  modal.style.display = "block";
};
close.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// creer une tache

let addTaskButton = document.querySelector(".addTaskButton");
addTaskButton.onclick = function (e) {
  e.preventDefault();
  const titre = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priorite = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const id = Date.now();
  
  

  if (!titre || !description || !priorite || !deadline) {
    alert("Merci de tout remplir");
    return;
  }
  const newTask = { titre, description, priorite, deadline, id };
  tasks.push(newTask);
  setCount(tasks.length);
  setTasks(tasks)

 const section = document.createElement('section');
 section.classList.add('task-card');

 const taskState = document.createElement('input');
 taskState.setAttribute('type', 'checkbox');
 taskState.setAttribute('name', 'taskState');
 taskState.setAttribute('id', 'taskState');
 taskState.setAttribute('checked', false);
 taskState.addEventListener('click', (e) => {
  title.classList.toggle('overlined')
 })

 const title = document.createElement('h1');
 title.innerHTML= titre;

 const taskList = document.querySelector('.tasks')

 const hidden = document.createElement('div');
 hidden.classList.add('hidden')
 const desc = document.createElement('p');
 const prior = document.createElement('p');
 const deadl = document.createElement('p');
 const state = document.createElement('p');
 desc.classList.add('task-description');
 desc.innerHTML = description;
 
 prior.classList.add('task-priority');
 prior.innerHTML = 'Priorite : ' + priorite;
 deadl.classList.add('task-deadline');
 deadl.innerHTML = 'Deadline : ' + deadline + 'jours';
 state.innerHTML = taskState.checked ? 'Termine' : 'En cours'


 hidden.appendChild(desc);
 hidden.appendChild(prior);
 hidden.appendChild(deadl);

 const actions = document.createElement('div');


 const detailButton = document.createElement('button');
 detailButton.innerText = 'Deatils';
 detailButton.classList.add('details-btn');
 
 detailButton.addEventListener('click', (e) => {
	hidden.classList.toggle('hidden')
 })
 const updateButton = document.createElement('button');
 updateButton.innerText = 'Modifier';
 updateButton.classList.add('update-btn');
 
 const deleteButton = document.createElement('button');
 deleteButton.innerText = 'Supprimer';
 deleteButton.classList.add('delete-btn');
   deleteButton.setAttribute("index", id);

  
    deleteButton.addEventListener("click", deleteTask)
 actions.appendChild(detailButton);
 actions.appendChild(updateButton);
 actions.appendChild(deleteButton);

 section.appendChild(taskState);
 section.appendChild(title);
 section.appendChild(hidden);
 section.appendChild(actions);

 taskList.append(section);

 //vider les input
 document.getElementById("title").value = "";
 document.getElementById("description").value = "";
 document.getElementById("priority").value = "";
 document.getElementById("deadline").value = "";
  modal.style.display = "none";

  function deleteTask(){
    const id = this.getAttribute("index");
  
    let filteredTask = tasks.filter(
      (task) => task.id != id
    );
    tasks = filteredTask;
    setCount(tasks.length);
    setTasks(tasks)
  
    let section = document.querySelector('.task-card');
    section.parentNode.removeChild(section);
   
  }
}
})()

