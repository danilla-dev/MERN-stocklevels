import { useEffect } from 'react'
import { useStoreContext } from '../../hooks/useStoreContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useProductsContext } from '../../hooks/useProductsContext'
import img from '../../assets/images/TEST-store-image.png'
import styles from './StoreInfo.module.scss'
import { getStoreData } from '../../api/apiFunctions'
import { Spin } from 'antd'

const StoreInfoWidget = () => {
	const { info, category, products_in_store } = styles
	const { storeData, isLoading, setIsLoading, dispatch } = useStoreContext()
	const { products } = useProductsContext()

	const { user } = useAuthContext()

	useEffect(() => {
		if (user) {
			getStoreData(dispatch, setIsLoading)
		}
	}, [user, dispatch])

	return (
		<div className={styles.store_info}>
			{isLoading ? (
				<div className='spin'>
					<Spin className='spin' size='large'></Spin>
				</div>
			) : (
				<>
					<div className={info}>
						<h3>{storeData.name}</h3>
						<p className={category}>{storeData.category}</p>
						<p className={products_in_store}>
							Products in store: <span className='span-color'>{products.length}</span>
						</p>
					</div>
					<div>
						<img src={storeData.image} alt='store logo' className='store-logo' />
					</div>
				</>
			)}
		</div>
	)
}

export default StoreInfoWidget
