import { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      timerMin: '',
      timerSec: '',
    };

    this.onLabelChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    this.onSubmit = e => {
      e.preventDefault();
      const { task, timerMin, timerSec } = this.state;
      if (Number.isNaN(+timerMin) || Number.isNaN(+timerSec)) return;
      const timer = +timerSec + timerMin * 60;

      if (task.trim() !== '') {
        this.props.onItemAdded(task, timer);
        this.setState({ task: '', timerMin: '', timerSec: '' });
      }
    };
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.task}
          name="task"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus=""
          name="timerMin"
          onChange={this.onLabelChange}
          value={this.state.timerMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus=""
          name="timerSec"
          onChange={this.onLabelChange}
          value={this.state.timerSec}
        />
        <input type="submit" hidden={true} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = { onItemAdded: () => {} };
NewTaskForm.propTypes = { onItemAdded: PropTypes.func };
