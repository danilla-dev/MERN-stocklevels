import dayjs from 'dayjs'

export const formatDateString = isoString => {
	const [datePart, timePart] = isoString.split('T')

	const [hours, minutes] = timePart.split(':')

	return `${datePart} ${hours}:${minutes}`
}
export const getStartAndEndOfWeek = () => {
	const today = dayjs()
	const currentDayOfWeek = today.day()

	let startOfCurrentWeek, endOfCurrentWeek

	if (currentDayOfWeek === 0) {
		startOfCurrentWeek = today.subtract(6, 'day').startOf('day')
	} else {
		startOfCurrentWeek = today.startOf('isoWeek')
	}

	endOfCurrentWeek = startOfCurrentWeek.add(6, 'day').endOf('day')

	const startOfPreviousWeek = startOfCurrentWeek.subtract(7, 'day')
	const endOfPreviousWeek = endOfCurrentWeek.subtract(7, 'day').endOf('day')

	return {
		currentWeek: { start: startOfCurrentWeek, end: endOfCurrentWeek },
		previousWeek: { start: startOfPreviousWeek, end: endOfPreviousWeek },
	}
}
