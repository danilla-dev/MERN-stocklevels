import { useEffect } from 'react'
import SetStoreForm from '../components/SetStoreForm/SetStoreForm'
import GridLayout from '../components/GridLayout/GridLayout'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import img from '../assets/images/newStore.png'
import BackgroundImage from '../components/BackgroundImage/BackgroundImage'

const SetStorePage = () => {
	return (
		<>
			<SetStoreForm />
			<img src={img} className='bg-img' />
		</>
	)
}

export default SetStorePage
