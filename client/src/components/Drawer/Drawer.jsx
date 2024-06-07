import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrawerContext } from '../../hooks/useDrawerContext'

const Drawer = () => {
	const { isOpen, toggleOpen, drawerContext, drawerSize, inside, insideContext, setInsideContext } = useDrawerContext()
	const navigate = useNavigate()

	return (
		<div className={`${!isOpen && 'drawer-close'} drawer glass ${drawerSize}`}>
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
				<div className=' drawer inside glass '>
					<button
						onClick={() => {
							setInsideContext('')
							navigate(-1)
						}}
						className='btn close-btn '
					>
						close
					</button>
					{insideContext}
				</div>
			)}
		</div>
	)
}

export default Drawer
