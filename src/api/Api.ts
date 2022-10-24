import axios from 'axios'
import { TodoPreview } from '../components/TodoList'

class Api {
	async get() {
		return axios.get('http://localhost:3003/tasks').then((res) => res.data)
	}

	add(data: TodoPreview) {
		return axios.post('http://localhost:3003/tasks', data)
	}

	delete(id: number) {
		return axios.delete('http://localhost:3003/tasks/' + id)
	}

	put(id: number, data: TodoPreview) {
		return axios.put('http://localhost:3003/tasks/' + id, data)
	}
}

export default new Api()
