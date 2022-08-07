import generateElement from 'generate-element';
import moment from 'moment';
import { ToDo } from './projectLogic';

const dateFormat = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY',
}

const setList = (list) => {
  const listDiv = document.querySelector('.list');

  list.forEach((item, i) => {
    const toDo = generateElement('div', 'to-do', false, { 'data-index': i });

    const checkboxDiv = generateElement('div', 'to-do__checkbox');
    const checkbox = generateElement('input', false, false, { type: 'checkbox' });
    if (item.status) {
      checkbox.checked = true;
      toDo.classList.add('complete');
    }
    checkboxDiv.appendChild(checkbox);
    toDo.appendChild(checkboxDiv);

    const contentDiv = generateElement('div', 'to-do__content');
    if (item.priority) {
      checkboxDiv.classList.add('important');
      contentDiv.classList.add('important');
    }

    const description = generateElement('div', 'to-do__description', item.description)
    contentDiv.appendChild(description);

    const date = generateElement('div', 'to-do__date');
    if (item.date) {
      date.textContent = moment(item.date).calendar(dateFormat);
    }
    contentDiv.appendChild(date);

    const icons = generateElement('div', 'icons');
    const priorityIcon = generateElement('i', 'fa-solid fa-triangle-exclamation')
    icons.appendChild(priorityIcon);
    const deleteIcon = generateElement('i', 'fa-solid fa-trash');
    icons.appendChild(deleteIcon);

    contentDiv.appendChild(icons);
    toDo.appendChild(contentDiv);
    listDiv.appendChild(toDo);
  });
}

const clearList = () => {
  const list = document.querySelector('.list');
  list.replaceChildren();
};

const updateList = (list) => {
  clearList();
  setList(list);
  setToDoBtns(list);
};

const setToDoBtns = (list) => {
  const toDos = document.querySelectorAll('.to-do');
  toDos.forEach((toDo) => {
    const i = toDo.getAttribute('data-index');
    const { status, priority } = list[i];

    const checkbox = toDo.querySelector('.to-do input');
    checkbox.addEventListener('click', () => {
      list[i].status = !status;
      updateList(list);
    });

    const priorityIcon = toDo.querySelector('.fa-triangle-exclamation');
    priorityIcon.addEventListener('click', () => {
      list[i].priority = !priority;
      updateList(list);
    });

    const deleteIcon = toDo.querySelector('.fa-trash');
    deleteIcon.addEventListener('click', () => {
      list.splice(i, 1);
      updateList(list);
    });
  });
}

const createToDo = () => {
  const description = document.querySelector('#description');
  const date = document.querySelector('#date');
  return ToDo(description.value, date.value);
};
 
const resetInputs = () => {
  const inputs = document.querySelectorAll('.list-form input');
  inputs.forEach((input) => input.value = '');
};

const setFormBtn = (project) => {
  const form = document.querySelector('.list-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.querySelector('#description');
    if (description.value === '') return;
    project.list.push(createToDo());
    resetInputs();
    updateList(project.list);
  });
};

const setProject = (project) => {
  const heading = document.querySelector('h1');
  heading.textContent = project.name;
  setList(project.list);
  setToDoBtns(project.list);
  setFormBtn(project);
}

export default setProject;
