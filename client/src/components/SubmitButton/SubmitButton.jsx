import style from './SubmitButton.module.scss'
const SubmitButton = ({ text }) => {
	return (
		<button type='submit' className={`${style.button}  btn submit-btn`}>
			{text ? text : 'Submit'}
		</button>
	)
}

export default SubmitButton
