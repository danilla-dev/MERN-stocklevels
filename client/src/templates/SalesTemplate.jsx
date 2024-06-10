// MyPdfTemplate.js

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from '../assets/images/logo.png'
import { formatDateString } from '../utils/date'

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 15,
		padding: 15,
		flexGrow: 1,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		marginBottom: 10,
	},
	tableHead: {
		backgroundColor: 'rgba(182, 198, 230, 0.35)',
		margin: 'auto',
		flexDirection: 'row',
	},

	table: {
		display: 'table',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 'auto',
	},
	tableRow: {
		margin: 'auto',
		flexDirection: 'row',
	},
	tableCol: {
		width: '25%',
		borderStyle: 'solid',
		textAlign: 'center',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCell: {
		marginHorizontal: 'auto',
		marginTop: 5,
		padding: 5,
		fontSize: 12,
		width: '80%',
		// textAlign: "center",
	},
	reportInfo: {
		marginTop: 20,
		marginBottom: 10,
	},
	tableCellLight: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontWeight: 'light',
		fontSize: 16,
		marginTop: 5,
		marginBottom: 5,
		borderBottom: '1px solid silver',
		width: '100%',
	},
	logo: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 40,
		height: 40,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		fontSize: 14,
	},
})

const headerStyles = StyleSheet.create({
	header: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 },
	logo: { position: 'absolute', right: 0, top: 0, width: 40, height: 40 },
})
const infoSectionStyles = StyleSheet.create({
	reportInfo: { marginTop: 20, marginBottom: 10 },
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontWeight: 'light',
		fontSize: 16,
		marginTop: 5,
		marginBottom: 5,
		borderBottom: '1px solid silver',
		width: '100%',
	},
})

const MyPdfTemplate = ({ data }) => {
	const { sales, date, storeData } = data

	const infoRows = [
		{
			text: 'Store:',
			data: storeData.name,
		},
		{
			text: 'From:',
			data: date.startDate,
		},
		{
			text: 'To:',
			data: date.endDate,
		},
		{
			text: 'All sales quantity:',
			data: sales.length,
		},
	]
	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.section}>
					{/* HEADER */}
					<Text style={headerStyles.header}>Sales report</Text>
					<Image style={headerStyles.logo} src={logo}></Image>
					{/* REPORT INFO SECTION */}

					<View style={infoSectionStyles.reportInfo}>
						{infoRows.map((info, index) => {
							return (
								<View key={index} style={infoSectionStyles.infoRow}>
									<Text>{info.text}</Text>
									<Text>{info.data}</Text>
								</View>
							)
						})}
					</View>

					{/* TABELA */}
					<View style={styles.table}>
						{/* naglowek tabeli TABLEHEAD*/}
						<View style={styles.tableHead}>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Product ID</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Quantity</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Store</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Sale date</Text>
							</View>
						</View>
						{/* Kazdy wiersz po kolei w zaleznosci od ilosci produktow  TABLEBODY*/}
						{sales.map((item, index) => {
							return (
								<View key={index} style={styles.tableRow}>
									{/* kolumna z ID  */}
									<View style={styles.tableCol} key={index}>
										{item.products.map((product, index) => {
											return (
												<Text key={index} style={styles.tableCell}>
													{product.product_id}
												</Text>
											)
										})}
									</View>
									{/* Kolumna z ilością */}
									<View style={styles.tableCol} key={index}>
										{item.products.map((product, index) => {
											return (
												<Text key={index} style={styles.tableCell}>
													{product.quantity} psc.
												</Text>
											)
										})}
									</View>

									{/* Kolumna ze sklepem */}
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{item.store}</Text>
									</View>

									{/* Kolumna ze datą */}
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{formatDateString(item.createdAt)}</Text>
									</View>
								</View>
							)
						})}
					</View>
					{/* ^Koniec tabeli */}
					<View style={styles.footer}>
						<Text>Report created from www.stocklevels.com</Text>
					</View>
				</View>
			</Page>
		</Document>
	)
}

export default MyPdfTemplate
