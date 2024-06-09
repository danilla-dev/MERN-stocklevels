import React, { useContext, useEffect, useState } from 'react'
import styles from './SaleForm.module.scss'
import FormRow from '../FormRow/FormRow'
import FormSelect from '../FormSelect/FormSelect'
import { useStoreContext } from '../../hooks/useStoreContext'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useSalesContext } from '../../hooks/useSalesContext'
import { getSalesOfProduct, postSale } from '../../api/apiFunctions'
import { AlertContext } from '../../contexts/AlertContext'
import { FaRegWindowClose, FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa'

const SaleForm = ({ id, ean }) => {
	//////////////// STATES //////////////////////////
	const [formData, setFormData] = useState([
		{
			product_id: id || '',
			EAN: ean || '',
			quantity: 1,
		},
	])

	const [store, setStore] = useState({
		store: '',
	})
	const [errorMessage, setErrorMessage] = useState('')
	const [productData, setProductData] = useState({ id, ean })
	const [disabledButton, setDisabledButton] = useState(true)
	///////////// CONTEXTS ////////////////////
	const { storeData } = useStoreContext()
	const { products, dispatch } = useProductsContext()
	const { dispatch: salesDispatch } = useSalesContext()
	const { setAlertData } = useContext(AlertContext)

	// const setEAN = () => {
	// 	const product = products.filter(product => {
	// 		return product.product_id === formData.product_id
	// 	})
	// 	const productEAN = product[0] && product[0].EAN
	// 	setFormData(prevState => ({
	// 		...prevState,
	// 		EAN: productEAN ? productEAN : '',
	// 	}))
	// }

	const handleSellProduct = async e => {
		e.preventDefault()
		formData.unshift(store)
		const resetData = [
			{
				product_id: id || '',
				EAN: ean || '',
				quantity: 1,
			},
		]
		await postSale(dispatch, salesDispatch, formData, setAlertData, setErrorMessage, setFormData, resetData)
		await getSalesOfProduct(salesDispatch, id)
	}

	const handleInputOnChange = (index, e) => {
		const { name, value } = e.target
		const newFormData = formData.map((product, i) => (i === index ? { ...product, [name]: value } : product))
		setFormData(newFormData)
	}

	const addProduct = e => {
		e.preventDefault()
		setFormData([...formData, { product_id: '', EAN: '', quantity: 1, store: '' }])
	}

	const removeProduct = (e, index) => {
		e.preventDefault()
		if (index === 0) {
			setProductData({
				ean: null,
				id: null,
			})
		}
		const newFormData = formData.filter((_, i) => i !== index)
		setFormData(newFormData)
	}

	const handleChangeQuantity = (e, index) => {
		e.preventDefault()
		const { name } = e.currentTarget

		const newFormData = formData.map((product, i) =>
			i === index ? { ...product, quantity: name === 'add' ? product.quantity + 1 : product.quantity - 1 } : product
		)
		setFormData(newFormData)
		if (newFormData[index].quantity === 1) {
			setDisabledButton(true)
		} else {
			setDisabledButton(false)
		}
	}
	return (
		<form onSubmit={handleSellProduct} className={`${styles.sale_form} form form-drawer`}>
			<h2 className='header'>{`Sell products`} </h2>
			{errorMessage && (
				<div className='form-error sm'>
					<span>{errorMessage}</span>
				</div>
			)}
			<FormSelect
				name='store'
				type='text'
				data={storeData && storeData.stores}
				required
				labelText='Store'
				setFormData={setStore}
				value={store.store}
				row
			/>
			{formData.map((product, index) => {
				return (
					<div className='form-box' key={index}>
						<div className='form-box-controls'>
							<p className='form-box-index'>{index + 1}</p>
							<div className='form-box-controls-buttons'>
								<button
									className='btn sub'
									onClick={e => handleChangeQuantity(e, index)}
									name='sub'
									disabled={disabledButton}
								>
									<FaRegMinusSquare />
								</button>
								<button className='btn add' onClick={e => handleChangeQuantity(e, index)} name='add'>
									<FaRegPlusSquare />
								</button>
								{index !== 0 && (
									<button className='btn delete' onClick={e => removeProduct(e, index)}>
										<FaRegWindowClose />
									</button>
								)}
							</div>
						</div>
						<FormRow
							name='product_id'
							type='text'
							required
							labelText='Product id*'
							setFormData={setFormData}
							list={'products_id-suggestions'}
							value={product.product_id}
							row
							disable={index === 0 && productData.id}
							special={e => handleInputOnChange(index, e)}
						/>
						<FormRow
							name='EAN'
							type='number'
							labelText='EAN'
							setFormData={setFormData}
							value={product.EAN}
							row
							disable={index === 0 && productData.ean}
							special={e => handleInputOnChange(index, e)}
						/>
						<FormRow
							name='quantity'
							type='number'
							required
							labelText='Quantity*'
							setFormData={setFormData}
							value={product.quantity}
							row
							special={e => handleInputOnChange(index, e)}
						/>
					</div>
					/// obluga uzupelniania ean, inny przycisk usuwania i lecisz dalej z backendem
				)
			})}

			<datalist id='products_id-suggestions'>
				{products.map(product => {
					if (formData.some(item => item.product_id === product.product_id)) {
						return null
					}
					return <option value={product.product_id}>{product.product_id}</option>
				})}
			</datalist>

			<button className='btn submit-btn' onClick={addProduct}>
				Add product
			</button>
			<button type='submit' className='btn submit-btn'>
				Sell
			</button>
		</form>
	)
}

export default SaleForm
