import { useEffect, useState, useContext } from 'react'
import styles from './FilterProductsWindow.module.scss'
import FormRow from '../FormRow/FormRow'
import SubmitButton from '../SubmitButton/SubmitButton'
import FormSelect from '../FormSelect/FormSelect'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useStoreContext } from '../../hooks/useStoreContext'
import { getFilterProducts } from '../../api/apiFunctions'
import { getSubCategories } from '../../constants/categories'

const FilterProductsWindow = () => {
	const { products, isLoading, dispatch, setIsLoading } = useProductsContext()

	const { storeData } = useStoreContext()

	const [formData, setFormData] = useState({
		product_id: '',
		name: '',
		category: '',
	})

	const handleFilterProducts = e => {
		e.preventDefault()
		getFilterProducts(dispatch, setIsLoading, formData)
	}

	return (
		<div className={`${styles.filter_products_window} glass`}>
			<form className='form' onSubmit={handleFilterProducts}>
				<FormRow
					type='text'
					name='product_id'
					row
					labelText='ID'
					value={formData.product_id}
					setFormData={setFormData}
				/>
				<FormRow type='text' name='name' row labelText='Name' value={formData.name} setFormData={setFormData} />
				<FormSelect
					data={getSubCategories(storeData)}
					name='category'
					labelText='Category'
					row
					setFormData={setFormData}
				/>

				<div className='buttons-container'>
					<SubmitButton />
				</div>
			</form>
		</div>
	)
}

export default FilterProductsWindow
