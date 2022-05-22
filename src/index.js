import './normalize.css';
import './style.scss';
import Project from './project.js';
import domManipulation from './dom.js';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

// Default project
const home = Project('Home');
let test1 = ToDo('Refactor', '2022-05-16', 'normal');
let test2 = ToDo('Save the world', '2022-05-21', 'important');
let test3 = ToDo('New project', '2022-05-20', 'normal');
let test4 = ToDo('local storage api');
home.appendToDo(test2);
home.appendToDo(test1);
home.appendToDo(test3);
home.appendToDo(test4);
domManipulation.displayList(home);
domManipulation.setAddToDo(home);
domManipulation.setToDoEvents(home);

// Multiple projects
const testproject = Project('Test');
const testproject2 = Project('Test 2');
let projects = [testproject, testproject2];

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
      domManipulation.clearDisplay();
      domManipulation.displayList(projects[project.getAttribute('data-index')]);
      let addToDoButton = document.querySelector('.to-do-form__button');
      let addToDoButtonNew = addToDoButton.cloneNode(true);
      addToDoButton.parentNode.replaceChild(addToDoButtonNew, addToDoButton);
      domManipulation.setAddToDo(projects[project.getAttribute('data-index')]);
      domManipulation.setToDoEvents(projects[project.getAttribute('data-index')]);
    });
  });
}

const setHomeEvent = () => {
  let homeLi = document.querySelector('.home');
  homeLi.addEventListener('click', () => {
    removeActiveClass();
    homeLi.classList.add('li_active');
    domManipulation.clearDisplay();
    domManipulation.displayList(home);
    let addToDoButton = document.querySelector('.to-do-form__button');
    let addToDoButtonNew = addToDoButton.cloneNode(true);
    addToDoButton.parentNode.replaceChild(addToDoButtonNew, addToDoButton);
    domManipulation.setAddToDo(home);
    domManipulation.setToDoEvents(home);
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
  domManipulation.resetInputs();
  clearProjects();
  displayProjects();
  setProjectEvents();
});


displayProjects();
toggleDropdown();
setHomeEvent();
setProjectEvents();

export default ToDo;
