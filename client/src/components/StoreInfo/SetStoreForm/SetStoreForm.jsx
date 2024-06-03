import React, { useState } from 'react'
import styles from './SetStoreForm.module.scss'
import FormRow from '../FormRow/FormRow'
import FormSelect from '../FormSelect/FormSelect'
import Logo from '../Logo/Logo'
import img from '../../assets/setStoreSvg.svg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useStoreContext } from '../../hooks/useStoreContext'
import { postStore } from '../../api/apiFunctions'
const categories = [
	'Electronics',
	'Groceries',
	'Fashion',
	'Home & Garden',
	'Health & Beauty',
	'Sports & Recreation',
	'Automotive',
	'Jewelry & Watches',
	'Kids & Toys',
	'Books & Media',
	'Furniture',
	'Tools',
	'Pets',
	'Alcohol',
	'Musical Instruments',
	'Technology',
	'Office & School',
	'Household Goods',
	'Organic Food',
	'Consumer Electronics',
	'Pawn',
	'Other',
]

const storesData = [
	'Own',
	'Other',
	'Allegro',
	'OLX',
	'Ceneo',
	'Gratka',
	'Nokaut',
	'eBay.pl',
	'Allegro Lokalnie',
	'Otomoto',
	'Zalando',
	'Domodi',
	'Amazon',
	'eBay',
	'AliExpress',
	'Walmart',
	'Shopify',
	'Taobao',
	'JD.com',
	'Etsy',
	'Rakuten',
	'Flipkart',
]

const currencies = [
	'United States Dollar (USD)',
	'Euro (EUR)',
	'Japanese Yen (JPY)',
	'British Pound Sterling (GBP)',
	'Swiss Franc (CHF)',
	'Australian Dollar (AUD)',
	'Canadian Dollar (CAD)',
	'Norwegian Krone (NOK)',
	'Swedish Krona (SEK)',
	'Chinese Yuan (CNY)',
	'Russian Ruble (RUB)',
	'Indian Rupee (INR)',
	'Mexican Peso (MXN)',
	'Polish Zloty (PLN)',
	'New Zealand Dollar (NZD)',
	'Danish Krone (DKK)',
	'Czech Koruna (CZK)',
	'South Korean Won (KRW)',
	'Brazilian Real (BRL)',
	'Turkish Lira (TRY)',
]

const SetStoreForm = () => {
	const { user, dispatch: userDispatch } = useAuthContext()
	const { dispatch } = useStoreContext()
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		currency: '',
		stores: [],
		image: '',
	})

	const [imageUrl, setImageUrl] = useState('')
	const [error, setError] = useState('')
	const [storeInput, setStoreInput] = useState({
		stores: '',
	})

	const handleSetStore = async e => {
		e.preventDefault()
		const { name, currency, category, stores, image } = formData

		const data = new FormData()
		data.append('name', name)
		data.append('category', category)
		data.append('currency', currency)
		data.append('image', image)
		data.append('stores', JSON.stringify(stores))

		postStore(dispatch, userDispatch, data, setFormData)
	}
	const handleStoresOnchange = e => {
		if (formData.stores.includes(e.target.value)) {
			const newArray = formData.stores.filter(store => store !== e.target.value)
			setFormData(prevState => ({
				...prevState,
				stores: newArray,
			}))
			return
		}
		setFormData(prevState => ({
			...prevState,
			stores: [...formData.stores, e.target.value],
		}))
	}
	if (formData) {
		formData.stores.map(store => {
			if (!storesData.includes(store)) {
				storesData.push(store)
			}
		})
	}
	const handleOnKeyDown = e => {
		if (e.key === 'Enter') e.preventDefault()
	}
	return (
		<div className={styles.form_container}>
			<form onSubmit={handleSetStore} className={`${styles.form} form`} onKeyDown={handleOnKeyDown}>
				<h1>Create a store account.</h1>
				<div className='form-block'>
					<FormRow
						name='name'
						type='text'
						labelText='store name'
						setFormData={setFormData}
						required
						value={formData.name}
					/>
					<FormSelect
						data={categories}
						name='category'
						value={formData.category}
						setFormData={setFormData}
						labelText='store category'
					/>
					<FormSelect
						data={currencies}
						name='currency'
						value={formData.currency}
						setFormData={setFormData}
						labelText='store currency'
					/>
				</div>
				<div className='form-block'>
					<p htmlFor='checkboxes-container'>Stores:</p>
					<div className='checkboxes-container' id='checkboxes-container'>
						{storesData.map((store, index) => {
							return (
								<div className='checkbox'>
									<p key={index}>{store}</p>
									<span>
										<input
											name='stores'
											id='stores'
											type='checkbox'
											onChange={handleStoresOnchange}
											checked={formData.stores.includes(store)}
											value={store}
										/>
									</span>
								</div>
							)
						})}
					</div>
					{formData.stores.some(store => store === 'Own' || store === 'Other') && (
						<FormRow
							name='stores'
							type='text'
							labelText='Other store'
							setFormData={setStoreInput}
							otherSetState={setFormData}
							otherState={formData.stores}
							onKeyDown
							required
							value={storeInput.stores}
							setError={setError}
						/>
					)}
					{error && (
						<div className={`${styles.error} form-error`}>
							<span>{error}</span>
						</div>
					)}
				</div>
				<div className='form-block'>
					<FormRow
						name='imageLogo'
						type='file'
						labelText='store logo'
						setFormData={setFormData}
						setImageUrl={setImageUrl}
					/>
					<div className='img img-preview'>{<img src={imageUrl} alt='uploaded image' />}</div>
				</div>
				<div className={`${styles.buttons} action-buttons`}>
					<button className='btn'>Create</button>
				</div>
			</form>
			{/* <div className={`${styles.img_container} `}>
				<img src={img} alt='' />
			</div> */}
		</div>
	)
}

export default SetStoreForm
