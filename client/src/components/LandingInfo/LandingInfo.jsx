import styles from './LandingInfo.module.scss'
import { Link } from 'react-router-dom'
import BackgroundImage from '../BackgroundImage/BackgroundImage'
import img from '../../assets/images/landing-image.png'
const LandingInfo = () => {
	return (
		<div className={styles.landing_info}>
			<div className={styles.landing_info_context}>
				<h1>
					Control <span className='span-color'>Stock</span> App
				</h1>
				<p>
					We're glad you're here. Our application makes it easy and efficient to manage your company's inventory. Track
					current stock levels, manage orders, and optimize warehouse operations, all in one place. Sign in or register
					to start using our platform and increase your business efficiency today!
				</p>
				<div className={styles.buttons}>
					<Link to='/signup' className='btn'>
						Register
					</Link>
					<Link to='/login' className='btn'>
						sign in
					</Link>
				</div>
			</div>
			<BackgroundImage src={img} />
		</div>
	)
}

export default LandingInfo
