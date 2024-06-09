import React, { useState, useContext } from 'react'
import styles from './EditProductForm.module.scss'
import { useStoreContext } from '../../hooks/useStoreContext'
import { useProductsContext } from '../../hooks/useProductsContext'
import FormRow from '../FormRow/FormRow'
import FormSelect from '../FormSelect/FormSelect'
import SubmitButton from '../SubmitButton/SubmitButton'
import { updateProduct } from '../../api/apiFunctions'
import { categoriesWithSubcategories } from '../../constants/categories'

const EditProductForm = ({ id, product }) => {
	const { product_id, name, EAN, category, details, quantity, image } = product
	const [formData, setFormData] = useState({
		product_id,
		name,
		EAN,
		category,
		quantity,
	})
	const [detailsObject, setDetailsObject] = useState(details[0])

	const { storeData } = useStoreContext()
	const { products, dispatch } = useProductsContext()

	const subCategories = categoriesWithSubcategories.find(
		category => category.category === storeData.category
	).subcategories

	const objectArray = Object.entries(details[0]).map(([key, value]) => ({ [key]: value }))

	const handleUpdateProduct = e => {
		e.preventDefault()
		const { product_id, name, quantity, category, EAN } = formData
		const data = new FormData()
		data.append('product_id', product_id)
		data.append('name', name)
		data.append('quantity', quantity)
		data.append('category', category)
		data.append('EAN', EAN === null ? '' : EAN)
		data.append('details', JSON.stringify([detailsObject]))

		updateProduct(data, dispatch)
	}
	return (
		<form className={`${styles.edit_form} form form-drawer`} onSubmit={handleUpdateProduct}>
			<h2 className='header'>{`Edit ${id} data`} </h2>
			<FormRow
				name='name'
				type='text'
				required
				labelText='Name'
				setFormData={setFormData}
				value={formData.name && formData.name}
				row
			/>
			<FormRow
				name='product_id'
				type='text'
				required
				labelText='Product id'
				setFormData={setFormData}
				value={formData.product_id && formData.product_id}
				row
				disable
			/>
			<FormRow
				name='EAN'
				type='number'
				required
				labelText='EAN'
				setFormData={setFormData}
				value={formData.EAN && formData.EAN}
				disable
				row
			/>
			<FormSelect
				name='category'
				type='text'
				data={subCategories && subCategories}
				required
				labelText='Category'
				setFormData={setFormData}
				value={formData.category}
				row
			/>
			<FormRow
				name='quantity'
				type='number'
				required
				labelText='Quantity'
				setFormData={setFormData}
				value={formData.quantity && formData.quantity}
				row
			/>
			<p className='section-title'>Details</p>
			{objectArray.map((detail, index) => {
				const [[name, value]] = Object.entries(detail)
				return (
					<FormRow
						key={index}
						name={name}
						type='text'
						labelText={name.charAt(0).toUpperCase() + name.slice(1)}
						setFormData={setDetailsObject}
						value={detailsObject[name]}
						row
					/>
				)
			})}
			<SubmitButton text={'Update'} />
		</form>
	)
}

export default EditProductForm

// EAN
// :
// null
// category
// :
// "Furniture"
// details
// :
// [{…}]
// image
// :
// "data:image/webp;base64,UklGRoI+AABXRUJQVlA4WAoAAA
// name
// :
// "amfora z otworem 80cm"
// product_id
// :
// "14H80"
// quantity
// :
// 1
// sales
// :
// []
// user_id
// :
// "665d809a8da164982fd7cbcb"
// __v
// :
// 0
// _id
// :
// "665d85e52e400b60d5f621bb"
