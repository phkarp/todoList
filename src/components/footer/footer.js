import './footer.css';
import TasksFilter from '../tasks-filter/tasks-filter';

const Footer = props => {
  return (
    <footer className="footer">
      <span className="todo-count"> {props.activeCount} items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
