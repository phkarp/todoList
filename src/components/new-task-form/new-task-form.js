import { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
    };

    this.onLabelChange = e => {
      this.setState({ label: e.target.value });
    };

    this.onSubmit = e => {
      e.preventDefault();
      this.setState({ label: '' });
      this.props.onItemAdded(this.state.label);
    };
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = { onItemAdded: () => {} };
NewTaskForm.propTypes = { onItemAdded: PropTypes.func };
