import './styles/sidebar.scss';
import generateElement from 'generate-element';
import setProject from './setProject';
import { Project } from './ToDo';
import setLocalStorage from './setLocalStorage';

const removeSelectedStyle = () => {
  const navItems = document.querySelectorAll('nav li');
  navItems.forEach((item) => {
    item.classList.remove('selected');
  });
};

const setSelectedStyle = (e) => {
  removeSelectedStyle();
  e.currentTarget.classList.add('selected');
}

const setHomeBtn = (projects) => {
  const home = document.querySelector('.home');
  home.addEventListener('click', (e) => {
    setSelectedStyle(e);
    setProject(projects[0]);
  });

  home.addEventListener('keypress', (e) => {
    if (!(e.key === ' ') && !(e.key === 'Enter')) return;
    setSelectedStyle(e);
    setProject(projects[0]);
  });
};

const setDropdownBtn = () => {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  dropdownBtn.addEventListener('click', () => {
    dropdownBtn.classList.toggle('selected-btn');
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  });
};

const displayProjects = (projects) => {
  const dropdown = document.querySelector('.dropdown');
  const form = document.querySelector('.project-form');

  projects.forEach((project, i) => {
    if (project.name === 'Home') return;

    const listItem = generateElement('li', 'nav-item project', false, { 'data-index': i, tabindex: 0 });
    const nameDiv = generateElement('div');
    const folderIcon = generateElement('i', 'fa-solid fa-folder')
    nameDiv.appendChild(folderIcon);

    const name = generateElement('div', false, project.name)
    nameDiv.appendChild(name);
    listItem.appendChild(nameDiv);

    const deleteBtn = generateElement('button', false, false, { 'aria-label': 'Remove project' });
    const deleteIcon = generateElement('i', 'fa-solid fa-xmark');
    deleteBtn.appendChild(deleteIcon)
    listItem.appendChild(deleteBtn);

    dropdown.insertBefore(listItem, form);
  })
};

const setProjectBtns = (projects) => {
  const projectBtns = document.querySelectorAll('.project');
  projectBtns.forEach((btn) => {
    const i = btn.getAttribute('data-index');
    const deleteButton = btn.querySelector('button');

    btn.addEventListener('click', (e) => {
      setSelectedStyle(e);
      setProject(projects[i]);
    });

    btn.addEventListener('keypress', (e) => {
      if (!(e.key === ' ') && !(e.key === 'Enter')) return;
      setSelectedStyle(e);
      setProject(projects[i]);
    });

    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.removeItem(projects[i].name);
      projects.splice(i, 1);
      updateProjects(projects);
      setProject(projects[0]);
    });
  });
};

const clearProjects = () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach((project) => project.remove());
};

const updateProjects = (projects) => {
  clearProjects();
  displayProjects(projects);
  setProjectBtns(projects);
};

const setProjectForm = (projects) => {
  const input = document.querySelector('#name');
  const form = document.querySelector('.project-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === '') return;

    const name = (input <= 30) ? input.value : input.value.slice(0, 30);
    input.value = '';
    const newProject = Project(name);
    projects.push(newProject);
    setLocalStorage(newProject);
    updateProjects(projects);
    const newProjectBtn = document.querySelector('.project-form').previousElementSibling;
    newProjectBtn.click();
  });
};

const setMobileNav = () => {
  const navBtn = document.querySelector('#nav-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  navBtn.addEventListener('click', () => {
    sidebar.style.width = '75%';
    overlay.style.height = 'auto';
    overlay.style.opacity = 0.7;
  });

  overlay.addEventListener('click', () => {
    sidebar.removeAttribute('style');
    overlay.style.opacity = 0;
    setTimeout(() => {overlay.style.height = 0}, 500);
  });

  screen.orientation.addEventListener('change', () => {
    sidebar.removeAttribute('style');
    overlay.removeAttribute('style');
  });
}

const setSidebar = (projects) => {
  setHomeBtn(projects);
  setDropdownBtn();
  updateProjects(projects);
  setProjectForm(projects);
  setMobileNav();
}

export default setSidebar;
