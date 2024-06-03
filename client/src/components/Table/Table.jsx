import { Link } from 'react-router-dom'
import styles from './Table.module.scss'
import { Table as TableAntd } from 'antd'

const Table = ({ data, columns, size, pagination, expandable }) => {
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
				bordered
				expandable={
					expandable && {
						expandedRowRender: record =>
							record.details.map(detail => {
								return (
									<span className='table-description'>
										{Object.entries(detail).map(([key, value]) => (
											<p key={key}>
												{key}: <span className='span-color'>{value}</span>
											</p>
										))}
									</span>
								)
							}),
					}
				}
				dataSource={dataTable}
			/>
		</div>
	)
}

export default Table
