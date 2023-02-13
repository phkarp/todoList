import { Component } from 'react';

import './footer.css';
import TasksFilter from '../tasks-filter/tasks-filter';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      targetBtnClass: {
        all: 'selected',
        active: '',
        completed: '',
      },
    };

    this.filterBtn = e => {
      this.setState(() => {
        const newObj = { all: '', active: '', completed: '' };
        return { targetBtnClass: { ...newObj, [e.target.textContent.toLowerCase()]: 'selected' } };
      });
      props.onFilter(e);
    };
  }

  render() {
    const { activeCount, onClearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count"> {activeCount} items left</span>
        <TasksFilter onFilter={this.filterBtn} classBtn={this.state.targetBtnClass} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
