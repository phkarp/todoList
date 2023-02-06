import Task from '../task/task';
import './task-list.css';

const TaskList = ({ todos }) => {
  const tasks = todos.map(item => {
    const { id, className, ...itemProps } = item;
    let inputEditing = null;

    if (className === 'editing') {
      inputEditing = <input type="text" className="edit" value="Editing task" />;
    }

    return (
      <li key={id} className={className}>
        <Task {...itemProps} />
        {inputEditing}
      </li>
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
