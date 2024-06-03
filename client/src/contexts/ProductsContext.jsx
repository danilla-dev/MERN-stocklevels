import { createContext, useReducer, useState, memo, useMemo } from 'react'

export const ProductsContext = createContext()

export const ProductsReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'SET_PRODUCTS':
			return {
				products: payload,
			}
		case 'PREVIEW_PRODUCT':
			return {
				products: state.products,
				product: payload,
			}
		case 'CREATE_PRODUCT':
			return {
				products: [payload, ...state.products],
			}
		default:
			return state
	}
}
export const ProductsContextProvider = memo(({ children }) => {
	const [state, dispatch] = useReducer(ProductsReducer, {
		products: [],
		product: {},
	})
	const [isLoading, setIsLoading] = useState(true)

	console.log(`Product context state`, state)

	return (
		<ProductsContext.Provider value={{ ...state, dispatch, isLoading, setIsLoading }}>
			{children}
		</ProductsContext.Provider>
	)
})
