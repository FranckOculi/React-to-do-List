import React, { useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios';

const TodoList = () => {
  const [newsData, setNewsData] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    return axios
      .get('http://localhost:3003/tasks')
      .then((res) => setNewsData(res.data));
  }

  function Post() {
    return axios.post('http://localhost:3003/tasks', {
      content: content,
      date: Date.now(),
    });
  }

  const handleSubmit = (e) => {
    // e.prevent.default();
    if (content.length < 1) {
      setError(true);
    } else {
      Post().then(() => {
        setError(false);
        setContent('');
        Get();
      });
    }
  };

  return (
    <div id='app'>
      <h2 id='title'>My todo List</h2>

      <div id='windowTask'>
        {error ? (
          <input
            style={{
              border: error ? '1.5px solid #db2b2b' : '1.5px solid #2b69db',
            }}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='Please, write a task...'
            id='windowInput'
            value={content}
          />
        ) : (
          <input
            style={{
              border: error ? '1.5px solid #db2b2b' : '1.5px solid #2b69db',
            }}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='My task...'
            id='windowInput'
            value={content}
          />
        )}
        <button onClick={(e) => handleSubmit(e)} id='windowButton'>
          Add
        </button>
      </div>
      <div>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((task) => (
            <Task key={task.id} task={task} Get={Get} />
          ))}
      </div>
    </div>
  );
};
export default TodoList;
