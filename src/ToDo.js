const ToDo = (description, date, priority = false, status = false) => (
  {
    description,
    date,
    priority,
    status,
  }
);

const Project = (name) => (
  {
    name,
    list: [],
  }
);

export default ToDo;
export { Project };
