// MyPdfTemplate.js

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		borderBottom: '1px solid #333',
	},
	paragraph: {
		fontSize: 12,
		marginBottom: 10,
	},
	table: {
		display: 'table',
		width: 'auto',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		margin: 'auto',
		flexDirection: 'row',
	},
	tableCol: {
		width: '33%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCell: {
		margin: 'auto',
		marginTop: 5,
		padding: 5,
	},
	tableCellBold: {
		fontWeight: 'bold',
		fontSize: 15,
	},
})

const MyPdfTemplate = ({ data }) => {
	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.section}>
					<Text style={styles.header}>
						Sales report from {data[0].createdAt.split('T')[0]} to {data[data.length - 1].createdAt.split('T')[0]}
					</Text>
					<View style={styles.table}>
						<View style={styles.tableRow}>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>ID</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Quantity</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Store</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>Date</Text>
							</View>
						</View>
						{data.map((item, index) => {
							return (
								<View key={index} style={styles.tableRow}>
									<View style={styles.tableCol} key={index}>
										{item.products.map((product, index) => {
											return (
												<Text key={index} style={styles.tableCell}>
													{product.product_id}
												</Text>
											)
										})}
									</View>

									<View style={styles.tableCol} key={index}>
										{item.products.map((product, index) => {
											return (
												<Text key={index} style={styles.tableCell}>
													{product.quantity}
												</Text>
											)
										})}
									</View>

									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{item.store}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{item.createdAt.split('T')[0]}</Text>
									</View>
								</View>
							)
						})}
					</View>
				</View>
			</Page>
		</Document>
	)
}

export default MyPdfTemplate
