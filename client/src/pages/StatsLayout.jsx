import { memo, useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getProductsSales, getSales } from '../api/apiFunctions'
import SimpleBarChart from '../components/SimpleBarChart/SimpleBarChart'
import FlexContainer from '../components/FlexContainer/FlexContainer'
import SimplePieChart from '../components/SimplePieChart/SimplePieChart'
import TinyLineChart from '../components/TinyLineChart/TinyLineChart'
import Widget from '../components/Widget/Widget'
import Table from '../components/Table/Table'
import { allProductsSalesColumn, allSalesColumns } from '../constants/columns'
import { useSalesContext } from '../hooks/useSalesContext'
import { Progress, Tooltip, DatePicker } from 'antd'
import PdfGenerator from '../components/PdfGenerator/PdfGenerator'

import dayjs from 'dayjs'

const StatsLayout = memo(() => {
	const [date, setDate] = useState({
		startDate: dayjs().subtract(7, 'days').startOf('day'),
		endDate: dayjs(),
	})

	const { soldProducts, dispatch, sortedProducts, sortedSales, sales, aggregatedSales, aggregatedSalesByHour } =
		useSalesContext()

	useEffect(() => {
		getData()
	}, [date])

	console.log(sortedSales)
	const getData = async params => {
		await getProductsSales(dispatch, {
			start: date.startDate.format('YYYY-MM-DD'),
			end: date.endDate.format('YYYY-MM-DD'),
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
			<div className='date-picker-container glass'>
				<h2 className='header'>Select a date range</h2>
				<span className='date-picker start'>
					<label htmlFor='start-date'>From:</label>
					<DatePicker
						id='start-date'
						size='small'
						needConfirm
						disabledDate={disabledDate}
						style={{ background: '#d5d7dd' }}
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
			<Widget text='Last sold products' small>
				<SimpleBarChart data={soldProducts && soldProducts.slice(0, 5)} oneBar values={['product_id', 'quantity']} />
			</Widget>
			<Widget text='Best products' small>
				<SimpleBarChart data={sortedProducts.slice(0, 5)} oneBar values={['product_id', 'sales']} />
			</Widget>

			<Widget text='Sales every days' small>
				<TinyLineChart data={aggregatedSales} dataKey='sales' value='date' legend X />
			</Widget>
			<Widget text='Sales every 4 hour' small>
				<TinyLineChart data={aggregatedSalesByHour} dataKey='totalSales' value='interval' legend X />
			</Widget>
			<Widget text='All products sales' small low_data>
				<Table data={sortedProducts} columns={allProductsSalesColumn} size='medium' pagination={{ pageSize: 8 }} />
			</Widget>
			<Widget text='Last sales' low_data small>
				<Table data={sales && sales} columns={allSalesColumns} size='small' pagination />
				<PdfGenerator data={sales} />
			</Widget>
			<Widget text='Stores stats' small>
				<SimplePieChart data={sortedSales} oneBar />
			</Widget>
		</>
	)
})

export default StatsLayout
