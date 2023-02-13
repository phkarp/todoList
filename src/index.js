import { Component } from 'react';
import { createRoot } from 'react-dom/client';

import Footer from './components/footer/footer';
import TaskList from './components/task-list/task-list';
import NewTaskForm from './components/new-task-form/new-task-form';

import './index.css';

class App extends Component {
  constructor(prop) {
    super(prop);

    this.maxId = 4;

    this.state = {
      todoData: [
        {
          description: 'Completed task',
          created: Date.now(),
          id: 'task1',
          className: 'completed',
          done: true,
        },
        {
          description: 'Editing task',
          created: Date.now(),
          id: 'task2',
          className: 'editing',
          done: false,
        },
        {
          description: 'Active task',
          created: Date.now(),
          id: 'task3',
          className: 'active',
          done: false,
        },
      ],
      filterBtn: 'All',
    };

    this.onClearCompleted = () => {
      this.setState(({ todoData }) => {
        const arr = todoData.filter(el => el.className !== 'completed');

        return { todoData: arr };
      });
    };

    this.deleteTask = id => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        return {
          todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
        };
      });
    };

    this.onChangeClass = id => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        const newItem = {
          ...todoData[idx],
          className: todoData[idx].done ? 'active' : 'completed',
          done: !todoData[idx].done,
        };

        const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return { todoData: result };
      });
    };

    this.onItemAdded = value => {
      this.setState(({ todoData }) => {
        const arr = todoData.slice();
        arr.push({
          description: value,
          created: Date.now(),
          id: `task${this.maxId++}`,
          className: 'active',
          done: false,
        });
        return { todoData: arr };
      });
    };

    this.onFilter = e => {
      this.setState({ filterBtn: e.target.textContent });
    };
  }

  render() {
    const { todoData } = this.state;
    const activeCount = todoData.filter(el => !el.done).length;

    let filterData = todoData;
    if (this.state.filterBtn === 'Active') {
      filterData = this.state.todoData.filter(el => el.className !== 'completed');
    }
    if (this.state.filterBtn === 'Completed') {
      filterData = this.state.todoData.filter(el => el.className === 'completed');
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.onItemAdded} />
        </header>
        <section className="main">
          <TaskList todos={filterData} onDeleted={this.deleteTask} onChangeClass={this.onChangeClass} />
          <Footer activeCount={activeCount} onClearCompleted={this.onClearCompleted} onFilter={this.onFilter} />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
