import React, { useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  // tasks
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);


  async function updatePage() {
    const osef = await getTasks()
      setTasks(osef)
      return setTasks
  }
  //async function blabla () {
  // const jesais pas quoi = await getTasks()
  // setTask(jesais pas quoi)
  //}

  //
  // get à l'ouverture
  // post, delete > modifier l'etat local :
  // post : > push pour maj local et put sur l'api
  // edit : idem
  // delete : idem
  //

  useEffect(() => {
    updatePage();
    //updatePage();
  }, []);

  const getTasks = () => {
    //getTasks
    return axios
      .get('http://localhost:3003/tasks')
      .then((res) => res.data);
    //.then((res) => res.data); >>> data à stocker sur cette page
  };

  const addTask = (data) => {
    const post = async (data) => {
      return   axios.post('http://localhost:3003/tasks', {
        content: data,
        date: Date.now(),
      })
    }
    // const addTask (data) => {} >>>> declarer data avant
    // const post = async (data) => {
    //   return axios.post('http://localhost:3003/tasks', {
    //     content: data,
    //     date: Date.now(),
    //   });
    // }
    // content: data


//Ancienne fonctionPOST
  //   return axios.post('http://localhost:3003/tasks', {
  //     content: content,
  //     date: Date.now(),
  //   });
  // };




  
  // Ancienne fonction handlesummit 
  // const handleSubmit = (e) => {
    // handleNewTask = (e)
    // e.preventDefault();
    //if !content
    // if (content.length < 1) {
    //   setError(true);
    //   return;
    // } else {
      //pas de else
      // postData().then(() => {
        //await addTask(content).then(() =>{
        // setError(false);
        // setContent('');
        // getData();
        //then(()) => {
        //await blabla()
  //     });
  //   }
  // };

const handleNewTask = (e) => {
  e.prenventDefault();
  if (content.length < 1) {
    //!content
    setError(true);
    return;
  } else {
    await addTask(content)
    .then(() => {
      setError(false);
      setContent('');
    })
    .then(()=> {
      await updatePage()
    })
  }

}




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
        <button onClick={(e) => handleSubmit(e)} id='windowButton'>
          Add
        </button>
      </div>
      <div>
        {Tasks
          .sort((a, b) => b.date - a.date)
          .map((task) => (
            <Task key={task.id} task={task} tasks={tasks} />
          ))}
      </div>
    </div>
  );
};
export default TodoList;
