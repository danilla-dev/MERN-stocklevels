import React from 'react'
import styles from './ProductHeader.module.scss'

const ProductHeader = ({ product }) => {
	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.image} img-preview-frame img`}>
				<img src={product.image} alt={`image of ${product.name}`} />
			</div>
			<h2 className={`${styles.name}`}>{product.name}</h2>
			<p className={`${styles.id}`}>{product.product_id}</p>
			<p className={`${styles.category}`}>{product.category}</p>
			
		</div>
	)
}

export default ProductHeader
