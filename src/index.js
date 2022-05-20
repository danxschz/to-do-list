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

export default ToDo;
