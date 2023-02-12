import { Component } from 'react';

import Task from '../task/task';
import './task-list.css';

class TaskList extends Component {
  render() {
    const { todos, onDeleted, onChangeClass } = this.props;

    const tasks = todos.map(item => {
      const { className, ...itemProps } = item;
      let inputEditing = null;

      if (className === 'editing') {
        inputEditing = <input type="text" className="edit" defaultValue="Editing task" />;
      }

      return (
        <li className={className} key={itemProps.id}>
          <Task
            {...itemProps}
            onDeleted={() => {
              onDeleted(itemProps.id);
            }}
            onChangeClass={() => onChangeClass(itemProps.id)}
          />
          {inputEditing}
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

export default TaskList;
