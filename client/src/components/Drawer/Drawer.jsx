import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DrawerContext } from '../../contexts/DrawerContext'
import Product from '../Product/Product'

const Drawer = () => {
	const { isOpen, toggleOpen, drawerContext, drawerSize, inside, insideContext, setInsideContext } =
		useContext(DrawerContext)
	const navigate = useNavigate()

	// const closeInsideDrawer = e => {
	// 	if (e.target.className !== 'btn accept' || e.target.className !== 'drawer  inside') {
	// 		setInsideContext('')
	// 		console.log(e.target.className)
	// 	}
	// }

	return (
		<div className={`${!isOpen && 'drawer-close'} drawer  ${drawerSize}`}>
			<button
				onClick={() => {
					toggleOpen()
					navigate(-1)
					setInsideContext('')
				}}
				className='btn close-btn'
			>
				close
			</button>
			{drawerContext}
			{insideContext && (
				<>
					<div className=' drawer inside '>
						<button
							onClick={() => {
								setInsideContext('')
							}}
							className='btn close-btn '
						>
							close
						</button>
						{insideContext}
					</div>
				</>
			)}
		</div>
	)
}

export default Drawer
