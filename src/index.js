import { createRoot } from 'react-dom/client';

import Footer from './components/footer/footer';
import TaskList from './components/task-list/task-list';
import NewTaskForm from './components/new-task-form/new-task-form';

import './index.css';

const App = () => {
  const todoData = [
    {
      description: 'Completed task',
      created: 'created 17 seconds ago',
      id: 'l1',
      className: 'completed',
    },
    {
      description: 'Editing task',
      created: 'created 5 minutes ago',
      id: 'l2',
      className: 'editing',
    },
    {
      description: 'Active task',
      created: 'created 5 minutes ago',
      id: 'l3',
      className: 'completed',
    },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};
/*d*/

const root = createRoot(document.getElementById('root'));
root.render(<App />);
