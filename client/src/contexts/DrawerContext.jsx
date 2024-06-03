import { createContext, useReducer, useState, useEffect } from 'react'

export const DrawerContext = createContext()

export const DrawerContextProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrollLocked, setScrollLocked] = useState(false)
	const [drawerContext, setDrawerContext] = useState()
	const [drawerSize, setDrawerSize] = useState('')
	const [insideContext, setInsideContext] = useState('')

	const toggleOpen = context => {
		setIsOpen(prevState => !prevState)
		setDrawerContext(context || '')
		setInsideContext('')
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			document.getElementById('blur').style.display = 'block'
			setScrollLocked(true)
		} else {
			document.body.style.overflow = 'auto'
			document.getElementById('blur').style.display = 'none'

			setScrollLocked(false)
		}

		return () => {
			document.body.style.overflow = 'auto'
			document.getElementById('blur').style.display = 'none'
			setScrollLocked(false)
		}
	}, [isOpen])

	return (
		<DrawerContext.Provider
			value={{
				setIsOpen,
				toggleOpen,
				isOpen,
				drawerContext,
				setDrawerContext,
				setDrawerSize,
				drawerSize,
				insideContext,
				setInsideContext,
			}}
		>
			{children}
		</DrawerContext.Provider>
	)
}
