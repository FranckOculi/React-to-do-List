import React, { useState } from 'react';
import Api from '../api/Api';

const Task = ({ task, refreshPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const handleEdit = async () => {
    const data = {
      content: editedContent ? editedContent : task.content,
      date: task.date,
    };
    const id = task.id;
    await Api.put(id, data).then(() => {
      setIsEditing(false);
    });
    return { data, setIsEditing };
  };

  const handleDelete = async () => {
    const id = task.id;
    await Api.delete(id).then(() => refreshPage());
  };

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
          <button onClick={handleEdit} id='edit'>
            Valider
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} id='edit'>
            Edit
          </button>
        )}
        <button onClick={handleDelete} id='delete'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
