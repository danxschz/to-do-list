import './normalize.css';
import './style.scss';
import Project from './project.js';
import localStorageManipulation from './local-storage';
import listDOM from './list-dom.js';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

// Default project
const home = Project('Home');

const projects = [];

localStorageManipulation.retrieve();

listDOM.displayList(home);
listDOM.setAddToDo(home);
listDOM.setToDoEvents(home);

// Custom projects
const projectDOM = (() => {
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
      let dropdown = document.querySelector('.dropdown');
      if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
      } else {
        dropdown.style.display = 'block';
      }
    });
  }

  const displayProjects = () => {
    let dropdown = document.querySelector('.dropdown');
    let form = document.querySelector('.project-form');

    let i = 0;
    for (let project of projects) {
      let listItem = document.createElement('li');
      listItem.setAttribute('class', 'sidebar__li project');
      listItem.setAttribute('data-index', i++);

      let icon = document.createElement('i');
      icon.setAttribute('class', 'fa-solid fa-folder');
      listItem.appendChild(icon);

      let projectName = document.createElement('div');
      projectName.textContent = project.name;
      listItem.appendChild(projectName);

      dropdown.insertBefore(listItem, form);
    }
  }

  const clearProjects = () => {
    let projects = document.querySelectorAll('.project');
    projects.forEach(project => {
      project.remove();
    })
  }

  // Used to reset event listener
  const replaceAddToDoBtn = () => {
    let addToDoBtn = document.querySelector('.to-do-form__btn');
    let addToDoBtnNew = addToDoBtn.cloneNode(true);
    addToDoBtn.parentNode.replaceChild(addToDoBtnNew, addToDoBtn);
  }

  const switchProject = (project) => {
    listDOM.clearDisplay();
    listDOM.displayList(project);
    replaceAddToDoBtn();
    listDOM.setAddToDo(project);
    listDOM.setToDoEvents(project);
  }

  const setHomeEvent = () => {
    let homeLi = document.querySelector('.home');
    homeLi.addEventListener('click', () => {
      removeActiveClass();
      homeLi.classList.add('li_active');
      switchProject(home);
    });
  }

  const setProjectEvents = () => {
    let sidebarProjects = document.querySelectorAll('.project');
    sidebarProjects.forEach(project => {
      project.addEventListener('click', () => {
        removeActiveClass();
        project.classList.add('li_active');
        let i = project.getAttribute('data-index');
        switchProject(projects[i]);
      });
    });
  }

  const resetProjectDisplay = () => {
    clearProjects();
    displayProjects();
    setProjectEvents();
  }

  const setAddProject = () => {
    let projectInput = document.querySelector('#name');
    let addProjectBtn = document.querySelector('.project-form__btn');
    addProjectBtn.addEventListener('click', () => {
      if (projectInput.value === '') return;

      let projectName = projectInput.value;
      if (projectName.length > 30) {
        projectName = projectName.slice(0, 30);
      }

      listDOM.resetInputs();
      projects.push(Project(projectName));
      resetProjectDisplay();

      removeActiveClass();
      let newProject = document.querySelector('.project-form').previousElementSibling;
      newProject.classList.add('li_active');

      switchProject(projects[projects.length-1]);
      localStorageManipulation.handlePopulation();
    });
  }

  return {toggleDropdown, displayProjects, setHomeEvent, setProjectEvents, setAddProject};
})();

projectDOM.displayProjects();
projectDOM.toggleDropdown();
projectDOM.setHomeEvent();
projectDOM.setProjectEvents();
projectDOM.setAddProject();

export default ToDo;
export {home, projects};
