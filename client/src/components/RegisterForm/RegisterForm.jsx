import { useState } from 'react'
import styles from './RegisterForm.module.scss'
import FormRow from '../FormRow/FormRow'
import Logo from '../Logo/Logo'
import SubmitButton from '../SubmitButton/SubmitButton'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	console.log(formData)

	const { signup, error } = useSignup()

	const { email, password } = formData

	const handleSignup = async e => {
		e.preventDefault()
		await signup(email, password)
	}

	return (
		<div className={`${styles.form_container} form`}>
			<form onSubmit={handleSignup}>
				<Logo />
				<>
					<FormRow name='email' type='email' required setFormData={setFormData} value={email} />
					<FormRow name='password' type='password' required setFormData={setFormData} value={password} />
				</>
				<SubmitButton />
				<p>
					Already a member?
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
				{error && (
					<div className='form-error'>
						<span>{error}</span>
					</div>
				)}
			</form>
		</div>
	)
}

export default RegisterForm
