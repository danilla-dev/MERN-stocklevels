import styles from './GridLayout.module.scss'
const GridLayout = ({ children }) => {
	return <div className={styles.grid_layout}>{children}</div>
}

export default GridLayout
