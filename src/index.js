import { Component } from 'react';
import { createRoot } from 'react-dom/client';

import Footer from './components/footer/footer';
import TaskList from './components/task-list/task-list';
import NewTaskForm from './components/new-task-form/new-task-form';

import './index.css';

class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      todoData: [
        {
          description: 'Completed task',
          created: 'created 17 seconds ago',
          id: 'task1',
          className: 'completed',
          done: true,
        },
        {
          description: 'Editing task',
          created: 'created 5 minutes ago',
          id: 'task2',
          className: 'editing',
          done: false,
        },
        {
          description: 'Active task',
          created: 'created 5 minutes ago',
          id: 'task3',
          className: 'active',
          done: false,
        },
      ],
    };

    this.deleteTask = id => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        return {
          todoData: newArr,
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
  }

  render() {
    const { todoData } = this.state;
    const activeCount = todoData.filter(el => !el.done).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={todoData} onDeleted={this.deleteTask} onChangeClass={this.onChangeClass} />
          <Footer activeCount={activeCount} />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
