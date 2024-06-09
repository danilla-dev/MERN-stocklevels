import { Link, useNavigate } from 'react-router-dom'
import styles from './Table.module.scss'
import { Table as TableAntd } from 'antd'

const Table = ({ data, columns, size, pagination, expandable, buttons }) => {
	const dataTable = data.map((element, index) => {
		return {
			...element,
			key: index + 1,
		}
	})

	return (
		<div className={`table`}>
			<TableAntd
				columns={columns}
				pagination={pagination ? pagination : false}
				size={size}
				bordered={false}
				dataSource={dataTable}
			/>
		</div>
	)
}

export default Table
