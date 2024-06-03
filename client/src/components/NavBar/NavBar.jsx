import Logo from '../Logo/Logo'
import styles from './NavBar.module.scss'
import { useAuthContext } from '../../hooks/useAuthContext'
import useLogout from '../../hooks/useLogout'
const NavBar = () => {
	const { logout } = useLogout()
	const { user } = useAuthContext()

	const handleLogout = () => {
		logout()
	}

	return (
		<div className='navbar-background dark'>
			<div className='wrapper'>
				<nav className='nav-bar'>
					<Logo />
					{user && (
						<div className='nav-auth'>
							<span>{user && user.email}</span>
							<button className='btn logout-btn' onClick={handleLogout}>
								LOGOUT
							</button>
						</div>
					)}
				</nav>
			</div>
		</div>
	)
}

export default NavBar
