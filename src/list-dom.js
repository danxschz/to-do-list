import moment from 'moment';
import ToDo from './index';
import localStorageManipulation from './local-storage';

const listDOM = (() => {
  const createToDo = () => {
    const description = document.querySelector('#description');
    const date = document.querySelector('#due-date');
    return ToDo(description.value, date.value);
  };

  const resetInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  };

  const displayList = (project) => {
    const heading = document.querySelector('main h1');
    heading.textContent = project.name;

    const list = document.querySelector('.list');
    let i = 0;
    for (const item of project.list) {
      const toDo = document.createElement('div');
      toDo.classList.add('to-do');
      toDo.setAttribute('data-index', i++);

      const checkboxDiv = document.createElement('div');
      checkboxDiv.classList.add('to-do__checkbox');

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      if (item.complete === true) {
        checkbox.checked = true;
        toDo.classList.add('complete');
      }
      checkboxDiv.appendChild(checkbox);
      toDo.appendChild(checkboxDiv);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('to-do__content');

      if (item.priority === 'important') {
        checkboxDiv.classList.add('important');
        contentDiv.classList.add('important');
      }

      const description = document.createElement('div');
      description.classList.add('to-do__description');
      description.textContent = item.description;
      contentDiv.appendChild(description);

      const date = document.createElement('div');
      date.classList.add('to-do__date');
      if (!(item.dueDate === '')) {
        date.textContent = moment(item.dueDate).calendar({
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY',
        });
      }
      contentDiv.appendChild(date);

      const icons = document.createElement('div');
      icons.classList.add('icons');

      const priorityIcon = document.createElement('i');
      priorityIcon.setAttribute('class', 'fa-solid fa-triangle-exclamation');
      priorityIcon.setAttribute('title', 'Change priority');
      icons.appendChild(priorityIcon);

      const deleteIcon = document.createElement('i');
      deleteIcon.setAttribute('class', 'fa-solid fa-trash');
      deleteIcon.setAttribute('title', 'Delete to do');
      icons.appendChild(deleteIcon);

      contentDiv.appendChild(icons);
      toDo.appendChild(contentDiv);
      list.appendChild(toDo);
    }
  };

  const clearDisplay = () => {
    const listItems = document.querySelectorAll('.to-do');
    listItems.forEach((item) => {
      item.remove();
    });
  };

  const updateList = (project) => {
    clearDisplay();
    displayList(project);
    setToDoEvents(project);
    localStorageManipulation.handlePopulation();
  };

  const setAddToDo = (project) => {
    const addToDoBtn = document.querySelector('.to-do-form__btn');
    addToDoBtn.addEventListener('click', () => {
      const description = document.querySelector('#description');
      if (description.value === '') return;
      project.appendToDo(createToDo());
      resetInputs();
      updateList(project);
    });
  };

  const setToDoEvents = (project) => {
    const listItems = document.querySelectorAll('.to-do');
    listItems.forEach((item) => {
      const i = item.getAttribute('data-index');

      const checkbox = item.querySelector('.to-do__checkbox input');
      checkbox.addEventListener('click', () => {
        project.changeCompleteStatus(i);
        updateList(project);
      });

      const deleteIcon = item.querySelector('.fa-trash');
      deleteIcon.addEventListener('click', () => {
        project.removeToDo(i);
        updateList(project);
      });

      const priorityIcon = item.querySelector('.fa-triangle-exclamation');
      priorityIcon.addEventListener('click', () => {
        project.changePriority(i);
        updateList(project);
      });
    });
  };

  return {
    displayList, clearDisplay, resetInputs, setAddToDo, setToDoEvents,
  };
})();

export default listDOM;
