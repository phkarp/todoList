import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  render() {
    const { id, description, created, onDeleted, onChangeClass, done } = this.props;

    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" defaultChecked={done} onClick={onChangeClass} />
        <label htmlFor={id}>
          <span className="description">{description}</span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

Task.defaultProps = {
  onChangeClass: () => {},
  onDeleted: () => {},
  done: false,
  created: Date.now(),
  description: '',
};

Task.propTypes = {
  onChangeClass: PropTypes.func,
  onDeleted: PropTypes.func,
  done: PropTypes.bool,
  id: PropTypes.string.isRequired,
  created: PropTypes.number,
  description: PropTypes.string,
};
