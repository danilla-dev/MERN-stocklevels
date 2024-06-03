import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthContextProvider } from './contexts/AuthContext'
import { ProductsContextProvider } from './contexts/ProductsContext.jsx'
import { StoreContextProvider } from './contexts/StoreContext.jsx'
import { DrawerContextProvider } from './contexts/DrawerContext.jsx'
import { SalesContextProvider } from './contexts/SalesContext.jsx'
import { AlertContextProvider } from './contexts/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<StoreContextProvider>
				<SalesContextProvider>
					<ProductsContextProvider>
						<DrawerContextProvider>
							<AlertContextProvider>
								<App />
							</AlertContextProvider>
						</DrawerContextProvider>
					</ProductsContextProvider>
				</SalesContextProvider>
			</StoreContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
