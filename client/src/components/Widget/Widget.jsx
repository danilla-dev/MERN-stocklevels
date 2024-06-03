import styles from './Widget.module.scss'

const Widget = ({ children, text, circle, mini, low_data, color }) => {
	return (
		<div
			className={`${styles.widget} widget ${mini && 'mini-widget'} ${circle && 'circle-widget'} ${
				low_data && 'low-data-widget'
			} border-${color}`}
		>
			{text && <h2>{text}</h2>}
			{children}
		</div>
	)
}

export default Widget
