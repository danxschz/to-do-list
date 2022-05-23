import './normalize.css';
import './style.scss';
import Project from './project.js';
import localStorageManipulation from './local-storage';
import listDOM from './list-dom.js';
import projectDOM from './project-dom.js';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => {
  return {description, dueDate, priority, complete};
}

// Default project
const home = Project('Home');

const projects = [];

localStorageManipulation.retrieve();

// Set default project
listDOM.displayList(home);
listDOM.setAddToDo(home);
listDOM.setToDoEvents(home);

// Set custom projects
projectDOM.toggleDropdown();
projectDOM.displayProjects();
projectDOM.setHomeEvent();
projectDOM.setProjectEvents();
projectDOM.setAddProject();

export default ToDo;
export {home, projects};
