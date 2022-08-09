import './styles/project.scss';
import generateElement from 'generate-element';
import moment from 'moment';
import ToDo from './ToDo';
import setLocalStorage from './setLocalStorage';

const dateFormat = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY',
}

const displayList = (list) => {
  const listDiv = document.querySelector('.list');

  list.forEach((item, i) => {
    const toDo = generateElement('div', 'to-do', false, { 'data-index': i });

    const checkboxDiv = generateElement('div', 'to-do__checkbox');
    const checkboxLabel = generateElement('label', 'visually-hidden', 'To do status', { for: `status-${i}` });
    checkboxDiv.appendChild(checkboxLabel);

    const checkbox = generateElement('input', false, false, { type: 'checkbox', id: `status-${i}` });
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

    const description = generateElement('div', 'to-do__description', item.description, { title: item.description });
    contentDiv.appendChild(description);

    const buttons = generateElement('div', 'to-do__btns');
    const date = generateElement('div');
    if (item.date) {
      date.textContent = moment(item.date).calendar(dateFormat);
      buttons.appendChild(date);
    }

    const priorityBtn = generateElement('button', 'priority-btn', false, { 'aria-label': 'Change priority' });
    const priorityIcon = generateElement('i', 'fa-solid fa-triangle-exclamation');
    priorityBtn.appendChild(priorityIcon);
    buttons.appendChild(priorityBtn);

    const deleteBtn = generateElement('button', 'delete-btn', false, { 'aria-label': 'Delete to do' });
    const deleteIcon = generateElement('i', 'fa-solid fa-trash');
    deleteBtn.appendChild(deleteIcon);
    buttons.appendChild(deleteBtn);

    contentDiv.appendChild(buttons);
    toDo.appendChild(contentDiv);
    listDiv.appendChild(toDo);
  });
}

const clearList = () => {
  const list = document.querySelector('.list');
  list.replaceChildren();
};

const setListBtns = (project) => {
  const { list } = project
  const toDos = document.querySelectorAll('.to-do');
  toDos.forEach((toDo) => {
    const i = toDo.getAttribute('data-index');
    const { status, priority } = list[i];

    const checkbox = toDo.querySelector('.to-do input');
    checkbox.addEventListener('click', () => {
      list[i].status = !status;
      setList(project);
    });

    const priorityBtn = toDo.querySelector('.priority-btn');
    priorityBtn.addEventListener('click', () => {
      list[i].priority = !priority;
      setList(project);
    });

    const deleteBtn = toDo.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      list.splice(i, 1);
      setList(project);
    });
  });
}

const setList = (project) => {
  clearList();
  displayList(project.list);
  setListBtns(project);
  setLocalStorage(project);
};

const createToDo = () => {
  const description = document.querySelector('#description');
  const date = document.querySelector('#date');
  return ToDo(description.value, date.value);
};
 
const resetInputs = () => {
  const inputs = document.querySelectorAll('.list-form input');
  inputs.forEach((input) => { input.value = '' });
};

const clearListForm = () => {
  const form = document.querySelector('.list-form');
  const formClone = form.cloneNode(true);
  form.parentNode.replaceChild(formClone, form);
};

const setListForm = (project) => {
  clearListForm();
  const form = document.querySelector('.list-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.querySelector('#description');
    if (description.value === '') return;
    project.list.push(createToDo());
    resetInputs();
    setList(project);
  });
};

const setProject = (project) => {
  const heading = document.querySelector('h1');
  heading.textContent = project.name;
  setList(project)
  setListForm(project);
  const title = (project.name === 'Home') ? 'To x Do' : `${project.name} - To x Do`;
  document.title = title;
}

export default setProject;
