import './normalize.css';
import './style.scss';
import Project from './project';
import { retrieveLocalStorage } from './populateLocalStorage';
import listDOM from './list-dom';
import projectDOM from './project-dom';
import createProject, {createToDo} from './projectLogic';

const ToDo = (description, dueDate, priority = 'normal', complete = false) => ({
  description,
  dueDate,
  priority,
  complete,
}); 

// Default project
const home = Project('Home');

const projects = [];

retrieveLocalStorage();

// Set default project
listDOM.displayList(home);
listDOM.setAddToDo(home);
listDOM.setToDoEvents(home);

// Set custom projects
projectDOM.toggleDropdown();
projectDOM.displayProjects();
projectDOM.setHomeEvent();
projectDOM.setProjectEvents();
projectDOM.setRemoveProject();
projectDOM.setAddProject();


export default ToDo;
export { home, projects };
