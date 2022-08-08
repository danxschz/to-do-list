import generateElement from 'generate-element';
import { Project } from './ToDo';
import setProject from './setProject';

const removeSelectedStyle = () => {
  const navItems = document.querySelectorAll('ul li');
  navItems.forEach((item) => {
    item.classList.remove('li_active');
  });
};

const setSelectedStyle = (e) => {
  removeSelectedStyle();
  e.currentTarget.classList.add('li_active');
}

const setDropdown = () => {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  dropdownBtn.addEventListener('click', () => {
    dropdownBtn.classList.toggle('dropdown-btn_active');
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  });
};

const setProjects = (projects) => {
  const dropdown = document.querySelector('.dropdown');
  const form = document.querySelector('.project-form');

  projects.forEach((project, i) => {
    if (project.name === 'Home') return;

    const listItem = generateElement('li', 'sidebar__li project', false, { 'data-index': i });
    const leftSection = generateElement('div', 'project__left');
    const folderIcon = generateElement('i', 'fa-solid fa-folder')
    leftSection.appendChild(folderIcon);

    const projectName = generateElement('div', false, project.name)
    leftSection.appendChild(projectName);
    listItem.appendChild(leftSection);

    const deleteIcon = generateElement('i', 'fa-solid fa-xmark', false, { onclick: 'event.stopPropagation();' });
    listItem.appendChild(deleteIcon);

    dropdown.insertBefore(listItem, form);
  })
};

const clearProjects = () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach((project) => project.remove());
};

const setProjectBtns = (projects) => {
  const sidebarProjects = document.querySelectorAll('.project');
  sidebarProjects.forEach((project) => {
    project.addEventListener('click', (e) => {
      const i = project.getAttribute('data-index');
      setSelectedStyle(e);
      setProject(projects[i], projects);
    });
  });
};

const setRemoveProject = (projects) => {
  const sidebarProjects = document.querySelectorAll('.project');
  sidebarProjects.forEach((project) => {
    const i = project.getAttribute('data-index');
    const deleteIcon = project.querySelector('.fa-xmark');
    deleteIcon.addEventListener('dblclick', () => {
      localStorage.removeItem(projects[i].name);
      projects.splice(i, 1);
      updateProjects(projects);
      setProject(projects[0], projects);
    });
  });
};

const updateProjects = (projects) => {
  clearProjects();
  setProjects(projects);
  setProjectBtns(projects);
  setRemoveProject(projects);
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
    removeSelectedStyle();
    const newProject = document.querySelector('.project-form').previousElementSibling;
    newProject.classList.add('li_active');
    setProject(projects[projects.length - 1], projects);
    // populateLocalStorage(projects);
  });
};

const setHomeBtn = (projects) => {
  const home = document.querySelector('.home');
  home.addEventListener('click', (e) => {
    setSelectedStyle(e);
    setProject(projects[0], projects);
  });
};

const setSidebar = (projects) => {
  setHomeBtn(projects);
  setDropdown();
  setProjects(projects);
  setProjectBtns(projects);
  setProjectForm(projects);
}

export default setSidebar;
