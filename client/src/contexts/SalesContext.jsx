import { createContext, useReducer, useState, memo, useMemo } from 'react'

export const SalesContext = createContext()

export const SalesReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'SET_SALES':
			return {
				...state,
				sales: [...payload.sales],
			}
		case 'SET_PREVIOUS_SALES':
			return {
				...state,
				sale: [...payload.sale],
			}
		//////////////////////////////////
		case 'SET_SOLD_PRODUCTS':
			return {
				...state,
				soldProducts: [...payload.soldProducts],
			}
		case 'PREVIOUS_SOLD_PRODUCTS':
			return {
				...state,
				previousSoldProducts: [...payload.soldProducts],
			}

		//////////////////////////////////
		case 'SET_PREVIEW_SALE':
			return {
				...state,
				soldProduct: [...payload.sale],
			}

		default:
			return state
	}
}
export const SalesContextProvider = memo(({ children }) => {
	const [state, dispatch] = useReducer(SalesReducer, {
		soldProducts: [],
		soldProduct: [],
		previousSoldProducts: [],
		sales: [],
		sale: [],
	})
	const [isLoading, setIsLoading] = useState(true)

	const sortSalesByStores = useMemo(() => {
		return sales => {
			if (sales) {
				const salesByStores = sales.reduce((acc, sale) => {
					acc[sale.store] = (acc[sale.store] || 0) + sale.quantity
					return acc
				}, {})
				const sortedSales = Object.entries(salesByStores)
					.sort(([, store1], [, store2]) => store2 - store1)
					.map(([name, sales]) => ({ name, sales }))
				return sortedSales
			}
			return null
		}
	}, [])

	const sortSalesByProducts = useMemo(() => {
		return sales => {
			if (sales) {
				const salesByProduct = sales.reduce((acc, sale) => {
					acc[sale.product_id] = (acc[sale.product_id] || 0) + sale.quantity
					return acc
				}, {})
				const sortedProducts = Object.entries(salesByProduct)
					.sort(([, sales1], [, sales2]) => sales2 - sales1)
					.map(([product_id, sales]) => ({ product_id, sales }))
				return sortedProducts
			}
			return null
		}
	}, [])

	const sumSales = sales => {
		let sum = 0
		if (sales) {
			sales.forEach(sale => {
				sum += sale.sales
			})
		}
		return sum
	}

	const createAggregatedSales = salesData => {
		const salesObject = {}

		salesData.forEach(sale => {
			const date = sale.createdAt.split('T')[0]
			const salesForDate = salesObject[date] || []
			salesForDate.push(sale)
			salesObject[date] = salesForDate
		})

		const aggregatedSales = Object.keys(salesObject).map(date => {
			const totalSales = salesObject[date].reduce((total, sale) => {
				const salesForDay = sale.products.reduce((sum, product) => sum + product.quantity, 0)
				return total + salesForDay
			}, 0)
			return { date, sales: totalSales }
		})

		aggregatedSales.sort((a, b) => new Date(a.date) - new Date(b.date))
		return aggregatedSales
	}

	const createAggregatedSalesByInterval = (salesData, interval) => {
		const salesMap = new Map()

		salesData.forEach(sale => {
			const saleDate = new Date(sale.createdAt)
			const hour = saleDate.getHours()

			// Oblicz indeks grupy dla danej godziny na podstawie interwału
			const groupIndex = Math.floor(hour / interval)

			// Oblicz początek interwału czasowego dla danej godziny
			const groupStartHour = groupIndex * interval

			// Utwórz klucz w formacie "HH:00-HH:59" dla grupy godzin
			const hourKey = `${groupStartHour}:00-${groupStartHour + interval - 1}:59`

			// Pobierz lub utwórz tablicę sprzedaży dla danej grupy godzin
			const salesForInterval = salesMap.get(hourKey) || []

			// Dodaj bieżącą sprzedaż do tablicy sprzedaży dla danej grupy godzin
			salesForInterval.push(sale)

			// Zaktualizuj dane w mapie
			salesMap.set(hourKey, salesForInterval)
		})

		// Przekształć dane z mapy na tablicę wynikową
		const aggregatedSalesByInterval = []
		salesMap.forEach((sales, hour) => {
			// Tutaj możesz obliczyć sumę sprzedaży dla danej grupy godzin, jeśli jest to konieczne
			const totalSalesForInterval = sales.reduce((total, sale) => {
				// Dodaj do sumy sprzedaży ilość sprzedanych produktów w danej sprzedaży
				return total + sale.products.reduce((sum, product) => sum + product.quantity, 0)
			}, 0)

			// Dodaj dane o sprzedaży do tablicy wynikowej
			aggregatedSalesByInterval.push({ interval: hour, totalSales: totalSalesForInterval })
		})

		// Posortuj dane według interwału
		aggregatedSalesByInterval.sort((a, b) => {
			// Tutaj możesz dostosować sortowanie według potrzeb
			return a.interval.localeCompare(b.interval)
		})

		return aggregatedSalesByInterval
	}
	const previousSortedSales = sortSalesByStores(state.previousSoldProducts)
	const sortedSales = sortSalesByStores(state.soldProducts)

	const previousSortedProducts = sortSalesByProducts(state.previousSoldProducts)
	const sortedProducts = sortSalesByProducts(state.soldProducts)

	const prevSalesSum = sumSales(previousSortedSales)
	const currSalesSum = sumSales(sortedSales)

	const aggregatedSales = createAggregatedSales(state.sales)
	const aggregatedSalesByHour = createAggregatedSalesByInterval(state.sales, 1)
	console.log('aggregatedSales', aggregatedSales)
	console.log('aggregatedSalesByHour', aggregatedSalesByHour)

	return (
		<SalesContext.Provider
			value={{
				...state,
				dispatch,
				isLoading,
				setIsLoading,
				sortedSales,
				sortedProducts,
				previousSortedSales,
				prevSalesSum,
				currSalesSum,
				aggregatedSales,
				aggregatedSalesByHour,
			}}
		>
			{children}
		</SalesContext.Provider>
	)
})
