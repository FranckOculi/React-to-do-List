import React, { useEffect, useState } from 'react';
import Task from './Task';
import Api from '../api/Api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    refreshPage();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!content) {
      setError(true);
      return;
    }
    const data = {
      content: content,
      date: Date.now(),
    };

    await Api.add(data)
      .then(() => {
        setError(false);
        setContent('');
      })
      .then(() => refreshPage());
  };

  const refreshPage = async () => {
    setTasks(await Api.get());
    return setTasks;
  };

  return (
    <div id='app'>
      <h2 id='title'>My todo List</h2>

      <div id='windowTask'>
        <input
          style={{
            border: error ? '1.5px solid #db2b2b' : '1.5px solid #2b69db',
          }}
          onChange={(e) => setContent(e.target.value)}
          type='text'
          placeholder={error ? 'Please, write a task...' : 'My task'}
          id='windowInput'
          value={content}
        />
        <button onClick={handleCreate} id='windowButton'>
          Add
        </button>
      </div>

      <div>
        {tasks
          .sort((a, b) => b.date - a.date)
          .map((task) => (
            <Task key={task.id} refreshPage={refreshPage} task={task} />
          ))}
      </div>
    </div>
  );
}
export default App;
