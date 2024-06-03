import { StoreContext } from '../contexts/StoreContext'
import { useContext } from 'react'

export const useStoreContext = () => {
	const context = useContext(StoreContext)

	if (!context) {
		throw Error('useStoreContext must be used inside an StoreContextProvider')
	}

	return context
}
