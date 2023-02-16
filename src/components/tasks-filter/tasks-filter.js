import { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = e => {
      props.onFilter(e);
    };
  }
  render() {
    console.log(this.props.checkedRadio);
    return (
      <ul className="filters">
        <label>
          <input
            type="radio"
            name="filter"
            onClick={this.filter}
            value="All"
            defaultChecked={this.props.checkedRadio.all}
          />
          All
        </label>
        <label>
          <input type="radio" name="filter" onClick={this.filter} value="Active" />
          Active
        </label>
        <label>
          <input type="radio" name="filter" onClick={this.filter} value="Completed" />
          Completed
        </label>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  classBtn: { all: 'true', active: 'false', completed: 'false' },
  onFilter: () => {},
};

TasksFilter.propsTypes = {
  classBtn: PropTypes.object,
  onFilter: PropTypes.func,
};
