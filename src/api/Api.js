import axios from 'axios';

export default {
  get: () => {
    return axios.get('http://localhost:3003/tasks').then((res) => res.data);
  },
  add: (data) => {
    return axios.post('http://localhost:3003/tasks', data);
  },
  delete: (id) => {
    return axios.delete('http://localhost:3003/tasks/' + id);
  },
  put: (id, data) => {
    return axios.put('http://localhost:3003/tasks/' + id, data);
  },
};
