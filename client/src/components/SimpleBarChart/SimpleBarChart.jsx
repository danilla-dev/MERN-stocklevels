import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import dayjs from 'dayjs'

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		const payloadData = payload[0].payload
		const date = dayjs(payloadData.createdAt).format('YYYY-MM-DD  HH:mm:ss')

		return (
			<div className='custom-tooltip'>
				<p className='label'>{`${label} : ${payload[0].value} sales`}</p>
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

const SimpleBarChart = ({ data, oneBar, values }) => {
	return (
		<ResponsiveContainer height='100%' minHeight={200}>
			<BarChart width={150} height={40} data={data} style={{ fontSize: '1.6rem' }}>
				<XAxis dataKey={values[0]} />
				<YAxis width={30} dataKey={values[1]} />
				<Tooltip content={<CustomTooltip />} wrapperStyle={styles} />
				<CartesianGrid strokeDasharray='3 3' />
				<Legend wrapperStyle={{ fontSize: '2rem' }} />
				<Bar dataKey={values[1]} fill='#4196E1' cursor='pointer' />
				{!oneBar && <Bar dataKey='store' fill='#95DFB1' />}
			</BarChart>
		</ResponsiveContainer>
	)
}

export default SimpleBarChart
