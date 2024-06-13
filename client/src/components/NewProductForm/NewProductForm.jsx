import { useState, useContext } from 'react'
import styles from './NewProductForm.module.scss'
import FormRow from '../FormRow/FormRow'
import FormSelect from '../FormSelect/FormSelect'
import SubmitButton from '../SubmitButton/SubmitButton'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useStoreContext } from '../../hooks/useStoreContext'
import { postProduct } from '../../api/apiFunctions'
import { FaUpload } from 'react-icons/fa6'
import { getSubCategories } from '../../constants/categories'
import { AlertContext } from '../../contexts/AlertContext'

const INPUTS = [
	{
		name: 'name',
		type: 'text',
		required: true,
		labelText: 'Name*',
	},
	{
		name: 'product_id',
		type: 'text',
		required: true,
		labelText: 'ID*',
	},
	{
		name: 'EAN',
		type: 'text',
		required: false,
		labelText: 'EAN',
	},
	{
		name: 'quantity',
		type: 'number',
		required: true,
		labelText: 'Stock level*',
	},
	{
		name: 'image',
		type: 'file',
		required: true,
		labelText: 'Image',
	},
]
const detailsInput = [
	{
		name: 'height',
		type: 'number',
		required: false,
		labelText: 'Height',
	},
	{
		name: 'width',
		type: 'number',
		required: false,
		labelText: 'Width',
	},
	{
		name: 'weight',
		type: 'number',
		required: false,
		labelText: 'Weight',
	},
	{
		name: 'material',
		type: 'text',
		required: false,
		labelText: 'Material',
	},
	{
		name: 'color',
		type: 'text',
		required: false,
		labelText: 'Color',
	},
	{
		name: 'brand',
		type: 'text',
		required: false,
		labelText: 'Brand',
	},
]

const NewProductForm = ({ ean }) => {
	const { dispatch } = useProductsContext()
	const { storeData } = useStoreContext()
	const { setAlertData } = useContext(AlertContext)
	const [imageUrl, setImageUrl] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		product_id: '',
		name: '',
		quantity: '',
		category: '',
		image: '',
		EAN: ean ? ean : '',
		width: '',
		height: '',
		weight: '',
		material: '',
		color: '',
		brand: '',
	})

	const handleCreateProduct = async e => {
		e.preventDefault()
		const { product_id, name, quantity, category, image, width, height, weight, material, color, brand, EAN } = formData

		const details = [{ width, height, weight, material, color, brand }]

		const data = new FormData()
		data.append('product_id', product_id)
		data.append('name', name)
		data.append('quantity', quantity)
		data.append('category', category)
		data.append('image', image)
		data.append('EAN', EAN)
		data.append('details', JSON.stringify(details))

		await postProduct(dispatch, data, setFormData, setImageUrl, setAlertData, setErrorMessage)
	}

	return (
		<form className='form form-drawer' onSubmit={handleCreateProduct}>
			<h2 className='header'>Add new product</h2>
			{INPUTS.map((input, index) => {
				const { name, type, required, labelText } = input
				return (
					<FormRow
						key={index}
						name={name}
						type={type}
						required={required}
						labelText={labelText}
						setFormData={setFormData}
						setImageUrl={setImageUrl}
						value={type === 'file' ? null : formData[name]}
						disable={ean & (name === 'EAN')}
						row
					/>
				)
			})}
			<div className='img-preview-frame'>
				{imageUrl ? <img src={imageUrl} alt='upload product image' className='img' /> : <FaUpload />}
			</div>
			<FormSelect
				data={getSubCategories(storeData)}
				name='category'
				setFormData={setFormData}
				value={formData.category}
				labelText='Category*'
				required
				row
			/>
			<form className='details-input'>
				<p className='section-title'>Detais</p>
				{detailsInput.map((input, index) => {
					const { name, type, required, labelText } = input
					return (
						<FormRow
							key={index}
							name={name}
							type={type}
							required={required}
							labelText={labelText}
							setFormData={setFormData}
							value={formData[name]}
							row
						/>
					)
				})}
			</form>
			{errorMessage && (
				<div className='form-error sm'>
					<span>{errorMessage}</span>
				</div>
			)}
			<SubmitButton />
		</form>
	)
}

export default NewProductForm
