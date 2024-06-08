import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Drawer from '../components/Drawer/Drawer'
import { Alert } from 'antd'
import { AlertContext } from '../contexts/AlertContext'

const HomeLayout = () => {
	const { alertData } = useContext(AlertContext)
	return (
		<>
			<Outlet />
			<Drawer />
			{alertData.open && (
				<div className='alert'>
					<Alert message={alertData.text} type={alertData.type} />
				</div>
			)}
		</>
	)
}

export default HomeLayout
