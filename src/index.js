import './normalize.css';
import './style.scss';
import moment from 'moment';

const toDo = (title, dueDate = null, priority = null, complete = false) => {
  return {title, dueDate, priority, complete};
}

const list = (name) => {
  const content = [];

  const changeCompleteStatus = (index) => {
    if (content[index].complete === true) {
      content[index].complete = false;
    } else {
      content[index].complete = true;
    }
  }

  const appendToDo = (toDo) => {
    content.push(toDo);
  }

  const removeToDo = (i) => {
    content.splice(i, 1);
  }

  const changePriority = (i) => {
    if (content[i].priority === 'normal') {
      content[i].priority = 'important';
    } else {
      content[i].priority = 'normal';
    }
  }

  return {name, content, changeCompleteStatus, appendToDo, removeToDo, changePriority};
}

// Default list
const homeList = list('home');
let test1 = toDo('Clean room', '2022-05-11', 'normal');
let test2 = toDo('Learn react', '2022-05-19', 'important');
let test3 = toDo('Work out', '2022-05-14', 'low');
homeList.appendToDo(test1);
homeList.appendToDo(test2);
homeList.appendToDo(test3);

const displayList = (list) => {
  let listContainer = document.querySelector('.list');
  let i = 0;
  for (let item of list.content) {
    let toDo = document.createElement('div');
    toDo.classList.add('to-do');
    toDo.setAttribute('data-index', i);
    i++;

    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('to-do__checkbox');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (item.complete === true) {
      checkbox.checked = true;
      toDo.classList.add('complete');
    }
    checkboxContainer.appendChild(checkbox);

    toDo.appendChild(checkboxContainer);

    let informationContainer = document.createElement('div');
    informationContainer.classList.add('to-do__information');

    let title = document.createElement('div');
    title.classList.add('to-do__title');

    if (item.priority === 'important') title.classList.add('important');

    title.textContent = item.title;
    informationContainer.appendChild(title);

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
    informationContainer.appendChild(date);

    let icons = document.createElement('div');
    icons.classList.add('icons');

    let priorityIcon = document.createElement('i');
    priorityIcon.setAttribute('class', 'fa-solid fa-triangle-exclamation');
    icons.appendChild(priorityIcon);

    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fa-solid fa-trash');
    icons.appendChild(deleteIcon);

    informationContainer.appendChild(icons);

    toDo.appendChild(informationContainer);

    listContainer.appendChild(toDo);
  }
}

const clearDisplay = () => {
  let listItems = document.querySelectorAll('.list div');
  listItems.forEach(item => {
    item.remove();
  });
}

displayList(homeList);


const buildToDo = () => {
  let title = document.querySelector('#title');
  let dueDate = document.querySelector('#date');
  let priority = document.querySelector('#priority');
  return toDo(title.value, date.value, priority.value);
}

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', () => {
  let title = document.querySelector('#title');
  if (title.value === '') return;
  homeList.appendToDo(buildToDo());
  clearDisplay();
  displayList(homeList);
  console.log(homeList.content);
});


// Set event listeners
let listItems = document.querySelectorAll('.to-do');
listItems.forEach(item => {
  let i = item.getAttribute('data-index');

  let checkbox = item.querySelector('.to-do__checkbox input');
  checkbox.addEventListener('click', () => {
    homeList.changeCompleteStatus(i);
    console.log(homeList.content);
    item.classList.toggle('complete');
  });

  let deleteIcon = item.querySelector('.fa-trash');
  deleteIcon.addEventListener('click', () => {
    homeList.removeToDo(i);
    clearDisplay();
    displayList(homeList);
  });

  let priorityIcon = item.querySelector('.fa-triangle-exclamation');
  priorityIcon.addEventListener('click', ()=> {
    homeList.changePriority(i);
    clearDisplay();
    displayList(homeList);
  });
});
