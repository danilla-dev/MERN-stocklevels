import { Link } from 'react-router-dom'
export const lowStockColumns = [
	{
		title: 'Product',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'ID',
		dataIndex: 'product_id',
		key: 'product_id',
	},
	{
		title: 'Stock level',
		dataIndex: 'quantity',
		key: 'quantity',
	},
]
export const allSoldProductsColumns = [
	{
		title: 'Product',
		dataIndex: 'product_id',
		key: 'product_id',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		key: 'quantity',
	},
	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (text, record) => {
			const date = new Date(record.createdAt)
			const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
			return <p>{formattedDate}</p>
		},
	},
]
export const allSalesColumns = [
	{
		title: 'Sold product and quantity',
		dataIndex: 'product_id',
		key: 'product_id',
		render: (text, record) => {
			return (
				<>
					{record.products.map(product => (
						<p key={product._id}>
							ID: {product.product_id} - {product.quantity} pcs.
						</p>
					))}
				</>
			)
		},
	},
	{
		title: 'Store',
		dataIndex: 'store',
		key: 'store',
	},
	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (text, record) => {
			const date = new Date(record.createdAt)
			const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
			return <p>{formattedDate}</p>
		},
	},
]
export const allProductsSalesColumn = [
	{
		title: 'Product',
		dataIndex: 'product_id',
		key: 'product_id',
	},
	{
		title: 'Sales',
		dataIndex: 'sales',
		key: 'sales',
	},
]
