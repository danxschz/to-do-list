import { Project } from "./ToDo";

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

const setLocalStorage = (project) => {
  if (!isAvailable('localStorage')) return;
  localStorage.setItem(project.name, JSON.stringify(project.list));
};

const getLocalStorage = (projects) => {
  if (!isAvailable('localStorage') || !(localStorage.length > 0)) return;

  const homeList = JSON.parse(localStorage.getItem('Home'));
  projects[0].list = homeList;

  Object.keys(localStorage).forEach((key) => {
    if (key === 'Home') return;

    const project = Project(key);
    project.list = JSON.parse(localStorage.getItem(key));
    projects.push(project);
  });
};

export default setLocalStorage;
export { getLocalStorage };
