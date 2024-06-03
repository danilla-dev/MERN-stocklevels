import FlexContainer from '../components/FlexContainer/FlexContainer'
import LoginForm from '../components/LoginForm/LoginForm'
import BackgroundImage from '../components/BackgroundImage/BackgroundImage'
import img from '../assets/login-bg.svg'
const LoginLayout = () => {
	return (
		<FlexContainer auth>
			<LoginForm />
			<BackgroundImage src={img} />
		</FlexContainer>
	)
}

export default LoginLayout
