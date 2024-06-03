import FlexContainer from '../components/FlexContainer/FlexContainer'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import BackgroundImage from '../components/BackgroundImage/BackgroundImage'
import img from '../assets/register-bg.svg'
const RegisterLayout = () => {
	return (
		<FlexContainer auth>
			<RegisterForm />
			<BackgroundImage src={img} />
		</FlexContainer>
	)
}
export default RegisterLayout
