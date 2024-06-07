import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ProductsList.module.scss'
import Table from '../Table/Table'
import Product from '../Product/Product'
import { useProductsContext } from '../../hooks/useProductsContext'
import { Spin } from 'antd'
import { DrawerContext } from '../../contexts/DrawerContext'
import { GoAlertFill } from 'react-icons/go'

const ProductsList = () => {
	const { products, isLoading } = useProductsContext()
	const { isOpen, toggleOpen, setDrawerSize } = useContext(DrawerContext)

	const togglePopup = e => {
		e.preventDefault()
		setDrawerSize('lg')
		toggleOpen(<Product />)
	}

	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (text, record) => <img className='img img-table' src={record.image} alt='image of product' />,
			width: 50,
		},
		{
			title: 'Product',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => (
				<span onClick={togglePopup} className='name-product-cell'>
					<Link to={`/auth/stock/product/details/${record.product_id}`}>
						{record.quantity < 5 && <GoAlertFill />}
						{record.name}{' '}
					</Link>
				</span>
			),
		},
		{
			title: 'Product ID',
			dataIndex: 'product_id',
			key: 'product_id',
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Stock level',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (text, record) => <span className='span-color'>{record.quantity}</span>,
			sorter: (a, b) => a.quantity - b.quantity,
			width: 100,
		},
	]

	return (
		<div className={`${styles.products_list_container}`}>
			{isLoading ? (
				<div className='spin'>
					<Spin className='spin' size='large'></Spin>
				</div>
			) : (
				<>
					{products.length > 0 ? (
						<Table columns={columns} data={products} size={'small'} pagination buttons />
					) : (
						<p>No products in store yet.</p>
					)}
				</>
			)}
		</div>
	)
}

export default ProductsList
