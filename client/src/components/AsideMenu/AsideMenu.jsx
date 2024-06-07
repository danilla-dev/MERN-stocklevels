import styles from './AsideMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { FaWarehouse, FaChartLine, FaUserCog, FaListUl } from 'react-icons/fa'
import { AiFillDashboard } from 'react-icons/ai'
import { IoDocumentTextSharp } from 'react-icons/io5'
const AsideMenu = () => {
	const asideMenuButtons = [
		{ name: 'Dashboard', path: '/dashboard', icon: <AiFillDashboard /> },
		{ name: 'Warehouse', path: '/stock', icon: <FaWarehouse /> },
		{ name: 'Stats', path: '/stats', icon: <FaChartLine /> },
		{ name: 'Reports', path: '/reports', icon: <IoDocumentTextSharp /> },
		{ name: 'Account', path: '/account', icon: <FaUserCog /> },
	]
	return (
		<div className='aside-menu '>
			<ul>
				{asideMenuButtons.map((btn, index) => {
					return (
						<li key={index}>
							<NavLink to={btn.path} className={({ isActive }) => (isActive ? 'nav-link active-menu' : '')}>
								{btn.icon} <span className='span-color'>{btn.name}</span>
							</NavLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AsideMenu
