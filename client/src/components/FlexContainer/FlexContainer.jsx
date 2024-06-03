import styles from './FlexContainer.module.scss'
const FlexContainer = ({ children, column, auth }) => {
	return <section className={`${styles.flex_container} ${column && styles.col} ${auth && styles.auth}`}>{children}</section>
}

export default FlexContainer
