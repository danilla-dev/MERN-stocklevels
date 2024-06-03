import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const SimplePieChart = ({ data }) => {
	const colors = [
		'#F5D679', // Mniej stonowany żółty
		'#FFB74D', // Mniej stonowany pomarańczowy
		'#66CCCC', // Mniej stonowany zielony
		'#C285E9', // Mniej stonowany fioletowy
		'#F194B4', // Mniej stonowany różowy
		'#85C1E9', // Mniej stonowany niebieski
		'#FFB366', // Mniej stonowany brzoskwiniowy
		'#E57373', // Mniej stonowany czerwony
		'#7FB3D5', // Mniej stonowany niebieski
		'#AAB7B8', // Mniej stonowany szary
	]
	const renderLegend = props => {
		const { payload } = props

		return (
			<ul className='legend-list'>
				{payload.map((entry, index) => (
					<li key={`item-${index}`} className='legend-item'>
						<span className='legend-square' style={{ backgroundColor: colors[index] }} />
						{entry.value}
					</li>
				))}
			</ul>
		)
	}

	return (
		<ResponsiveContainer height='100%' minHeight={200}>
			<PieChart width={500} height={500}>
				<Pie
					data={data}
					dataKey='sales'
					isAnimationActive={false}
					label
					cursor='pointer'
					style={{ fontSize: '1.4rem', fontWeight: 'bold' }}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index]} />
					))}
				</Pie>
				<Legend wrapperStyle={{ fontSize: '1.4rem' }} content={renderLegend} />
				<Tooltip itemStyle={{ fontSize: '1.4rem' }} active />
			</PieChart>
		</ResponsiveContainer>
	)
}

export default SimplePieChart
