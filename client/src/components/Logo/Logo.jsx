import logo from '../../assets/images/logo.png'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
const Logo = () => {
	return (
		<Link to='/dashboard'>
			<div className={`${styles.logo} logo`}>
				<img src={logo} alt='stock levels logo' className={styles.img} />
				<p>
					Stocks<span className='span-color'>Levels</span>
				</p>
			</div>
		</Link>
	)
}

export default Logo
