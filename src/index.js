import './styles/normalize.css';
import './styles/index.scss';
import { Project } from './ToDo';
import setProject from './setProject';
import setSidebar from './setSidebar';

const projects = [Project('Home')];
const task = { description: 'hola', date: undefined, priority: false, status: true };
const task2 = { description: 'XD', date: undefined, priority: true, status: false };
const task3 = { description: 'soydanie', date: undefined, priority: false, status: false };
projects[0].list = [task, task2, task3];
setProject(projects[0], projects);

projects.push(Project('Test'));
projects[1].list = [task3];

setSidebar(projects);
