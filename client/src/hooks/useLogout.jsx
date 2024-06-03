import { useAuthContext } from './useAuthContext'

const useLogout = () => {
	const { dispatch } = useAuthContext()

	const logout = params => {
		// delete user from local storage
		localStorage.removeItem('user')

		// update global state
		dispatch({ type: 'LOGOUT', payload: null })

		location.reload()

	}
	return { logout }
}
export default useLogout
