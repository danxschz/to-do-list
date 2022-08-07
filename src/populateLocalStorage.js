 /* eslint-disable */
import { home, projects } from './oldindex';
import Project from './project';

// Detects whether localStorage is both supported and available (from MDN Web Docs)
const isAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

const populateLocalStorage = (projectsxd) => {
  if (!isAvailable('localStorage')) return;

  localStorage.setItem(home.name, JSON.stringify(home.list));
  projectsxd.forEach((project) => {
    localStorage.setItem(project.name, JSON.stringify(project.list));
  });
};

const retrieveLocalStorage = () => {
  if (!isAvailable('localStorage') || !(localStorage.length > 0)) return;

  const homeList = JSON.parse(localStorage.getItem('Home'));
  homeList.forEach((toDo) => home.appendToDo(toDo))
  console.log(localStorage);

  // Retrieve projects
  Object.keys(localStorage).forEach((project) => {
    if (project === 'Home') return;
    const retrievedProject = Project(project);
    const retrievedProjectList = JSON.parse(localStorage.getItem(project));
    retrievedProjectList.forEach((toDo) => retrievedProject.appendToDo(toDo));
    projects.push(retrievedProject);
  });
};

export default populateLocalStorage;
export { retrieveLocalStorage };
