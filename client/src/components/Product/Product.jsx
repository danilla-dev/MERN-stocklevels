import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteProduct, getProduct, getSalesOfProduct } from '../../api/apiFunctions'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useDrawerContext } from '../../hooks/useDrawerContext'
import { useSalesContext } from '../../hooks/useSalesContext'
import Table from '../Table/Table'
import ProductHeader from '../ProductHeader/ProductHeader'
import ProductQuantityStats from '../ProductQuantityStats/ProductQuantityStats'
import ProductSalesStats from '../ProductSalesStats/ProductSalesStats'
import SaleForm from '../SaleForm/SaleForm'
import { AlertContext } from '../../contexts/AlertContext'
import { GoAlertFill } from 'react-icons/go'
import { MdStars } from 'react-icons/md'
import EditProductForm from '../EditProductForm/EditProductForm'

const columnsDetails = [
	{
		title: 'Width',
		dataIndex: 'width',
		key: 'width',
		width: 20,
	},
	{
		title: 'Height',
		dataIndex: 'height',
		key: 'height',
		width: 20,
	},
	{
		title: 'Weight',
		dataIndex: 'weight',
		key: 'weight',
		width: 20,
	},
	{
		title: 'Material',
		dataIndex: 'material',
		key: 'material',
		width: 20,
	},
	{
		title: 'Color',
		dataIndex: 'color',
		key: 'color',
		width: 20,
	},
	{
		title: 'Brand',
		dataIndex: 'brand',
		key: 'brand',
		width: 20,
	},
]
const columnsSales = [
	{
		title: 'Store',
		dataIndex: 'store',
		key: 'store',
		width: 20,
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		key: 'quantity',
		width: 20,
	},
	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		width: 20,
		render: record => {
			const date = new Date(record)
			const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

			const currentTime = new Date()
			const differenceInMilliseconds = currentTime - date
			const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
			const differenceInMinutes = Math.floor(differenceInSeconds / 60)
			const differenceInHours = Math.floor(differenceInMinutes / 60)
			const differenceInDays = Math.floor(differenceInHours / 24)

			return (
				<>
					<p>{formattedDate}</p>
					{differenceInDays !== 0 && <p>{`${differenceInDays} days ago`}</p>}

					{differenceInHours > 0 && differenceInHours < 60 && <p>{`${differenceInHours} hours ago`}</p>}

					{differenceInMinutes > 0 && differenceInMinutes < 60 && <p>{`${differenceInMinutes} minutes ago`}</p>}

					{differenceInSeconds > 0 && differenceInSeconds < 60 && <p>{`${differenceInSeconds} seconds ago`}</p>}
				</>
			)
		},
	},
]

const Product = () => {
	const { product, dispatch, products } = useProductsContext()
	const { toggleOpen, setDrawerSize, setInsideContext } = useDrawerContext()
	const { dispatch: salesDispatch, sale } = useSalesContext()
	const { setAlertData } = useContext(AlertContext)

	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		getProduct(dispatch, id)
		getSalesOfProduct(salesDispatch, id)
	}, [dispatch, salesDispatch, products])

	const handleOpenInsideDrawer = context => {}

	const handleOpenSellDrawer = e => {
		setInsideContext(<SaleForm id={id} ean={product.EAN} />)
		navigate(`/dashboard/stock/product/details/${id}/sell`)
	}
	const handleDeleteProduct = async e => {
		const isConfirmed = window.confirm(`Are you sure to delete product with ID:${id}?`)
		if (isConfirmed) {
			await deleteProduct(dispatch, id, setAlertData)
			toggleOpen()
		}
	}
	const handleEditProduct = e => {
		setInsideContext(<EditProductForm id={id} product={product} />)
		navigate(`/dashboard/stock/product/details/${id}/edit`)
	}
	return (
		<>
			{product && (
				<div className='product-details-container'>
					<ProductHeader product={product} />
					<div className='action'>
						<div className='action-buttons details'>
							<button className='btn accept' onClick={handleOpenSellDrawer} disabled={product.quantity <= 0}>
								Sell
							</button>
							<button className='btn logout-btn' onClick={handleEditProduct}>
								Edit
							</button>
							<button className='btn delete' onClick={handleDeleteProduct}>
								Delete
							</button>
						</div>
						<div className='stats-icons details'>
							{product.quantity < 5 && (
								<div className='alert-icon'>
									<GoAlertFill />
									<p>LOW STOCK LEVEL!</p>
								</div>
							)}
						</div>
					</div>

					<ProductQuantityStats product={product} />

					<div className='details-box'>
						<h2 className='details-header'>Details: </h2>
						<Table data={product.details} columns={columnsDetails} pagination={false} expandable={false} />
					</div>

					<div className='details-box'>
						<h2 className='details-header'>Sales: {sale.length}</h2>
						<Table data={sale || []} columns={columnsSales} pagination={{ pageSize: 5 }} expandable={false} />
					</div>

					<ProductSalesStats product={product} sale={sale} />
				</div>
			)}
		</>
	)
}

export default Product
