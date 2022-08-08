import './styles/sidebar.scss';
import generateElement from 'generate-element';
import setProject from './setProject';
import { Project } from './ToDo';

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
    setProject(projects[0], projects);
  });

  home.addEventListener('keypress', (e) => {
    if (!(e.key === ' ') && !(e.key === 'Enter')) return;
    setSelectedStyle(e);
    setProject(projects[0], projects);
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
      setProject(projects[i], projects);
    });

    btn.addEventListener('keypress', (e) => {
      if (!(e.key === ' ') && !(e.key === 'Enter')) return;
      setSelectedStyle(e);
      setProject(projects[i], projects);
    });

    deleteButton.addEventListener('click', () => {
      projects.splice(i, 1);
      updateProjects(projects);
      setProject(projects[0], projects);
      localStorage.removeItem(projects[i].name);
    });

    deleteButton.addEventListener('keypress', () => {
      if (!(e.key === ' ') && !(e.key === 'Enter')) return;
      projects.splice(i, 1);
      updateProjects(projects);
      setProject(projects[0], projects);
      localStorage.removeItem(projects[i].name);
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
    projects.push(Project(name));
    updateProjects(projects);
    const newProject = document.querySelector('.project-form').previousElementSibling;
    newProject.click();
    // populateLocalStorage(projects);
  });
};

const setSidebar = (projects) => {
  setHomeBtn(projects);
  setDropdownBtn();
  updateProjects(projects);
  setProjectForm(projects);
}

export default setSidebar;
