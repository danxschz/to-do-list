const Project = (name) => {
  const list = [];

  const appendToDo = (toDo) => {
    list.push(toDo);
  };

  const removeToDo = (i) => {
    list.splice(i, 1);
  };

  const changeCompleteStatus = (i) => {
    if (list[i].complete === true) {
      list[i].complete = false;
    } else {
      list[i].complete = true;
    }
  };

  const changePriority = (i) => {
    if (list[i].priority === "normal") {
      list[i].priority = "important";
    } else {
      list[i].priority = "normal";
    }
  };

  return {
    name,
    list,
    appendToDo,
    removeToDo,
    changeCompleteStatus,
    changePriority,
  };
};

export default Project;
