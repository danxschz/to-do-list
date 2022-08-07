import './styles/normalize.css';
import './styles/index.scss';
import setProject from './setProject';
import createProject from "./projectLogic";

const projects = [createProject('Home')];
const task = { description: 'hola', date: undefined, priority: false, status: false };
const task2 = { description: 'XD', date: undefined, priority: false, status: false };
projects[0].list = [task, task2];

setProject(projects[0], projects);
