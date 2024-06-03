import { createContext, useReducer, useState } from 'react'

export const StoreContext = createContext()

export const storeReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case 'GET_DATA': {
			// return state
			return { storeData: payload }
		}
		case 'SET_COMPLETE': {
			// return state
			return { store: [...state, payload] }
		}
		default:
			return state
	}
}

export const StoreContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(storeReducer, { storeData: null })
	const [isLoading, setIsLoading] = useState(true)

	state.storeData && console.log('StoreContext state: ', state)
	return (
		<StoreContext.Provider value={{ ...state, dispatch, isLoading, setIsLoading }}>{children}</StoreContext.Provider>
	)
}
