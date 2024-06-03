import GridLayout from '../components/GridLayout/GridLayout'
import AsideMenu from '../components/AsideMenu/AsideMenu'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
	return (
		<div className='wrapper'>
			<GridLayout>
				<NavBar />
				<Outlet />
				<AsideMenu />
				<Footer />
			</GridLayout>
		</div>
	)
}

export default DashboardLayout
