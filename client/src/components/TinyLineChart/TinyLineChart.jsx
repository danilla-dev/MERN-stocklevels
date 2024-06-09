import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const TinyLineChart = ({ data, dataKey }) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart width={300} height={100} data={data}>
				<Line type='monotone' dataKey={dataKey} stroke='#8884d8' strokeWidth={5} />
			</LineChart>
		</ResponsiveContainer>
	)
}

export default TinyLineChart
