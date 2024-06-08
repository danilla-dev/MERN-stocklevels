import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Navigate to='/login' />)} />
)

export default PrivateRoute
