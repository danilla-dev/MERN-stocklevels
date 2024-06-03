import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Popup.module.scss'

const Popup = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className='popup widget border-purple' onClick={onClose}>
			<div className='popup-content' onClick={e => e.stopPropagation()}>
				{children}
				<button onClick={onClose} className='btn popup-btn'>
					Close
				</button>
			</div>
		</div>,
		document.getElementById('popup-root')
	)
}

export default Popup
