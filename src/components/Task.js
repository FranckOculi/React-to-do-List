import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task, Get }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  function Edit() {
    const data = {
      content: editedContent ? editedContent : task.content,
      date: task.date,
    };
    axios.put('http://localhost:3003/tasks/' + task.id, data).then(() => {
      setIsEditing(false);
    });
    return data, setIsEditing;
  }

  function Delete() {
    axios.delete('http://localhost:3003/tasks/' + task.id).then(() => {
      Get();
    });
  }

  return (
    <div id='newTask'>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditedContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : task.content}
          id='task'
        ></textarea>
      ) : (
        <div id='task'>{editedContent ? editedContent : task.content}</div>
      )}

      <div className='taskBtn'>
        {isEditing ? (
          <button onClick={Edit} id='edit'>
            Valider
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} id='edit'>
            Edit
          </button>
        )}
        <button onClick={Delete} id='delete'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
