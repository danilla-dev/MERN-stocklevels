import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const useLogin = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const { dispatch } = useAuthContext()

	const login = async (email, password) => {
		setIsLoading(true)
		setError(null)

		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
		}
		if (response.ok) {
			// Save user in local storage
			localStorage.setItem('user', JSON.stringify(json))

			// Update auth context
			dispatch({ type: 'LOGIN', payload: json })

			location.reload()
		}
	}

	return { login, isLoading, error }
}
export default useLogin
