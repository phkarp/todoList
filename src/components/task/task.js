import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  render() {
    const { id, description, timer, created, onDeleted, onCompleted, done, onEdit, onPlay, onPause } = this.props;

    let timerMin = Math.trunc(timer / 60);
    let timerSec = timer % 60;

    if (timerMin < 10) timerMin = `0${timerMin}`;
    if (+timerSec < 10) timerSec = `0${timerSec}`;

    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" defaultChecked={done} onClick={onCompleted} />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onPlay}></button>
            <button className="icon icon-pause" onClick={onPause}></button>
            <span>{`${timerMin}:${timerSec}`}</span>
          </span>
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
