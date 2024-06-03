import styles from './FormSelect.module.scss'
const FormSelect = ({ data, name, value, setFormData, labelText, row, required }) => {
	const handleInputOnchange = e => {
		const { value, name } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<div className={`form-select ${row && 'row-label'}`}>
			<label htmlFor={name}>{labelText}:</label>
			<select onChange={handleInputOnchange} value={value} id={name} name={name} required={required}>
				<option value='' selected disabled>{`--select ${name}--`}</option>
				<option value=''>all</option>
				{data.map((option, index) => {
					return <option key={index}>{option}</option>
				})}
			</select>
		</div>
	)
}

export default FormSelect
