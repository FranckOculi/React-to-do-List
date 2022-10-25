import axios from 'axios'
import { TodoPreview } from '../components/TodoList'

class Api {
	private apiUrl = 'http://localhost:3003/tasks'
	async get() {
		return axios.get(this.apiUrl).then((res) => res.data)
	}

	add(data: TodoPreview) {
		return axios.post(this.apiUrl, data)
	}

	delete(id: number) {
		return axios.delete(this.apiUrl + id)
	}

	put(id: number, data: TodoPreview) {
		return axios.put(this.apiUrl + id, data)
	}
}

export default new Api()
