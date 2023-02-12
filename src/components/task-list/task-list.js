import { Component } from 'react';

import Task from '../task/task';
import './task-list.css';

class TaskList extends Component {
  render() {
    const { todos, onDeleted, onChangeClass } = this.props;

    const tasks = todos.map(item => {
      let inputEditing = null;

      if (item.className === 'editing') {
        inputEditing = <input type="text" className="edit" defaultValue="Editing task" />;
      }

      return (
        <li className={item.className} key={item.id}>
          <Task
            {...item}
            onDeleted={() => {
              onDeleted(item.id);
            }}
            onChangeClass={() => onChangeClass(item.id)}
          />
          {inputEditing}
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

export default TaskList;
