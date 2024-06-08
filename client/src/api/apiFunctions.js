import axios from './axiosConfig'

///////////////////////// PRODUCTS////////////////////////////////
export const getProducts = async (dispatch, setIsLoading) => {
	await axios
		.get('/products')
		.then(response => {
			if (response.status === 200) {
				console.log(response)
				dispatch({ type: 'SET_PRODUCTS', payload: response.data })
				setIsLoading(false)
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}
export const getFilterProducts = async (dispatch, setIsLoading, queryParams) => {
	await axios
		.get('/products/filter', { params: queryParams })
		.then(response => {
			if (response.status === 200) {
				dispatch({ type: 'SET_PRODUCTS', payload: response.data })
				setIsLoading(false)
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}
export const getProduct = async (dispatch, id) => {
	await axios
		.get(`/products/${id}`)
		.then(response => {
			if (response.status === 200) {
				dispatch({ type: 'PREVIEW_PRODUCT', payload: response.data })
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}

export const deleteProduct = async (dispatch, id, setAlertData) => {
	await axios
		.delete(`/products/${id}`)
		.then(response => {
			if (response.status === 200) {
				dispatch({ type: 'SET_PRODUCTS', payload: response.data })
				setAlertData({
					text: 'The product has been delete!',
					type: 'warning',
					open: true,
				})
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}
export const postProduct = async (dispatch, data, setFormData, setImageUrl, setAlertData, setErrorMessage) => {
	await axios
		.post('/products', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(response => {
			if (response.status === 200) {
				setFormData({
					product_id: '',
					name: '',
					quantity: '',
					category: '',
					image: '',
					EAN: '',
					width: '',
					height: '',
					weight: '',
					material: '',
					color: '',
					brand: '',
				})
				setErrorMessage('')
				setImageUrl('')
				dispatch({ type: 'CREATE_PRODUCT', payload: response.data })
				setAlertData({
					text: 'Product has been added.',
					type: 'success',
					open: true,
				})
			}
		})
		.catch((error, response) => {
			console.error('Błąd podczas tworzenia produktu:', error.response.data.message)
			setErrorMessage(error.response.data.message)
		})
}
export const updateProduct = async (data, dispatch) => {
	console.log(data)
	await axios
		.patch(`/products/${data.product_id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(response => {
			console.log('RESPONSE', response)
			dispatch({ type: 'SET_PRODUCTS', payload: response.data.products })
			dispatch({
				type: 'PREVIEW_PRODUCT',
				payload: response.data.updatedProduct,
			})
		})
}
// ////////////////////////STORE////////////////////////////
export const getStoreData = async (dispatch, setIsLoading) => {
	await axios
		.get('/store/data')
		.then(response => {
			if (response.status === 200) {
				dispatch({ type: 'GET_DATA', payload: response.data })
				setIsLoading(false)
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}

export const postStore = async (dispatch, userDispatch, data, setFormData) => {
	await axios
		.post('/store/create', data)
		.then(response => {
			if (response.status === 200) {
				const localData = JSON.parse(localStorage.getItem('user'))
				localData.complete = response.data.complete
				localStorage.setItem('user', JSON.stringify(localData))
				dispatch({ type: 'GET_DATA', payload: response.data.storeData })
				userDispatch({ type: 'SET_COMPLETE', payload: response.data.complete })
				setFormData({
					name: '',
					category: '',
					currency: '',
					stores: [],
					image: '',
				})
				location.reload()
			}
		})
		.catch(error => {
			console.error('Błąd podczas tworzenia produktu:', error)
		})
}
/////////////////////// SALES //////////////////////////////////

export const postSale = async (dispatch, salesDispatch, data, setAlertData, setErrorMessage) => {
	console.log(data)
	await axios
		.post('/sales', data)
		.then(response => {
			if (response.status === 200) {
				console.log(response.data.product)
				console.log(response.data.products)
				dispatch({ type: 'SET_PRODUCTS', payload: response.data.products })
				dispatch({ type: 'PREVIEW_PRODUCT', payload: response.data.product })
				setAlertData({
					type: 'success',
					text: 'The product has been sold!',
					open: true,
				})
			}
			if (response.status === 400) {
				console.log(response)
			}
		})
		.catch(error => {
			console.error('Błąd podczas tworzenia produktu:', error)
			setErrorMessage(error.response.data.message)
		})
}
export const getSalesOfProduct = async (dispatch, id) => {
	await axios
		.get(`/sales/${id}`)
		.then(response => {
			if (response.status === 200) {
				dispatch({ type: 'PREVIEW_SALE', payload: response.data })
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}
export const getSales = async (dispatch, date, comparison) => {
	await axios
		.get(`/sales/date?start=${date.start}&end=${date.end}`)
		.then(response => {
			console.log(response)
			if (response.status === 200 && !comparison) {
				dispatch({ type: 'SET_SALES', payload: response.data })
			}
			if (response.status === 200 && comparison) {
				console.log(response.data)
				dispatch({ type: 'PREVIOUS_SALES', payload: response.data })
			}
		})
		.catch(error => {
			console.error('Błąd podczas pobierania danych:', error)
		})
}
