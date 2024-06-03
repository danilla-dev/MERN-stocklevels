import React from 'react'
import styles from './ProductQuantityStats.module.scss'
import { Progress } from 'antd'
import { green, red, yellow } from '@ant-design/colors'


const ProductQuantityStats = ({ product }) => {
	return (
		<div className='details-box quantity'>
			<h2 className='details-header'>Stock level: </h2>
			<Progress
				percent={product.quantity * 10}
				size={[40, 40]}
				steps={5}
				strokeColor={[red[4], yellow[4], yellow[5], green[4], green[6]]}
				success={{ strokeColor: 'green', percent: 40 }}
				showInfo={false}
			/>
			<p className='details-paragraph'>
				Quantity: <span>{product.quantity}</span>
			</p>
		</div>
	)
}

export default ProductQuantityStats
