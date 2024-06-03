import styles from './AsideMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { FaWarehouse, FaChartLine, FaUserCog, FaListUl } from 'react-icons/fa'
import { AiFillDashboard } from 'react-icons/ai'
import { IoDocumentTextSharp } from 'react-icons/io5'
const AsideMenu = () => {
	const asideMenuButtons = [
		{ name: 'Dashboard', path: '/dashboard', icon: <AiFillDashboard /> },
		{ name: 'Warehouse', path: '/dashboard/stock', icon: <FaWarehouse /> },
		{ name: 'Stats', path: '/dashboard/stats', icon: <FaChartLine /> },
		{ name: 'Reports', path: '/dashboard/reports', icon: <IoDocumentTextSharp /> },
		{ name: 'Account', path: '/dashboard/account', icon: <FaUserCog /> },
	]
	return (
		<div className='aside-menu '>
			<ul>
				{asideMenuButtons.map((btn, index) => {
					return (
						<li key={index}>
							<div className={styles.menu_item}>
								<NavLink to={btn.path} end className={({ isActive }) => (isActive ? 'nav-link active-menu' : '')}>
									{btn.icon} <span className='span-color'>{btn.name}</span>
								</NavLink>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default AsideMenu
