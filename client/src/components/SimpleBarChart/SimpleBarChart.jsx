import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FaChartColumn } from 'react-icons/fa6'
import dayjs from 'dayjs'

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		const payloadData = payload[0].payload
		const date = dayjs(payloadData.createdAt).format('YYYY-MM-DD  HH:mm:ss')

		return (
			<div className='custom-tooltip'>
				<p className='label'>{`ID: ${label} - ${payload[0].value} pcs.`}</p>
				{payloadData.createdAt && <p className='date-time'>{date}</p>}
				{payloadData.store && <p className='date-time'>{payloadData.store}</p>}
			</div>
		)
	}

	return null
}
const styles = {
	backgroundColor: 'white',
	padding: '.5em',
	border: '1px solid black',
	borderRadius: '10px',
}

const CustomLegend = props => {
	const { payload } = props

	return (
		<ul>
			{payload.map((entry, index) => {
				return (
					<li key={`item-${index}`}>
						<div className='chart-legend bar'>
							<FaChartColumn />
							<p className='chart-legend-text'>sales</p>
						</div>
					</li>
				)
			})}
		</ul>
	)
}

const SimpleBarChart = ({ data, oneBar, values }) => {
	const gradientId = 'gradientId' // Unikalne ID dla gradientu
	const gradientOffset = '6%' // Przesunięcie gradientu

	return (
		<ResponsiveContainer height='100%' minHeight={200}>
			<BarChart width={150} height={40} data={data} style={{ fontSize: '1.6rem' }}>
				<defs>
					<linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
						<stop offset={gradientOffset} stopColor='rgba(51,90,189,1)' />
						<stop offset='46%' stopColor='rgba(70,108,203,1)' />
						<stop offset='95%' stopColor='rgba(93,130,224,1)' />
					</linearGradient>
				</defs>
				<XAxis dataKey={values[0]} />
				<YAxis width={35} dataKey={values[1]} />
				<Tooltip content={<CustomTooltip />} wrapperStyle={styles} />
				<CartesianGrid strokeDasharray='3 3' />
				<Legend content={<CustomLegend />} />
				<Bar dataKey={values[1]} fill={`url(#${gradientId})`} cursor='pointer' />
				{!oneBar && <Bar dataKey='store' fill='#95DFB1' />}
			</BarChart>
		</ResponsiveContainer>
	)
}

export default SimpleBarChart
