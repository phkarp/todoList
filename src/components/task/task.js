import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  render() {
    const { id, description, created, onDeleted, onCompleted, done, onEdit } = this.props;

    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" defaultChecked={done} onClick={onCompleted} />
        <label htmlFor={id}>
          <span className="description">{description}</span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

Task.defaultProps = {
  onCompleted: () => {},
  onDeleted: () => {},
  onEdit: () => {},
  done: false,
  created: Date.now(),
  description: '',
};

Task.propTypes = {
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  done: PropTypes.bool,
  id: PropTypes.string.isRequired,
  created: PropTypes.number,
  description: PropTypes.string,
};
