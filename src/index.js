import './normalize.css';
import './style.scss';

const toDo = (title, dueDate = null, priority = null, complete = false) => {
  return {title, dueDate, priority, complete};
}

const list = (name) => {
  const content = [];

  const changeCompleteStatus = (index) => {
    if (content[index].complete === true) {
      content[index].complete = false;
    } else {
      content[index].complete = true;
    }
  }

  const appendToDo = (toDo) => {
    content.push(toDo);
  }

  return {name, content, changeCompleteStatus, appendToDo};
}

// Default list
const homeList = list('home');
let test1 = toDo('Clean room', 'tommorrow', 'important');
let test2 = toDo('Learn react', 'friday', 'normal');
let test3 = toDo('Work out', 'sunday', 'low');
homeList.appendToDo(test1);
homeList.appendToDo(test2);
homeList.appendToDo(test3);

const displayList = (list) => {
  let listContainer = document.querySelector('.list');
  for (let item of list.content) {
    let toDo = document.createElement('div');
    toDo.classList.add('to-do');

    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('to-do__checkbox');

    let round = document.createElement('div');
    round.classList.add('round');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    round.appendChild(checkbox);
    
    checkboxContainer.appendChild(round);

    toDo.appendChild(checkboxContainer);

    let informationContainer = document.createElement('div');
    informationContainer.classList.add('to-do__information');

    let title = document.createElement('div');
    title.classList.add('to-do__title');
    title.textContent = item.title;
    informationContainer.appendChild(title);

    toDo.appendChild(informationContainer);

    listContainer.appendChild(toDo);
  }
}

const clearDisplay = () => {
  let listItems = document.querySelectorAll('.list div');
  listItems.forEach(item => {
    item.remove();
  });
}

displayList(homeList);


const buildToDo = () => {
  let title = document.querySelector('#title');
  let dueDate = document.querySelector('#date');
  let priority = document.querySelector('#priority');
  return toDo(title.value, date.value, priority.value);
}

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', () => {
  let title = document.querySelector('#title');
  if (title.value === '') return;
  homeList.appendToDo(buildToDo());
  clearDisplay();
  displayList(homeList);
  console.log(homeList.content);
});

