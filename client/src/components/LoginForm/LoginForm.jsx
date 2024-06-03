import { useState } from 'react'
import FormRow from '../FormRow/FormRow'
import Logo from '../Logo/Logo'
import SubmitButton from '../SubmitButton/SubmitButton'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.scss'
import useLogin from '../../hooks/useLogin'

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData
	const { login, error } = useLogin()

	const handleSignIn = async e => {
		e.preventDefault()
		login(email, password)
	}
	return (
		<div className={styles.form_container}>
			<div className={'form'}>
				<form onSubmit={handleSignIn}>
					<Logo />

					<FormRow type='text' name='email' required value={email} setFormData={setFormData} />

					<FormRow type='password' name='password' required value={password} setFormData={setFormData} />

					<SubmitButton />

					<p>
						Not a member yet?
						<Link to='/signup' className='member-btn'>
							Sign up
						</Link>
					</p>

					{error && (
						<div className='form-error'>
							<span>{error}</span>
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default LoginForm
