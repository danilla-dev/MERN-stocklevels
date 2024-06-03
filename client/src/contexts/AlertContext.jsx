import { createContext, useEffect, useReducer, useState } from 'react'

export const AlertContext = createContext()

export const AlertContextProvider = ({ children }) => {
	const [alertData, setAlertData] = useState({
		text: '',
		type: '',
		open: false,
	})

	useEffect(() => {
		if (alertData.open) {
			setTimeout(() => setAlertData({ text: '', type: '', open: false }), 5000)
		}
	}, [alertData.open])

	return <AlertContext.Provider value={{ alertData, setAlertData }}>{children}</AlertContext.Provider>
}
