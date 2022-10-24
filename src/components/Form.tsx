import React from 'react'

type FormProps = {
	formProps: {
		message: string
		setMessage: React.Dispatch<React.SetStateAction<string>>
		handleCreate: React.MouseEventHandler<HTMLButtonElement>
		error: boolean
	}
}

const Form = ({ formProps }: FormProps) => {
	const { message, setMessage, handleCreate, error } = formProps

	return (
		<div id='windowTask'>
			<input
				style={{
					border: error ? '1.5px solid #db2b2b' : '1.5px solid #2b69db',
				}}
				onChange={(e) => setMessage(e.target.value)}
				type='text'
				placeholder={error ? 'Please, write a task...' : 'My task'}
				id='windowInput'
				value={message}
			/>
			<button onClick={handleCreate} id='windowButton'>
				Add
			</button>
		</div>
	)
}
export default Form
