import './styles/normalize.css';
import './styles/index.scss';
import html from './index.html';
import { Project } from './ToDo';
import { getLocalStorage } from './setLocalStorage';
import setProject from './setProject';
import setSidebar from './setSidebar';

const projects = [Project('Home')];
getLocalStorage(projects);
setProject(projects[0]);
setSidebar(projects);
