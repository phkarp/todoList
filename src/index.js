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
      todoData: [],
      filterBtn: 'All',
    };

    this.onClearCompleted = () => {
      this.setState(({ todoData }) => {
        const arr = todoData.filter(el => el.className !== 'completed');

        return { todoData: arr };
      });
    };

    this.onDeleted = id => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        return {
          todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
        };
      });
    };

    this.onCompleted = id => {
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

    this.onItemAdded = (task, timer) => {
      this.setState(({ todoData }) => {
        const arr = todoData.slice();
        arr.push({
          description: task,
          timer: timer,
          created: Date.now(),
          id: `task${this.maxId++}`,
          className: 'active',
          done: false,
          timerPlay: false,
        });
        return { todoData: arr };
      });
    };

    this.onFilter = e => {
      this.setState({ filterBtn: e.target.value });
    };

    this.onEdit = id => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);
        const elemClassName = todoData[idx].className;

        const newItem = {
          ...todoData[idx],
          className: elemClassName === 'active' ? 'editing' : elemClassName === 'editing' ? 'active' : elemClassName,
        };

        const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return { todoData: result };
      });
    };

    this.onUpdateDescription = (id, task) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        const newItem = {
          ...todoData[idx],
          description: task,
        };

        const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return { todoData: result };
      });
    };

    this.onPlay = id => {
      const idx = this.state.todoData.findIndex(el => el.id === id);
      if (this.state.todoData[idx].timerPlay) {
        return;
      }
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        const newItem = {
          ...todoData[idx],
          timerPlay: true,
          timerId: setInterval(() => {
            this.setState(({ todoData }) => {
              const newItem = {
                ...todoData[idx],
                timer: todoData[idx].timer + 1,
              };

              const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

              return { todoData: result };
            });
          }, 1000),
        };

        const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return { todoData: result };
      });
    };

    this.onPause = id => {
      const todoData = this.state.todoData;
      const idx = todoData.findIndex(el => el.id === id);
      clearInterval(todoData[idx].timerId);
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);

        const newItem = {
          ...todoData[idx],
          timerPlay: false,
        };

        const result = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return { todoData: result };
      });
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
          <TaskList
            todos={filterData}
            onDeleted={this.onDeleted}
            onCompleted={this.onCompleted}
            onEdit={this.onEdit}
            onUpdateDescription={this.onUpdateDescription}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
          <Footer activeCount={activeCount} onClearCompleted={this.onClearCompleted} onFilter={this.onFilter} />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
