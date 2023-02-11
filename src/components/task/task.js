import { Component } from 'react';

import './task.css';

class Task extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      className: this.props.className,
      active: prop.className === 'active',
    };
    this.onChangeState = () => {
      if (this.state.active) {
        this.className = 'completed';
      } else this.className = 'active';

      this.setState(state => (state.active = !state.active));
    };
    this.className = this.props.className;
  }

  render() {
    const { id, description, created, onDeleted } = this.props;

    let inputEditing = null;

    if (this.className === 'editing') {
      inputEditing = <input type="text" className="edit" defaultValue="Editing task" />;
    }

    return (
      <li className={this.className} key={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" />
          <label htmlFor={id} onClick={this.onChangeState}>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {inputEditing}
      </li>
    );
  }
}

export default Task;

// import { Component } from 'react';
//
// import './task.css';
//
// class Task extends Component {
//   render() {
//     const { id, description, created, onDeleted, onChangeState } = this.props;
//     return (
//       <div className="view">
//         <input id={id} className="toggle" type="checkbox" />
//         <label htmlFor={id} onClick={onChangeState}>
//           <span className="description">{description}</span>
//           <span className="created">{created}</span>
//         </label>
//         <button className="icon icon-edit"></button>
//         <button className="icon icon-destroy" onClick={onDeleted}></button>
//       </div>
//     );
//   }
// }
//
// export default Task;

/*<li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Completed task</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
      <li className="editing">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Editing task</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" value="Editing task" />
      </li>
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Active task</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>*/
