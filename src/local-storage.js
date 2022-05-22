import Project from './project.js';
import {projects, home} from './index.js';

const localStorageManipulation = (() => {
  // Detects whether localStorage is both supported and available (from MDN Web Docs)
  const checkIfAvailable = type => {
    let storage;
    try {
      storage = window[type];
      let x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }

  const populate = () => {
    localStorage.setItem(home.name, JSON.stringify(home.list));
  
    for (let project of projects) {
      localStorage.setItem(project.name, JSON.stringify(project.list));
    }
  }

  const handlePopulation = () => {
    if (checkIfAvailable('localStorage')) {
      populate();
    }
  }

  const retrieve = () => {
    if (checkIfAvailable('localStorage') && localStorage.length > 0) {
      // Retrieve home
      let homeList = JSON.parse(localStorage.getItem('Home'));
      for (let toDo of homeList) {
        home.appendToDo(toDo);
      }

      // Retrieve projects
      Object.keys(localStorage).forEach(project => {
        if (project === 'Home') return; 
        let retrievedProject = Project(project);
        let retrievedProjectList = JSON.parse(localStorage.getItem(project));
        for (let toDo of retrievedProjectList) {
          retrievedProject.appendToDo(toDo);
        }
        projects.push(retrievedProject);
      });
    }
  }

  return {handlePopulation, retrieve};
})();

export default localStorageManipulation;