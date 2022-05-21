import './normalize.css';
import './style.scss';
import Project from './project.js';
import domManipulation from './dom.js';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

// Default project
const home = Project('Home');
let test1 = ToDo('Walk the dog', '2022-05-16', 'normal');
let test2 = ToDo('Save the world', '2022-05-21', 'important');
let test3 = ToDo('Work out', '2022-05-20', 'normal');
home.appendToDo(test1);
home.appendToDo(test2);
home.appendToDo(test3);
domManipulation.displayList(home);
domManipulation.setAddToDo(home);
domManipulation.setToDoEvents(home);

// Multiple projects
const testproject = Project('Test');
const testproject2 = Project('Test2');
let projects = [testproject, testproject2];

const displayProjects = () => {
  let dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  for (let project of projects) {
    let listItem = document.createElement('li');

    let icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-folder');
    listItem.appendChild(icon);

    let projectName = document.createElement('div');
    projectName.textContent = project.name;
    listItem.appendChild(projectName);

    dropdown.appendChild(listItem);
  }

  let sidebarList = document.querySelector('.sidebar ul');
  sidebarList.appendChild(dropdown);
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

displayProjects();
toggleDropdown();

export default ToDo;
