import { Component } from 'react';

import Task from '../task/task';
import './task-list.css';

class TaskList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      active: true,
    };
  }

  render() {
    const { todos, onDeleted } = this.props;

    const tasks = todos.map(item => {
      const { ...itemProps } = item;

      return (
        <Task
          key={itemProps.id}
          {...itemProps}
          onDeleted={() => {
            onDeleted(itemProps.id);
          }}
        />
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

export default TaskList;
