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
		console.log(payload)
		return (
			<ul className='legend-list'>
				{payload.map((entry, index) => (
					<li key={`item-${index}`} className='legend-item'>
						<span className='legend-square' style={{ backgroundColor: colors[index] }} />
						{entry.payload.key}
					</li>
				))}
			</ul>
		)
	}

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const payloadData = payload[0].payload
			return (
				<div className='custom-tooltip'>
					<p className='label'>{payloadData.key}</p>
				</div>
			)
		}

		return null
	}
	const styles = {
		backgroundColor: 'white',
		padding: '1em',
		border: '1px solid black',
		fontSize: '1.6rem',
		borderRadius: '10px',
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
				<Legend content={renderLegend} />
				<Tooltip wrapperStyle={styles} active content={CustomTooltip} />
			</PieChart>
		</ResponsiveContainer>
	)
}

export default SimplePieChart
