import { useEffect, useState } from 'react'
import { createBrowserRouter, useNavigate, Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.scss'
import {
	HomeLayout,
	Landing,
	DashboardLayout,
	RegisterLayout,
	LoginLayout,
	StockLayout,
	MainDashboard,
	StatsLayout,
	AccountLayout,
	SetStorePage,
	ReportsLayout,
} from './pages'
import { useAuthContext } from './hooks/useAuthContext'
import { useProductsContext } from './hooks/useProductsContext'
import { useDrawerContext } from './hooks/useDrawerContext'
import { getProducts, getSales } from './api/apiFunctions'
import { useSalesContext } from './hooks/useSalesContext'
import dayjs from 'dayjs'

function App() {
	const { user } = useAuthContext()
	const { dispatch, setIsLoading } = useProductsContext()
	const { dispatch: salesDispatch } = useSalesContext()
	const { toggleOpen, setInsideContext } = useDrawerContext()
	const userLocal = localStorage.getItem('user')
	const navigate = useNavigate()

	return (
		<>
			<div
				id='blur'
				onClick={() => {
					toggleOpen()
					navigate('auth/stock')
				}}
			/>
			<Routes>
				<Route path='/' element={<HomeLayout />}>
					<Route index element={userLocal ? <Navigate to='auth/dashboard' /> : <Landing />} />

					<Route
						path='auth'
						element={user ? user && user.complete ? <DashboardLayout /> : <SetStorePage /> : <Navigate to='/login' />}
					>
						<Route
							index
							element={user ? user && user.complete ? <DashboardLayout /> : <SetStorePage /> : <Navigate to='/login' />}
						/>
						<Route path='dashboard' element={userLocal ? <MainDashboard /> : <Navigate to='/login' />} />
						{/* ///////////////////// STOCK */}
						<Route path='stock' element={userLocal ? <StockLayout /> : <Navigate to='/login' />}>
							<Route index element={userLocal ? <StockLayout /> : <Navigate to='/login' />} />
							<Route path='product/add' element={userLocal ? <StockLayout /> : <Navigate to='/login' />} />
							<Route path='product/details/:id' element={userLocal ? <StockLayout /> : <Navigate to='/login' />} />
							<Route
								path='product/details/:id/:action'
								element={userLocal ? <StockLayout /> : <Navigate to='/login' />}
							/>
							<Route path='product/sell' element={userLocal ? <StockLayout /> : <Navigate to='/login' />} />
						</Route>
						{/* ///////////////////// STATS */}
						<Route path='stats' element={userLocal ? <StatsLayout /> : <Navigate to='/login' />} />
						{/* ///////////////////// REPORTS */}
						<Route path='reports' element={userLocal ? <AccountLayout /> : <Navigate to='/login' />} />
						{/* ///////////////////// ACCOUNT */}
						<Route path='account' element={userLocal ? <AccountLayout /> : <Navigate to='/login' />} />
					</Route>
					{/* ///////////////////// AUTH */}
					<Route path='signup' element={!userLocal ? <RegisterLayout /> : <Navigate to='/auth/dashboard' />} />
					<Route path='login' element={!userLocal ? <LoginLayout /> : <Navigate to='/auth/dashboard' />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
