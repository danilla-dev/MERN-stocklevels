import { useContext } from 'react'
import { DrawerContext } from '../contexts/DrawerContext'

export const useDrawerContext = () => {
	const context = useContext(DrawerContext)
	if (!context) {
		throw Error('useDrawerContext must be used inside an DrawerContextProvider')
	}
	return context
}
