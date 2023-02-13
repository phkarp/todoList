import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onChangeClass } = this.props;

    const tasks = todos.map(item => {
      const { className, id } = item;

      return (
        <li className={className} key={id}>
          <Task
            {...item}
            onDeleted={() => {
              onDeleted(id);
            }}
            onChangeClass={() => onChangeClass(id)}
          />
          {className === 'editing' ? <input type="text" className="edit" defaultValue="Editing task" /> : null}
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

TaskList.defaultProps = {
  onChangeClass: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  onChangeClass: PropTypes.func,
  onDeleted: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
