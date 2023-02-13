import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onCompleted, onEdit, onUpdateDescription } = this.props;

    const tasks = todos.map(item => {
      const { className, id, description } = item;
      let inputEdit = null;
      if (className === 'editing') {
        inputEdit = (
          <input
            type="text"
            className="edit"
            value={description}
            onChange={e => {
              onUpdateDescription(id, e.target.value);
            }}
          />
        );
      }

      const onSubmit = e => {
        e.preventDefault();
        onEdit(id);
      };

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

          <form onSubmit={onSubmit}>{inputEdit}</form>
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
