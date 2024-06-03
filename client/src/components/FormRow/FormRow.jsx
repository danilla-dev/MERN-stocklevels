import styles from './FormRow.module.scss'
const FormRow = ({
	type,
	name,
	labelText,
	required,
	value,
	onKeyDown,
	setFormData,
	setImageUrl,
	otherState,
	otherSetState,
	setError,
	row,
	list,
	disable,
	key,
}) => {
	////////////////////////////////////////////////////////
	const handleInputOnchange = e => {
		const { value, name } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	////////////////////////////////////////////////////////
	const handleFileChange = event => {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = e => {
			const imageDataUrl = e.target.result
			setImageUrl(imageDataUrl)
			setFormData(prevState => ({
				...prevState,
				image: file,
			}))
		}

		reader.readAsDataURL(file)
	}

	const handleOnEnterDown = e => {
		if (e.key === 'Enter') {
			if (!otherState.includes(e.target.value)) {
				otherSetState(prevState => ({
					...prevState,
					[name]: [...prevState[name], e.target.value],
				}))
				setError('')
			} else {
				setError('Store is already checked.')
			}
		}
	}
	return (
		<div className={`form-row ${row && 'row-label'}`} key={key && key}>
			<label htmlFor={name}>{`${labelText || name}:`}</label>
			<input
				type={type}
				id={name}
				name={name}
				required={required}
				value={value}
				onKeyDown={onKeyDown && handleOnEnterDown}
				onChange={type === 'file' ? handleFileChange : handleInputOnchange}
				list={list && list}
				disabled={disable}
			/>
		</div>
	)
}

export default FormRow
