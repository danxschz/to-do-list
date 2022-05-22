import './normalize.css';
import './style.scss';
import Project from './project.js';
import listDOM from './list-dom.js';
import localStorageManipulation from './local-storage';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

const projects = [];

// Home
const home = Project('Home');

localStorageManipulation.retrieve();

listDOM.displayList(home);
listDOM.setAddToDo(home);
listDOM.setToDoEvents(home);

// Custom projects
const displayProjects = () => {
  let dropdown = document.querySelector('.dropdown');

  let form = document.querySelector('.project-form');
  let i = 0;
  for (let project of projects) {
    let listItem = document.createElement('li');
    listItem.classList.add('sidebar__li');
    listItem.classList.add('project');
    listItem.setAttribute('data-index', i++);

    let icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-folder');
    listItem.appendChild(icon);

    let projectName = document.createElement('div');
    projectName.textContent = project.name;
    listItem.appendChild(projectName);

    //dropdown.appendChild(listItem);
    dropdown.insertBefore(listItem, form);
  }

  let sidebarList = document.querySelector('.sidebar ul');
  sidebarList.appendChild(dropdown);
}

const removeActiveClass = () => {
  let listItems = document.querySelectorAll('ul li');
  listItems.forEach(item => {
    item.classList.remove('li_active');
  });
}

const toggleDropdown = () => {
  let dropdownBtn = document.querySelector('.dropdown-btn');

  dropdownBtn.addEventListener('click', () => {
    dropdownBtn.classList.toggle('dropdown-btn_active');
    let dropdownContent = document.querySelector('.dropdown');
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });
}

const setProjectEvents = () => {
  let sidebarProjects = document.querySelectorAll('.project');
  sidebarProjects.forEach(project => {
    project.addEventListener('click', () => {
      removeActiveClass();
      project.classList.add('li_active');
      listDOM.clearDisplay();
      listDOM.displayList(projects[project.getAttribute('data-index')]);
      let addToDoButton = document.querySelector('.to-do-form__button');
      let addToDoButtonNew = addToDoButton.cloneNode(true);
      addToDoButton.parentNode.replaceChild(addToDoButtonNew, addToDoButton);
      listDOM.setAddToDo(projects[project.getAttribute('data-index')]);
      listDOM.setToDoEvents(projects[project.getAttribute('data-index')]);
    });
  });
}

const setHomeEvent = () => {
  let homeLi = document.querySelector('.home');
  homeLi.addEventListener('click', () => {
    removeActiveClass();
    homeLi.classList.add('li_active');
    listDOM.clearDisplay();
    listDOM.displayList(home);
    let addToDoButton = document.querySelector('.to-do-form__button');
    let addToDoButtonNew = addToDoButton.cloneNode(true);
    addToDoButton.parentNode.replaceChild(addToDoButtonNew, addToDoButton);
    listDOM.setAddToDo(home);
    listDOM.setToDoEvents(home);
  });
}

const clearProjects = () => {
  let projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.remove();
  })
}

let projectForm = document.querySelector('#name');
let projectSubmit = document.querySelector('.sidebar__li .fa-plus');
projectSubmit.addEventListener('click', () => {
  let projectName = projectForm.value;
  if (projectName.length > 30) {
    projectName = projectName.slice(0, 30);
  }
  projects.push(Project(projectName));
  listDOM.resetInputs();
  clearProjects();
  displayProjects();
  setProjectEvents();
});


displayProjects();
toggleDropdown();
setHomeEvent();
setProjectEvents();

export default ToDo;
export {projects, home};
