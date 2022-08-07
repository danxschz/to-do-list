const ToDo = (description, date, priority = false, status = false) => (
  {
    description,
    date,
    priority,
    status,
  }
);

const createProject = (name) => (
  {
    name,
    list: [],
  }
);

export default createProject;
export { ToDo };
