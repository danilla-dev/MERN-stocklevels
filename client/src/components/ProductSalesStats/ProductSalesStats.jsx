import React, { useEffect, useState } from 'react'
import styles from './ProductSalesStats.module.scss'
import { Progress } from 'antd'
import SimpleBarChart from '../SimpleBarChart/SimpleBarChart'
import { useProductsContext } from '../../hooks/useProductsContext'

const USER_SALE_GOAL = 40

const ProductSalesStats = ({ sale }) => {
	const [salesArray, setSalesArray] = useState([])
	const [salesSum, setSalesSum] = useState(0)

	const { product, products } = useProductsContext()

	useEffect(() => {
		getSalesAtStores()
	}, [product, products])

	const getSalesAtStores = params => {
		const storesWithSales = {}
		setSalesSum(0)
		for (const object of sale) {
			const { store, quantity } = object

			if (!storesWithSales[store]) {
				storesWithSales[store] = 0
			}

			storesWithSales[store] += quantity
		}

		const storesWithSalesArray = Object.entries(storesWithSales).map(([store, sales]) => ({
			store,
			sales,
		}))
		storesWithSalesArray.forEach(store => {
			setSalesSum(prevState => (prevState += store.sales))
		})
		setSalesArray(storesWithSalesArray)
	}
	console.log(salesArray)
	return (
		<div className='details-box'>
			<h2 className='details-header'>Stats: </h2>

			<div className='details-box'>
				<h3 className='details-sub-header'>
					Sale goal <span className='span-color'>{`${USER_SALE_GOAL} pcs.`}</span>
				</h3>
				<Progress percent={(sale.length / USER_SALE_GOAL) * 100} />
			</div>

			<h3 className='details-sub-header'>Sales at stores</h3>
			<SimpleBarChart data={salesArray} oneBar values={['store', 'sales']} />
			<h3 className='details-sub-header'>Percentage sales of stores</h3>

			<div className='details-box charts'>
				{salesArray.map((store, index) => {
					return (
						<Progress
							key={index}
							type='circle'
							style={{ padding: 10 }}
							percent={parseFloat((store.sales / salesSum) * 100).toFixed(1)}
							size={200}
							format={percentage => <p style={{ fontSize: '20px' }}>{`${percentage}% ${store.store}`}</p>}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default ProductSalesStats
