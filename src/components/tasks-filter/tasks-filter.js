import { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: '',
    };

    this.filter = e => {
      props.onFilter(e);
    };
  }
  render() {
    const { classBtn } = this.props;
    return (
      <ul className="filters">
        <li>
          <button className={classBtn.all} onClick={this.filter}>
            All
          </button>
        </li>
        <li>
          <button className={classBtn.active} onClick={this.filter}>
            Active
          </button>
        </li>
        <li>
          <button className={classBtn.completed} onClick={this.filter}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
