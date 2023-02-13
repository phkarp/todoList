import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onCompleted, onEdit } = this.props;

    const tasks = todos.map(item => {
      const { className, id } = item;

      return (
        <li className={className} key={id}>
          <Task
            {...item}
            onDeleted={() => {
              onDeleted(id);
            }}
            onCompleted={() => onCompleted(id)}
            onEdit={() => onEdit(id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

TaskList.defaultProps = {
  onCompleted: () => {},
  onDeleted: () => {},
  onEdit: () => {},
  onUpdateDescription: () => {},
};

TaskList.propTypes = {
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onUpdateDescription: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
