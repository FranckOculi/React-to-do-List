import React, { useState } from 'react'
import Api from '../api/Api'
import { Todo, Data } from './TodoList'

type TaskProps = {
	taskProps: {
		task: Todo
		filterList: Function
	}
}

const Task = ({ taskProps }: TaskProps) => {
	const { filterList, task } = taskProps
	const [isEditing, setIsEditing] = useState<Boolean>(false)
	const [editedMessage, setEditedMessage] = useState<string>('')

	const handleEdit = async () => {
		if (!editedMessage) return setIsEditing(false)

		const data: Data = {
			message: editedMessage,
			date: parseInt(task.date.toString()),
		}

		const id: number = task.id

		await Api.put(id, data).then(() => {
			setIsEditing(false)
		})
	}

	const handleDelete = async () => {
		const id = task.id
		await Api.delete(id).then(() => filterList(task))
	}

	if (isEditing)
		return (
			<div id='newTask'>
				<textarea
					onChange={(e) => setEditedMessage(e.target.value)}
					autoFocus
					defaultValue={task.message}
					id='task'
				></textarea>
				<div className='taskBtn'>
					<button onClick={handleEdit} id='edit'>
						Valider
					</button>
					<button onClick={handleDelete} id='delete'>
						Delete
					</button>
				</div>
			</div>
		)

	return (
		<div id='newTask'>
			<div id='task'>{task.message}</div>
			<div className='taskBtn'>
				<button onClick={() => setIsEditing(true)} id='edit'>
					Edit
				</button>
				<button onClick={handleDelete} id='delete'>
					Delete
				</button>
			</div>
		</div>
	)
}

export default Task
