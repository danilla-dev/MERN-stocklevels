import { memo, useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getSales } from '../api/apiFunctions'
import SimpleBarChart from '../components/SimpleBarChart/SimpleBarChart'
import FlexContainer from '../components/FlexContainer/FlexContainer'
import SimplePieChart from '../components/SimplePieChart/SimplePieChart'
import Widget from '../components/Widget/Widget'
import Table from '../components/Table/Table'

import { useSalesContext } from '../hooks/useSalesContext'
import { Progress, Tooltip, DatePicker } from 'antd'

import dayjs from 'dayjs'

const columns = [
	{
		title: 'Product',
		dataIndex: 'product_id',
		key: 'product_id',
		render: (text, record) => <Link to={`/product/${record.id}`}>{record.product_id}</Link>,
	},
	{
		title: 'Sales',
		dataIndex: 'sales',
		key: 'sales',
	},
]

const StatsLayout = memo(() => {
	const [date, setDate] = useState({
		startDate: dayjs().subtract(7, 'days').startOf('day'),
		endDate: dayjs(),
	})

	const { sales, dispatch, sortedProducts, sortedSales } = useSalesContext()

	useEffect(() => {
		getData()
	}, [date])

	const getData = async params => {
		await getSales(dispatch, {
			start: date.startDate.format('YYYY-MM-DD HH:mm:ss'),
			end: date.endDate.format('YYYY-MM-DD  HH:mm:ss'),
		})
	}
	const setDateRange = (date, range) => {
		if (range === 'start') {
			setDate(prevState => ({
				...prevState,
				startDate: date,
			}))
		} else if (range === 'end') {
			setDate(prevState => ({
				...prevState,
				endDate: date.endOf('day'),
			}))
		}
	}

	const disabledDate = current => {
		return current && current > dayjs().endOf('day')
	}
	return (
		<>
			<FlexContainer>
				<div className='date-picker-container'>
					<h2 className='header'>Select a date range</h2>
					<span className='date-picker start'>
						<label htmlFor='start-date'>From:</label>
						<DatePicker
							id='start-date'
							size='small'
							needConfirm
							disabledDate={disabledDate}
							onChange={date => setDateRange(date, 'start')}
							defaultValue={date.startDate}
						/>
					</span>

					<div className='date-picker end'>
						<label htmlFor='start-date'>To:</label>
						<DatePicker
							id='end-date'
							size='small'
							needConfirm
							disabledDate={disabledDate}
							onChange={date => setDateRange(date, 'end')}
							defaultValue={date.endDate}
						/>
					</div>
				</div>
				<Widget text='Last sales' mini>
					<SimpleBarChart data={sales && sales.slice(0, 5)} oneBar values={['product_id', 'quantity']} />
				</Widget>
				<Widget text='Best products' mini>
					<SimpleBarChart data={sortedProducts.slice(0, 5)} oneBar values={['product_id', 'sales']} />
				</Widget>

				<Widget text='All products sales' mini low_data>
					<Table data={sortedProducts} columns={columns} size='medium' pagination={{ pageSize: 8 }} />
				</Widget>
				<Widget text='Stores stats' mini>
					<SimplePieChart data={sortedSales} oneBar />
				</Widget>
			</FlexContainer>
		</>
	)
})

export default StatsLayout
