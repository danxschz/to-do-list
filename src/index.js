import './normalize.css';
import './style.scss';
import moment from 'moment';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

const Project = (name) => {
  const list = [];

  const appendToDo = (toDo) => {
    list.push(toDo);
  }

  const removeToDo = (i) => {
    list.splice(i, 1);
  }

  const changeCompleteStatus = (i) => {
    if (list[i].complete === true) {
      list[i].complete = false;
    } else {
      list[i].complete = true;
    }
  }

  const changePriority = (i) => {
    if (list[i].priority === 'normal') {
      list[i].priority = 'important';
    } else {
      list[i].priority = 'normal';
    }
  }

  return {name, list, appendToDo, removeToDo, changeCompleteStatus, changePriority};
}

const displayList = (project) => {
  let list = document.querySelector('.list');
  let i = 0;
  for (let item of project.list) {
    let toDo = document.createElement('div');
    toDo.classList.add('to-do');
    toDo.setAttribute('data-index', i++); // Keep an eye for this change

    let checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add('to-do__checkbox');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (item.complete === true) {
      checkbox.checked = true;
      toDo.classList.add('complete');
    }
    checkboxDiv.appendChild(checkbox);
    toDo.appendChild(checkboxDiv);

    let contentDiv = document.createElement('div');
    contentDiv.classList.add('to-do__content');

    if (item.priority === 'important') {
      checkboxDiv.classList.add('important');
      contentDiv.classList.add('important');
    }

    let description = document.createElement('div');
    description.classList.add('to-do__description');
    description.textContent = item.description;
    contentDiv.appendChild(description);

    let date = document.createElement('div');
    date.classList.add('to-do__date');
    date.textContent = moment(item.dueDate).calendar({
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
    contentDiv.appendChild(date);

    let icons = document.createElement('div');
    icons.classList.add('icons');

    let priorityIcon = document.createElement('i');
    priorityIcon.setAttribute('class', 'fa-solid fa-triangle-exclamation');
    priorityIcon.setAttribute('title', 'Change priority');
    icons.appendChild(priorityIcon);

    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fa-solid fa-trash');
    icons.appendChild(deleteIcon);

    contentDiv.appendChild(icons);
    toDo.appendChild(contentDiv);
    list.appendChild(toDo);
  }
}

const clearDisplay = () => {
  let listItems = document.querySelectorAll('.to-do');
  listItems.forEach((item) => {
    item.remove();
  });
}

const buildToDo = () => {
  let description = document.querySelector('#description');
  let date = document.querySelector('#due-date');
  return ToDo(description.value, date.value);
}

const setAddToDoEvent = (project) => {
  let addToDoButton = document.querySelector('.to-do-form__button');
  addToDoButton.addEventListener('click', () => {
    let description = document.querySelector('#description');
    if (description.value === '') return;
    project.appendToDo(buildToDo());
    clearDisplay();
    displayList(project);
  });
}

const setToDoEvents = (project) => {
  let listItems = document.querySelectorAll('.to-do');
  listItems.forEach((item) => {
    let i = item.getAttribute('data-index');

    let checkbox = item.querySelector('.to-do__checkbox input');
    checkbox.addEventListener('click', () => {
      project.changeCompleteStatus(i);
      clearDisplay();
      displayList(project);
      //item.classList.toggle('complete');
    });

    let deleteIcon = item.querySelector('.fa-trash');
    deleteIcon.addEventListener('click', () => {
      project.removeToDo(i);
      clearDisplay();
      displayList(project);
    });

    let priorityIcon = item.querySelector('.fa-triangle-exclamation');
    priorityIcon.addEventListener('click', ()=> {
      project.changePriority(i);
      clearDisplay();
      displayList(project);
    });
  });
}

// Default project
const home = Project('home');
let test1 = ToDo('Walk the dog', '2022-05-16', 'normal');
let test2 = ToDo('Save the world', '2022-05-21', 'important');
let test3 = ToDo('Work out', '2022-05-20', 'normal');
home.appendToDo(test1);
home.appendToDo(test2);
home.appendToDo(test3);
displayList(home);
setAddToDoEvent(home);
setToDoEvents(home);
