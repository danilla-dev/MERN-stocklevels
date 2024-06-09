import { useMemo } from 'react'

// Helper function to aggregate sales by a given key
const aggregateSalesByKey = (sales, key) => {
	return sales.reduce((acc, sale) => {
		acc[sale[key]] = (acc[sale[key]] || 0) + sale.quantity
		return acc
	}, {})
}

// Helper function to sort aggregated sales and include additional data
const sortAggregatedSales = (aggregatedSales, additionalData = {}) => {
	return Object.entries(aggregatedSales)
		.sort(([, sales1], [, sales2]) => sales2 - sales1)
		.map(([key, sales]) => ({ key, sales, ...additionalData[key] }))
}

// Aggregate sales by stores
export const sortSalesByStores = sales => {
	if (!sales) return null
	const salesByStores = aggregateSalesByKey(sales, 'store')
	return sortAggregatedSales(salesByStores)
}

// Aggregate sales by products
export const sortSalesByProducts = sales => {
	if (!sales) return null
	const salesByProduct = aggregateSalesByKey(sales, 'product_id')
	const additionalData = sales.reduce((acc, sale) => {
		acc[sale.product_id] = { product_id: sale.product_id }
		return acc
	}, {})
	return sortAggregatedSales(salesByProduct, additionalData)
}

// Sum sales
export const sumSales = sales => {
	if (!sales) return 0
	return sales.reduce((sum, sale) => sum + sale.sales, 0)
}

// Create aggregated sales by date
export const createAggregatedSales = salesData => {
	if (!salesData) return []

	const salesByDate = salesData.reduce((acc, sale) => {
		const date = sale.createdAt.split('T')[0]
		acc[date] = acc[date] || []
		acc[date].push(sale)
		return acc
	}, {})

	return Object.keys(salesByDate)
		.map(date => {
			const totalSales = salesByDate[date].reduce((total, sale) => {
				return total + sale.products.reduce((sum, product) => sum + product.quantity, 0)
			}, 0)
			return { date, sales: totalSales }
		})
		.sort((a, b) => new Date(a.date) - new Date(b.date))
}

// Helper function to parse time interval keys
const parseTimeInterval = interval => {
	const [start, end] = interval.split('-')
	const [startHour] = start.split(':')
	return parseInt(startHour, 10)
}

// Create aggregated sales by time interval
export const createAggregatedSalesByInterval = (salesData, interval) => {
	if (!salesData || interval <= 0) return []

	const salesMap = new Map()

	salesData.forEach(sale => {
		const saleDate = new Date(sale.createdAt)
		const hour = saleDate.getHours()
		const groupIndex = Math.floor(hour / interval)
		const groupStartHour = groupIndex * interval
		const hourKey = `${groupStartHour}:00-${groupStartHour + interval - 1}:59`

		const salesForInterval = salesMap.get(hourKey) || []
		salesForInterval.push(sale)
		salesMap.set(hourKey, salesForInterval)
	})

	const aggregatedSalesByInterval = Array.from(salesMap.entries()).map(([hourKey, sales]) => {
		const totalSalesForInterval = sales.reduce((total, sale) => {
			return total + sale.products.reduce((sum, product) => sum + product.quantity, 0)
		}, 0)
		return { interval: hourKey, totalSales: totalSalesForInterval }
	})

	return aggregatedSalesByInterval.sort((a, b) => parseTimeInterval(a.interval) - parseTimeInterval(b.interval))
}
const aggregateSalesByProductAndDate = sales => {
	const salesByProductAndDate = {}

	sales.forEach(sale => {
		const date = sale.createdAt.split('T')[0]
		const productId = sale.product_id

		if (!salesByProductAndDate[productId]) {
			salesByProductAndDate[productId] = {}
		}

		if (!salesByProductAndDate[productId][date]) {
			salesByProductAndDate[productId][date] = 0
		}

		salesByProductAndDate[productId][date] += sale.quantity
	})

	return salesByProductAndDate
}

// Aggregate sales by products and date
export const aggregateSalesByProductsAndDays = sales => {
	if (!sales) return null
	const salesByProductAndDate = aggregateSalesByProductAndDate(sales)

	return Object.entries(salesByProductAndDate).map(([productId, salesByDate]) => ({
		product_id: productId,
		sales: Object.entries(salesByDate).map(([date, quantity]) => ({
			date,
			quantity,
		})),
	}))
}
