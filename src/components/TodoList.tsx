import React, { useEffect, useState } from 'react'
import Task from './Task'
import Api from '../api/Api'
import { AxiosResponse } from 'axios'
import Form from './Form'

export type Data = {
	message: string
	date: number
}

export type Todo = {
	message: string
	date: Date
	id: number
}

type List = {
	list: Array<Todo>
}

const TodoList = () => {
	const [todoList, setTodoList] = useState<List['list']>([])
	const [message, setMessage] = useState<string>('')
	const [error, setError] = useState<boolean>(false)
	const title = 'My todo List'

	const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!message) {
			return setError(true)
		}
		const data: Data = {
			message: message,
			date: Date.now(),
		}

		await Api.add(data).then((response: AxiosResponse) => {
			const newTodo: Todo = response.data
			setError(false)
			setMessage('')
			setTodoList((todoList) => [...todoList, newTodo])
		})
	}

	const fetchList = async () => {
		const list: List['list'] = await Api.get()
		return setTodoList(list)
	}

	const filterList = async (task: Todo) => {
		const newList: List['list'] = todoList.filter((todo) => todo.id !== task.id)
		setTodoList(newList)
	}

	const formProps = {
		message,
		setMessage,
		handleCreate,
		error,
	}

	useEffect(() => {
		fetchList()
	}, [])

	return (
		<div id='app'>
			<h2 id='title'>{title}</h2>
			<Form formProps={formProps} />
			{todoList.length > 0 &&
				todoList
					.sort(
						(a, b) => parseInt(b.date.toString()) - parseInt(a.date.toString())
					)
					.map((task) => {
						const taskProps = {
							filterList,
							task,
						}
						return <Task key={task.id} taskProps={taskProps} />
					})}
		</div>
	)
}
export default TodoList
