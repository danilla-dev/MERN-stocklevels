import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case 'LOGIN': {
			// return state
			return { user: payload }
		}
		case 'LOGOUT': {
			// return state
			return { user: null }
		}
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null })

	useEffect(() => {
		const userExists = localStorage.getItem('user')
		if (userExists) {
			dispatch({ type: 'LOGIN', payload: JSON.parse(userExists) })
		}
	}, [])

	state.user && console.log('AuthContext state: ', state)

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
